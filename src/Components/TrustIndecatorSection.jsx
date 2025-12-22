import React from 'react'

function TrustIndecatorSection() {
    const mockStats = [
    { value: "15,000+", label: "Clients Served" },
    { value: "$12.5M+", label: "Capital Disbursed" },
    { value: "98%", label: "Approval Rate" },
    { value: "4.9/5", label: "Customer Rating" },
];
    const stats = mockStats;
  return (
    <section>
<h2 className="text-4xl font-extrabold text-white text-center mb-12">
           LoanLink: Find Your Funding Solution Today
        </h2>
    <div className="w-full max-w-7xl mx-auto py-12 bg-gray-900 rounded-xl shadow-inner shadow-black/20 mb-16">
          
        <p className='text-center'>Explore our range of microloan products tailored for your organizational needs.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center px-4">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                    <p className="text-4xl sm:text-5xl font-extrabold text-green-500 mb-1">
                        {stat.value}
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-400 uppercase tracking-wider">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    </div>
    </section>
  )
}

export default TrustIndecatorSection