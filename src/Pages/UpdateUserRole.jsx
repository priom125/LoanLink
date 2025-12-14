import React, { useState, useCallback, useMemo } from 'react';
import { User, CheckCircle, XCircle, Info, Send } from 'lucide-react';
// Assuming 'useAxios' returns your configured axios instance
import useAxios from '../hooks/useAxios'; 
// Assuming you have this set up for data fetching
import { useQuery } from '@tanstack/react-query'; 
// Assuming you are using React Router's data fetching
import { useLoaderData } from 'react-router'; 

// Available suspension reasons
const suspensionReasons = [
  { value: '', label: 'Select a Reason' },
  { value: 'policy_violation', label: 'Policy Violation (Severe)' },
  { value: 'inactivity', label: 'Prolonged Inactivity (30+ days)' },
  { value: 'suspicious_activity', label: 'Suspicious Account Activity' },
  { value: 'miscellaneous', label: 'Other/Administrative' },
];

// --- Shared UI Components ---

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  let baseStyle = "px-4 py-2 font-semibold text-sm rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md";
  let variantStyle = "";

  switch (variant) {
    case 'primary':
      variantStyle = "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
      break;
    case 'danger':
      variantStyle = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case 'success':
      variantStyle = "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500";
      break;
    case 'secondary':
      variantStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400";
      break;
    default:
        variantStyle = "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} flex items-center justify-center`}
    >
      {children}
    </button>
  );
};

