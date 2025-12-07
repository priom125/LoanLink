import React from 'react'

function AboutUs() {
  return (
   <div className="w-full max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-white text-center mb-8">
            Our Mission: Empowering Global Microfinance
        </h1>
        
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 p-8 space-y-8 text-gray-300">
            
            <section>
                <h2 className="text-3xl font-bold text-green-500 mb-4">
                    The LoanLink Vision
                </h2>
                <p className="text-lg leading-relaxed">
                    LoanLink was founded in 2021 with a singular goal: to digitize and simplify the microloan ecosystem for non-governmental organizations and small financial institutions operating in underserved communities. We believe that technology should be an accelerator for social good, not a barrier. Our platform eliminates tedious paperwork, speeds up risk assessment, and ensures transparent, equitable fund distribution.
                </p>
            </section>

            <div className="border-t border-gray-800 pt-8">
                <h2 className="text-3xl font-bold text-green-500 mb-4">
                    Our Core Values
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
                    <li className="p-4 bg-gray-800/50 rounded-lg">
                        <span className="text-xl font-bold text-white block mb-1">Integrity</span>
                        We operate with complete transparency, ensuring trust in every transaction.
                    </li>
                    <li className="p-4 bg-gray-800/50 rounded-lg">
                        <span className="text-xl font-bold text-white block mb-1">Efficiency</span>
                        Our digital-first approach ensures quick turnaround times for vital funding.
                    </li>
                    <li className="p-4 bg-gray-800/50 rounded-lg">
                        <span className="text-xl font-bold text-white block mb-1">Impact</span>
                        Everything we build is designed to maximize the positive social and economic impact for our clients' beneficiaries.
                    </li>
                </ul>
            </div>

            <section className="border-t border-gray-800 pt-8">
                <h2 className="text-3xl font-bold text-green-500 mb-4">
                    Our History of Growth
                </h2>
                <p className="leading-relaxed">
                    Starting with a pilot program in Southeast Asia, LoanLink quickly scaled its operations based on the immediate need for reliable, digital microfinance management tools. Today, we partner with institutions across three continents, helping them manage portfolios totaling over $12 million. We continue to innovate, incorporating features like automated compliance checks and real-time portfolio analytics to stay ahead of the curve.
                </p>
            </section>
        </div>
    </div>
  )
}

export default AboutUs