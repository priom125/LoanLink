import React, { useState } from 'react'

function FAQSection() {
    const mockFAQ = [
    { q: "How long does the approval process take?", a: "Our digital process ensures approval within 48 hours for most standard applications, provided all documentation is complete." },
    { q: "What is the maximum repayment period?", a: "Repayment terms vary by loan type, generally ranging from 6 months up to 3 years (36 months) for our micro-business loans." },
    { q: "Are there any hidden fees?", a: "No. LoanLink operates with complete transparency. All fees are clearly detailed in your loan agreement prior to final approval." },
];
const [faq, setFaq] = useState(mockFAQ);
const [openIndex, setOpenIndex] = useState(null);
const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
};

  return (
    <section className="w-full max-w-7xl mx-auto py-12">
            <h2 className="text-4xl font-extrabold text-white text-center mb-12">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {faq.map((item, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <button
                            className="w-full text-left p-5 flex justify-between items-center text-white text-lg font-semibold transition duration-300 hover:bg-gray-800 focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={openIndex === index}
                        >
                            {item.q}
                            <svg 
                                className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-green-500' : 'rotate-0 text-gray-400'}`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {openIndex === index && (
                            <div className="p-5 pt-0 text-gray-300 border-t border-gray-800/50">
                                <p className="text-base">{item.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
  )
}

export default FAQSection