const RoleUpdateModal = ({ isOpen, onClose, actionType, user, onConfirm }) => {
  const [suspendReason, setSuspendReason] = useState(suspensionReasons[0].value);
  const [whySuspendFeedback, setWhySuspendFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSuspend = actionType === 'suspend';

  const title = isSuspend ? 'Confirm Suspension' : 'Confirm Approval';
  const icon = isSuspend ? <XCircle className="w-12 h-12 text-red-500" /> : <CheckCircle className="w-12 h-12 text-green-500" />;
  
  // Validation: Mandatory reason and min 10 chars feedback for suspension
  const isFormValid = isSuspend ? (suspendReason !== '' && whySuspendFeedback.trim().length >= 10) : true;

  const handleConfirm = useCallback(async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    
    // NOTE: Replace this mock delay with your actual API call in the parent component
    await new Promise(resolve => setTimeout(resolve, 800)); 

    const payload = {
      userId: user.id,
      action: actionType,
      ...(isSuspend && {
        reason: suspendReason,
        feedback: whySuspendFeedback,
      }),
    };

    onConfirm(payload); // Call the parent handler
    
    setIsLoading(false);
    onClose();

    // Reset state after closure
    setSuspendReason(suspensionReasons[0].value);
    setWhySuspendFeedback('');

  }, [actionType, isFormValid, onClose, onConfirm, suspendReason, whySuspendFeedback, user.id, isSuspend]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        {/* Header */}
        <div className={`p-6 border-b ${isSuspend ? 'border-red-100' : 'border-green-100'} flex items-center space-x-4`}>
          {icon}
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-500 text-sm">Action for User: **{user.name}**</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {isSuspend ? (
            <div className="space-y-4">
              <div className="text-red-700 bg-red-50 p-3 rounded-lg flex items-start space-x-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Suspension is a permanent change and requires detailed documentation below.</p>
              </div>

              {/* Suspension Reason Select */}
              <div>
                <label htmlFor="suspend-reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Suspension Reason (Mandatory)
                </label>
                <select
                  id="suspend-reason"
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-lg shadow-sm"
                >
                  {suspensionReasons.map((r) => (
                    <option key={r.value} value={r.value} disabled={r.value === ''}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label htmlFor="suspend-feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Why Suspend Feedback (Min 10 chars)
                </label>
                <textarea
                  id="suspend-feedback"
                  rows="4"
                  value={whySuspendFeedback}
                  onChange={(e) => setWhySuspendFeedback(e.target.value)}
                  placeholder="Provide detailed, internal justification for this suspension..."
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-red-500 focus:border-red-500 text-gray-900"
                ></textarea>
                <p className={`text-xs mt-1 ${whySuspendFeedback.length < 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {whySuspendFeedback.length} / 10 characters minimum
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-2">
                Are you sure you want to **Approve** the user <span className="font-bold text-indigo-600">{user.name}</span>?
              </p>
              <p className="text-sm text-gray-500">This action will grant them full access and change their status to Approved.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant={isSuspend ? 'danger' : 'success'}
            onClick={handleConfirm}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                {isSuspend ? 'Suspend User' : 'Approve User'}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const UserStatusBadge = ({ status }) => {
  let colorClass = '';
  let text = status;

  switch (status) {
    case 'Approved':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'Suspended':
      colorClass = 'bg-red-100 text-red-800';
      break;
    case 'Pending':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
      text = 'Unknown';
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {text}
    </span>
  );
};


const UpdateUserRole = () => {
  // 1. Get initial data from React Router Loader
  const loaderData = useLoaderData();
  const { _id, name, role, status } = loaderData; 

  // 2. Initialize state using the loader data
  const [user, setUser] = useState(() => ({
    id: _id,
    name: name,
    role: role,
    status: status
  }));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'approve' or 'suspend'
  const [lastAction, setLastAction] = useState(null);

  const openModal = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  console.log("Loader Data:", { _id, name, role, status });
  const axiosInstance = useAxios();

  // 3. Fetch current user data using React Query (optional, but good practice for fresh data)
  const { data: Userdata, isLoading: isUserLoading, isError: isUserError } = useQuery({
    // Only fetch if _id exists (enabled) and include _id in the key
    queryKey: ['Userdata', _id], 
    queryFn: async () => {
      // Corrected API call path to use /user/ID
      const res = await axiosInstance.get(`/user/${_id}`); 
      return res.data;
    },
    enabled: !!_id,

  });

  console.log("Fetched Userdata:", Userdata);

  const closeModal = () => {
    setIsModalOpen(false);
    setActionType(null);
  };

  const handleUpdateRole = useCallback((payload) => {
    console.log('API Payload Sent:', payload);
    const newStatus = payload.action === 'approve' ? 'Approved' : 'Suspended';

    // Optimistic UI update
    setUser(prev => ({
      ...prev,
      status: newStatus,
    }));

    setLastAction({
      status: newStatus,
      details: payload.action === 'suspend' ? `Reason: ${payload.reason}, Feedback: "${payload.feedback}"` : 'No additional details required.',
      timestamp: new Date().toLocaleString()
    });

    // NOTE: You would typically place the actual API mutation (using a react-query mutation hook) here.
    // Example: mutation.mutate(payload);

  }, []);

  const isApproved = user.status === 'Approved';
  const isSuspended = user.status === 'Suspended';
  const isPending = user.status === 'Pending';

  // Status indicator style for the card
  const statusBorderClass = useMemo(() => {
    if (isApproved) return 'border-green-500';
    if (isSuspended) return 'border-red-500';
    return 'border-indigo-500';
  }, [isApproved, isSuspended]);
  
  // Handle loading/error states for the main data fetch
  if (isUserLoading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-indigo-600">Loading User Details...</div>;
  }
  
  if (isUserError || !user.id) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Error fetching user data or User ID not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">
        User Role Management
      </h1>

      <div className={`w-full max-w-xl bg-white shadow-xl rounded-xl border-t-4 ${statusBorderClass} p-6 space-y-6 transition-all duration-300`}>
        {/* User Info Card */}
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role} (ID: {user.id})</p>
          </div>
          <div className="ml-auto">
            <UserStatusBadge status={user.status} />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="success" 
            onClick={() => openModal('approve')} 
            // Disable if already approved or suspended (depending on business logic)
            disabled={isApproved} 
            className="flex-1"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isApproved ? 'Already Approved' : 'Approve User'}
          </Button>
          <Button 
            variant="danger" 
            onClick={() => openModal('suspend')} 
            disabled={isSuspended}
            className="flex-1"
          >
            <XCircle className="w-4 h-4 mr-2" />
            {isSuspended ? 'Already Suspended' : 'Suspend User'}
          </Button>
        </div>

        {/* Last Action Log */}
        {lastAction && (
          <div className={`p-4 mt-4 rounded-lg ${lastAction.status === 'Suspended' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border`}>
            <h4 className="font-semibold text-gray-800">Last Status Update:</h4>
            <p className="text-sm text-gray-600">
              <span className={`font-bold ${lastAction.status === 'Suspended' ? 'text-red-600' : 'text-green-600'}`}>{lastAction.status}</span> 
              {' '} at {lastAction.timestamp}
            </p>
            <p className="text-xs text-gray-500 mt-1">{lastAction.details}</p>
          </div>
        )}

 

      </div>

      {/* Role Update Modal */}
      <RoleUpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        actionType={actionType}
        user={user}
        onConfirm={handleUpdateRole}
      />
    </div>
  );
};

export default UpdateUserRole;