import React from 'react'
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAxios from '../hooks/useAxios';


function UpdateLoansByManager() {

    const LoanCategoryData = useLoaderData();

const axiosInstance = useAxios();

// console.log(LoanCategoryData);


  const initialData = LoanCategoryData;

  const loanTtile = initialData.loanTitle || '';
  const description = initialData.description || '';
  const maxLoanLimit = initialData.maxLoanLimit || '';
  const interestRate = initialData.interestRate || '';
  const category = initialData.category || '';
  const emiPlans = initialData.emiPlans || '';
  const display_url = initialData.display_url || '';



   
 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

    const handleUpdate = (formData) => {
  
   const updatedLoanData = {
      loanTitle: formData.title,
      display_url: formData.imageUrl,
      maxLoanLimit: formData.maxLimit, 
      interestRate: formData.interestRate, 
      
     
      description: formData.description,
      category: formData.category,
      emiPlans: formData.emiPlans,

   };

    // console.log('Updated Loan Data:', updatedLoanData);


    axiosInstance.patch(`/update-loan-category/${initialData._id}`, updatedLoanData)
      .then((response) => {
        console.log('Loan updated successfully:', response.data);
      
        reset();
      })
      .catch((error) => {
        console.error('Error updating loan:', error);
       
      });
 
  };


  return (
      <div className="p-4 sm:p-8 max-w-5xl mx-auto bg-white shadow-2xl rounded-xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Edit Loan Details: {initialData.loanTitle}
      </h1>

      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
        {/* Loan Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Loan Title
          </label>
          <input
          defaultValue={loanTtile}
            id="title"
            {...register('title', { required: 'Loan Title is required' })}
            type="text"
            className={`mt-1 block w-full rounded-lg border p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
          defaultValue={description}
            id="description"
            {...register('description', { required: 'Description is required' })}
            rows="3"
            className={`mt-1 block w-full rounded-lg border p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>




        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Interest Rate */}
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
              Interest Rate (%)
            </label>
            <input
            defaultValue={interestRate}
              id="interestRate"
              {...register('interestRate', {
                required: 'Interest is required',
                valueAsNumber: true,
                min: { value: 0.1, message: 'Must be > 0' },
              })}
              type="number"
              step="0.01"
              className={`mt-1 block w-full rounded-lg border p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.interestRate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.interestRate && (
              <p className="mt-1 text-sm text-red-600">{errors.interestRate.message}</p>
            )}
          </div>

          {/* Max Loan Limit */}
          <div>
            <label htmlFor="maxLimit" className="block text-sm font-medium text-gray-700">
              Max Loan Limit
            </label>
            <input
            defaultValue={maxLoanLimit}
              id="maxLimit"
              {...register('maxLimit', {
                required: 'Max limit is required',
                valueAsNumber: true,
                min: { value: 1000, message: 'Must be at least 1000' },
              })}
              type="number"
              className={`mt-1 block w-full rounded-lg border p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.maxLimit ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.maxLimit && (
              <p className="mt-1 text-sm text-red-600">{errors.maxLimit.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
            defaultValue={category}
              id="category"
              {...register('category', { required: 'Category is required' })}
              type="text"
              className={`mt-1 block w-full rounded-lg border p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Status (New Field) */}
          
           
        </div>

        {/* EMI Plans */}
        <div>
          <label htmlFor="emiPlans" className="block text-sm font-medium text-gray-700">
            Available EMI Plans (in months)
          </label>
          <input
          defaultValue={emiPlans}
            id="emiPlans"
            {...register('emiPlans', { 
                required: 'EMI plans are required (e.g., 12, 24, 36)',
                pattern: {
                    // Regex to ensure it's comma-separated integers, optional whitespace
                    value: /^(\s*\d+\s*)(,\s*\d+\s*)*$/,
                    message: 'Must be comma-separated numbers (e.g., 12, 24, 36)',
                }
            })}
            type="text"
            placeholder="e.g., 12, 24, 36"
            className={`mt-1 block w-full rounded-lg border p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.emiPlans ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter values as comma-separated numbers (e.g., 12, 24, 36).
          </p>
          {errors.emiPlans && (
            <p className="mt-1 text-sm text-red-600">{errors.emiPlans.message}</p>
          )}
        </div>

        {/* Image URL & Checkbox Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Image URL (display_url)
                </label>
                <input
                    defaultValue={display_url}
                    id="imageUrl"
                    {...register('imageUrl')}
                    type="url"
                    className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Paste image URL here"
                />
            </div>
            
            <div className="flex items-center pt-8">
                <input

                    id="showOnHome"
                    type="checkbox"
                    {...register('showOnHome')}
                    className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="showOnHome" className="ml-3 block text-sm font-medium text-gray-700">
                    Show on Home Page
                </label>
            </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
        
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-green-500 cursor-pointer transition duration-200 shadow-md"
        >
          Update Loan Details
        </button>
      </form>
    </div>
  )
}

export default UpdateLoansByManager