import React from 'react'

function HowItsWorksSection() {
    const howItWorksSteps = [
    {
        step: 1,
        title: "Digital Application",
        description: "Clients submit their loan requests and necessary documentation entirely online through a secure, user-friendly form.",
        icon: (
            // Form Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
    },
    {
        step: 2,
        title: "Efficient Review & Verify",
        description: "Loan officers use the LoanLink dashboard to quickly verify applications, check compliance, and assess risk in a single view.",
        icon: (
            // Document/File Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m-1.414 7.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
    },
    {
        step: 3,
        title: "Fast Approval & Disbursal",
        description: "Once approved, the system generates necessary documentation and allows for quick, secure disbursement of funds to the client.",
        icon: (
            // Checkmark Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.27a2 2 0 010 2.83L15 17l-4 4-9-9 9-9z" />
            </svg>
        ),
    },
    {
        step: 4,
        title: "Automated Management",
        description: "LoanLink automatically tracks EMI schedules, sends payment reminders, and records repayments, freeing up staff time.",
        icon: (
            // Clock Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];
  return (
     <section className="w-full max-w-7xl py-12 mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
            How LoanLink Works (Step-by-step)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
                <div key={step.step} className="text-center p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-lg shadow-black/30 transition duration-300 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-blue-500/20">
                    
                    {/* Step Number Badge */}
                    <div className={`flex items-center justify-center mx-auto mb-4 h-12 w-12 rounded-full bg-green-500 text-gray-900 font-extrabold text-xl ring-4 ring-green-500/50`}>
                        {step.step}
                    </div>

                    {/* Icon */}
                    <div className="text-green-400 mx-auto mb-4 h-8 w-8">
                        {step.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default HowItsWorksSection