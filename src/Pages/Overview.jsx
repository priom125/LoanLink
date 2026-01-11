import React, { useContext, useMemo } from "react";
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  Info,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from "recharts";
import { AuthContext } from "../Auth/AuthProvider";
import useAxios from "../hooks/useAxios";

const COLORS = ['#818cf8', '#c084fc', '#34d399', '#fbbf24', '#f472b6', '#2dd4bf'];

export function Overview() {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const {
    data: AllLoan = [],
    isLoading: loanLoading,
    isError: loanError
  } = useQuery({
    queryKey: ["AllLoan"],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loans");
      return res.data;
    },
  });

  /**
   * Data Processing Logic
   * We transform the AllLoan array into dashboard-friendly statistics
   */
  const stats = useMemo(() => {
    if (!AllLoan.length) return null;

    // 1. Calculate KPI Values
    const totalVolume = AllLoan.reduce((acc, curr) => acc + Number(curr.loanAmount || 0), 0);
    const approvedCount = AllLoan.filter(l => l.status === "Approved").length;
    const pendingCount = AllLoan.filter(l => l.status === "Pending" || !l.status).length;
    const totalBorrowers = new Set(AllLoan.map(l => l.userEmail)).size;

    // 2. Prepare Pie Chart Data (by Loan Title/Category)
    const categoryMap = {};
    AllLoan.forEach(loan => {
      const cat = loan.loanTitle || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    const pieData = Object.keys(categoryMap).map(name => ({
      name,
      value: categoryMap[name]
    }));

    // 3. Prepare Bar Chart Data (Monthly distribution)
    const monthMap = {};
    AllLoan.forEach(loan => {
      const date = new Date(loan.submissionDate);
      const month = date.toLocaleString('default', { month: 'short' });
      monthMap[month] = (monthMap[month] || 0) + Number(loan.loanAmount || 0);
    });
    
    // Sort months for the chart (simplified sort)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = months
      .filter(m => monthMap[m] !== undefined)
      .map(name => ({ name, amount: monthMap[name] }));

    return {
      cards: [
        { title: "Total Volume", value: `$${totalVolume.toLocaleString()}`, trend: "+100%", icon: <TrendingUp size={20}/> },
        { title: "Unique Borrowers", value: totalBorrowers.toString(), trend: "Active", icon: <Users size={20}/> },
        { title: "Approved Loans", value: approvedCount.toString(), trend: "Verified", icon: <CheckCircle size={20}/> },
        { title: "Pending Review", value: pendingCount.toString(), trend: "Action Required", icon: <Clock size={20}/> }
      ],
      pieData,
      chartData,
      recent: AllLoan.slice(0, 5) // Last 5 applications
    };
  }, [AllLoan]);

  if (loanLoading) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center gap-4 bg-slate-950">
        <Loader2 className="animate-spin text-indigo-400" size={48} />
        <p className="text-slate-400 font-medium">Analyzing loan portfolio...</p>
      </div>
    );
  }

  if (loanError || !stats) {
    return (
      <div className="p-8 bg-red-950/20 text-red-400 rounded-2xl border border-red-900/30">
        Unable to load loan metrics. Please check your connection or data source.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 md:p-0">
      {/* 1. Page Header */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden border border-indigo-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-indigo-500/20 w-fit px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md text-indigo-300 border border-indigo-500/20">
              <Info size={14} /> REAL-TIME ANALYTICS
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-400 max-w-xl">
              Currently managing <span className="text-white font-bold">{AllLoan.length}</span> active loan applications across the platform.
            </p>
          </div>
          <div className="hidden lg:block bg-slate-800/50 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
             <p className="text-[10px] font-black uppercase opacity-60 text-slate-400">Total Transactions</p>
             <p className="text-2xl font-black text-indigo-400">{AllLoan.length}</p>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.cards.map((card, i) => (
          <div key={i} className="group p-6 bg-slate-900 rounded-3xl border border-slate-800 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800 rounded-2xl text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                {card.icon}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                <ArrowUpRight size={12} /> {card.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{card.title}</p>
            <h3 className="text-2xl font-black text-white mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* 3. Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-[2rem] border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-8">Loan Disbursement (by Month)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #334155' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="amount" fill="#818cf8" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-8">Loan Distribution</h3>
          <div className="h-[250px] w-full grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.pieData}
                  cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8}
                  dataKey="value"
                >
                  {stats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155' }}
                   itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {stats.pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Recent Transactions Table */}
      <div className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden">
        <div className="p-8 flex justify-between items-center border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Latest Loan Requests</h3>
            <p className="text-xs text-slate-500">Reviewing the most recent submissions</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-800/50 text-slate-500 uppercase text-[10px] tracking-widest font-black">
                <th className="py-4 px-8 border-none text-left">Applicant</th>
                <th className="border-none text-left">Loan Title</th>
                <th className="border-none text-left">Amount</th>
                <th className="border-none text-left">Status</th>
                <th className="text-right px-8 border-none">Submitted On</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-400">
              {stats.recent.map((loan, idx) => (
                <tr key={loan._id || idx} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-0">
                  <td className="py-4 px-8">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200">{loan.firstName} {loan.lastName}</span>
                      <span className="text-[10px] text-slate-500">{loan.userEmail}</span>
                    </div>
                  </td>
                  <td>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-slate-300">
                      {loan.loanTitle}
                    </span>
                  </td>
                  <td className="font-black text-indigo-400">${Number(loan.loanAmount).toLocaleString()}</td>
                  <td>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      loan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 
                      loan.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        loan.status === 'Approved' ? 'bg-emerald-500' : 
                        loan.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></span>
                      {loan.status || "Pending"}
                    </div>
                  </td>
                  <td className="text-right px-8 text-slate-500 text-xs">
                    {new Date(loan.submissionDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Overview;