import React from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Percent, 
  Tag, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock 
} from 'lucide-react';

const LoanDetailsModal = ({ loan, onClose }) => {
  if (!loan) return null;

  const getStatusConfig = (status) => {
    if (status === 'Approved') {
      return {
        bgColor: 'bg-green-500',
        icon: <CheckCircle className="w-5 h-5" />,
        textColor: 'text-green-400',
        borderColor: 'border-green-500',
      };
    }
    if (status === 'Rejected') {
      return {
        bgColor: 'bg-red-500',
        icon: <XCircle className="w-5 h-5" />,
        textColor: 'text-red-400',
        borderColor: 'border-red-500',
      };
    }
    return {
      bgColor: 'bg-yellow-500',
      icon: <Clock className="w-5 h-5" />,
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-500',
    };
  };

  const statusConfig = getStatusConfig(loan.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                <FileText className="w-8 h-8" />
                Loan Application
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Application ID: <span className="font-mono">{loan._id}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Status Section */}
            <div className={`bg-gray-900 rounded-xl p-5 border-l-4 ${statusConfig.borderColor}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Current Status</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-4 py-2 text-sm font-bold text-white rounded-lg ${statusConfig.bgColor} shadow-lg flex items-center gap-2`}
                    >
                      {statusConfig.icon}
                      {loan.status}
                    </span>
                  </div>
                </div>
                {loan.notes && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-gray-400 text-sm mb-1">Notes</p>
                    <p className="text-gray-200 text-sm bg-gray-800 p-3 rounded-lg">
                      {loan.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applicant Information */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Applicant Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Full Name</p>
                      <p className="text-white font-semibold">
                        {loan.firstName} {loan.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Email Address</p>
                      <p className="text-white font-semibold break-all">
                        {loan.userEmail || loan.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Phone Number</p>
                      <p className="text-white font-semibold">
                        {loan.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Address</p>
                      <p className="text-white font-semibold">
                        {loan.address || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Loan Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Loan Category</p>
                      <p className="text-white font-semibold">{loan.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Loan Amount</p>
                      <p className="text-white font-semibold text-2xl">
                        ${Number(loan.loanAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Percent className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">Interest Rate</p>
                      <p className="text-white font-semibold">
                        {loan.interestRate}%
                      </p>
                    </div>
                  </div>

                  {loan.emiPlan && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs">EMI Plan</p>
                        <p className="text-white font-semibold">
                          {loan.emiPlan} months
                        </p>
                      </div>
                    </div>
                  )}

                  {loan.purpose && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs">Purpose</p>
                        <p className="text-white font-semibold">{loan.purpose}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {(loan.description || loan.documents) && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Additional Information
                </h3>
                {loan.description && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Description</p>
                    <p className="text-gray-200 bg-gray-800 p-4 rounded-lg">
                      {loan.description}
                    </p>
                  </div>
                )}
                {loan.documents && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Documents</p>
                    <p className="text-gray-200">{loan.documents}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 border-t border-gray-700 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;