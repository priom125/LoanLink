import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';

// Define the available roles for the dropdown
const userRoles = [
  { value: 'manager', label: 'manager' },
  { value: 'borrower', label: 'borrower' },

];


const AddUserByAdmin = () => {

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false); 


  const {
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting }, 
  } = useForm({
   
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: userRoles[0].value,
      roleStatus: 'Pending'
    },
  });

  const axiosInstance = useAxios();

  // Function called on successful form submission (after validation)
const onSubmit = async (data) => {
setMessage(null);
setIsError(false);
console.log('Attempting to add user:', data);

const url = 'http://localhost:3000/users';
const fullSubmission = {
    name : `${data.firstName} ${data.lastName}`,
firstName: data.firstName,
lastName: data.lastName,
email: data.email,
role: data.role,
roleStatus: 'Pending',

};

try {
const response = await axiosInstance.post(url, fullSubmission);
console.log('Registration successful! Response:', response.data);
setMessage('User added successfully');
setIsError(false);
reset();
} catch (error) {
console.error('API Error:', error);
const errorMsg = error?.response?.data?.message || error.message || 'Unknown error';
setMessage(`Failed to add user: ${errorMsg}`);
setIsError(true);
}
};

  // Tailwind CSS classes for consistent styling
  const inputStyle = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "mt-1 text-xs font-semibold text-red-600 flex items-center";

  return (
    <div className="p-4 sm:p-8 flex justify-center items-start">
      
      {/* Wrapper to center the toggle button and the form card */}
      <div className="w-full max-w-lg"> 
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="mb-6 w-full cursor-pointer flex justify-center py-3 px-4 rounded-xl shadow-md text-lg font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          {isFormVisible ? 'Hide User Creation Form' : 'Show User Creation Form'}
        </button>

        {/* Conditional Form Rendering based on isFormVisible state */}
        {isFormVisible && (
          <div className="bg-white p-6 sm:p-10 shadow-2xl rounded-xl border-t-4 border-indigo-600">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Admin Portal
            </h2>
            <p className="text-gray-500 mb-8">
              Add new users and assign their roles securely.
            </p>

          
            {message && (
              <div 
                className={`p-4 mb-6 rounded-lg font-medium transition-opacity duration-300 ${
                  isError 
                    ? 'bg-red-100 text-red-800 border border-red-300' 
                    : 'bg-green-100 text-green-800 border border-green-300'
                }`}
              >
                {message}
              </div>
            )}

            {/* Form Container */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* --- First Name Input --- */}
              <div>
                <label htmlFor="firstName" className={labelStyle}>First Name</label>
                <input
                  id="firstName"
                  type="text"
                  // Register input with validation rules
                  {...register('firstName', { 
                    required: 'First name is required',
                    maxLength: { value: 50, message: 'Max 50 characters' }
                  })}
                  className={inputStyle}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && (
                  <p role="alert" className={errorStyle}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* --- Last Name Input --- */}
              <div>
                <label htmlFor="lastName" className={labelStyle}>Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', { 
                    required: 'Last name is required',
                    maxLength: { value: 50, message: 'Max 50 characters' }
                  })}
                  className={inputStyle}
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && (
                  <p role="alert" className={errorStyle}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* --- Email Input --- */}
              <div>
                <label htmlFor="email" className={labelStyle}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email format'
                    }
                  })}
                  className={inputStyle}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p role="alert" className={errorStyle}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* --- Role Dropdown (Select) --- */}
              <div>
                <label htmlFor="role" className={labelStyle}>User Role</label>
                <select
                  id="role"
                  {...register('role', { required: 'Role selection is required' })}
                  className={inputStyle}
                  aria-invalid={errors.role ? "true" : "false"}
                >
                  {userRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p role="alert" className={errorStyle}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* --- Submit Button --- */}
              <button
                type="submit"
                disabled={isSubmitting} // Disable during submission to prevent duplicates
                className={`
                  w-full flex justify-center items-center py-3 px-4 border border-transparent 
                  rounded-xl shadow-lg text-lg font-semibold text-white transition-all duration-300
                  ${isSubmitting
                    ? 'bg-indigo-400 cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'
                  }
                `}
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Add User'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserByAdmin;