import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import { 
  Save, 
  ArrowLeft, 
  DollarSign, 
  Percent, 
  Tag, 
  FileText, 
  Image as ImageIcon,
  Calendar,
  AlertCircle,
  CheckCircle,
  Home
} from 'lucide-react';
import { toast } from 'react-toastify';


function UpdateLoansByManager() {
  const LoanCategoryData = useLoaderData();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = LoanCategoryData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: initialData.loanTitle || '',
      description: initialData.description || '',
      maxLimit: initialData.maxLoanLimit || '',
      interestRate: initialData.interestRate || '',
      category: initialData.category || '',
      emiPlans: initialData.emiPlans || '',
      imageUrl: initialData.display_url || '',
     
    }
  });

  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    
    const updatedLoanData = {
      loanTitle: formData.title,
      display_url: formData.imageUrl,
      maxLoanLimit: formData.maxLimit,
      interestRate: formData.interestRate,
      description: formData.description,
      category: formData.category,
      emiPlans: formData.emiPlans,

    };

    try {
      const response = await axiosInstance.patch(
        `/update-loan-category/${initialData._id}`,
        updatedLoanData
      );
      console.log('Loan updated successfully:', response.data);
      toast.success('Loan category updated successfully!');
      
      // Navigate back after short delay
      setTimeout(() => {
        navigate('/dashboard/manage-loans');
      }, 1500);
    } catch (error) {
      console.error('Error updating loan:', error);
      toast.error(error.response?.data?.message || 'Failed to update loan category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    'mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 placeholder-gray-500';
  const labelStyle = 'block text-sm font-semibold text-gray-300 mb-2';
  const errorStyle = 'mt-2 text-sm font-medium text-red-400 flex items-center gap-1';

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 shadow-2xl rounded-2xl border border-gray-700 p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-8 h-8 text-blue-500" />
                  Edit Loan Category
                </h1>
                <p className="text-gray-400 mt-1">
                  Update details for: <span className="text-blue-400 font-semibold">{initialData.loanTitle}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 shadow-2xl rounded-2xl border border-gray-700 p-6 sm:p-10">
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-8">
            {/* Loan Title */}
            <div>
              <label htmlFor="title" className={labelStyle}>
                <Tag className="w-4 h-4 inline mr-2" />
                Loan Title
              </label>
              <input
                id="title"
                {...register('title', { required: 'Loan Title is required' })}
                type="text"
                placeholder="e.g., Personal Loan, Home Loan"
                className={inputStyle}
              />
              {errors.title && (
                <p className={errorStyle}>
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelStyle}>
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <textarea
                id="description"
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 10, message: 'Description must be at least 10 characters' }
                })}
                rows="4"
                placeholder="Provide a detailed description of the loan category..."
                className={inputStyle}
              ></textarea>
              {errors.description && (
                <p className={errorStyle}>
                  <AlertCircle className="w-4 h-4" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Grid Layout for Numeric Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Interest Rate */}
              <div>
                <label htmlFor="interestRate" className={labelStyle}>
                  <Percent className="w-4 h-4 inline mr-2" />
                  Interest Rate (%)
                </label>
                <input
                  id="interestRate"
                  {...register('interestRate', {
                    required: 'Interest rate is required',
                    valueAsNumber: true,
                    min: { value: 0.1, message: 'Must be greater than 0' },
                    max: { value: 100, message: 'Must be less than 100' },
                  })}
                  type="number"
                  step="0.01"
                  placeholder="e.g., 8.5"
                  className={inputStyle}
                />
                {errors.interestRate && (
                  <p className={errorStyle}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.interestRate.message}
                  </p>
                )}
              </div>

              {/* Max Loan Limit */}
              <div>
                <label htmlFor="maxLimit" className={labelStyle}>
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Max Loan Limit
                </label>
                <input
                  id="maxLimit"
                  {...register('maxLimit', {
                    required: 'Max limit is required',
                    valueAsNumber: true,
                    min: { value: 1000, message: 'Must be at least 1000' },
                  })}
                  type="number"
                  placeholder="e.g., 50000"
                  className={inputStyle}
                />
                {errors.maxLimit && (
                  <p className={errorStyle}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.maxLimit.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className={labelStyle}>
                  <Tag className="w-4 h-4 inline mr-2" />
                  Category
                </label>
                <input
                  id="category"
                  {...register('category', { required: 'Category is required' })}
                  type="text"
                  placeholder="e.g., Personal, Business"
                  className={inputStyle}
                />
                {errors.category && (
                  <p className={errorStyle}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* EMI Plans */}
            <div>
              <label htmlFor="emiPlans" className={labelStyle}>
                <Calendar className="w-4 h-4 inline mr-2" />
                Available EMI Plans (in months)
              </label>
              <input
                id="emiPlans"
                {...register('emiPlans', {
                  required: 'EMI plans are required',
                  pattern: {
                    value: /^(\s*\d+\s*)(,\s*\d+\s*)*$/,
                    message: 'Must be comma-separated numbers (e.g., 12, 24, 36)',
                  },
                })}
                type="text"
                placeholder="e.g., 12, 24, 36, 48"
                className={inputStyle}
              />
              <p className="mt-2 text-xs text-gray-400">
                Enter values as comma-separated numbers representing months
              </p>
              {errors.emiPlans && (
                <p className={errorStyle}>
                  <AlertCircle className="w-4 h-4" />
                  {errors.emiPlans.message}
                </p>
              )}
            </div>

            {/* Image URL & Show on Home */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="lg:col-span-3">
                <label htmlFor="imageUrl" className={labelStyle}>
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  {...register('imageUrl', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Must be a valid URL starting with http:// or https://',
                    },
                  })}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={inputStyle}
                />
                {errors.imageUrl && (
                  <p className={errorStyle}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200">
                Changes will be reflected immediately. Make sure all information is accurate before submitting.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  flex-1 flex justify-center items-center gap-2 py-4 px-6 rounded-xl 
                  font-bold text-white transition-all duration-300 shadow-lg
                  ${
                    isSubmitting
                      ? 'bg-blue-500 cursor-wait opacity-70'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:scale-[1.02] active:scale-95'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Loan Category
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
                className="sm:w-auto px-6 py-4 rounded-xl font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateLoansByManager