import React, { useCallback, useState } from 'react'

function CustomerFeedbackCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
   const mockTestimonials = [
    {
        id: 1,
        quote: "LoanLink cut our application processing time by 60%. The centralized dashboard is a game-changer for our small team. Highly recommended for any microfinance operation.",
        name: "Aisha R.",
        title: "CEO, Community Development Fund",
    },
    {
        id: 2,
        quote: "Before LoanLink, managing EMI payments was a nightmare of spreadsheets. Now, everything is automated and transparent. It allowed us to focus more on outreach.",
        name: "Ben T.",
        title: "Operations Manager, Global Microloan Initiative",
    },
    {
        id: 3,
        quote: "The verification flow is so smooth. The compliance checks saved us immense time and reduced errors compared to our previous paper-based system. A huge leap forward.",
        name: "Dr. Chen L.",
        title: "Director, Educational Finance NGO",
    },
];
    const [testimonials] = useState(mockTestimonials);

    const currentTestimonial = testimonials[activeIndex];
    const goToPrev = useCallback(() => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    }, [testimonials.length]);

    const goToNext = useCallback(() => {
        setActiveIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    }, [testimonials.length]);

  return (
    <section className="w-full max-w-4xl py-16 mx-auto px-4 sm:px-6 lg:px-8 ">
            <h2 className="text-4xl font-extrabold text-base-content text-center mb-12">
                What Our Customers Say
            </h2>

            <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-black/50">
                
                {/* Carousel Content */}
                <div key={currentTestimonial.id} className="text-center transition duration-700 ease-in-out">
                    
                    {/* Quote Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c0-2.484 1.487-4.48 4.09-4.908l.758-.108a.7.7 0 01.764.577.7.7 0 01-.58.76l-.758.108c-1.898.324-3.08 1.57-3.08 3.553V10h1.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H8.5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.228 9c0-2.484 1.487-4.48 4.09-4.908l.758-.108a.7.7 0 01.764.577.7.7 0 01-.58.76l-.758.108c-1.898.324-3.08 1.57-3.08 3.553V10h1.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H15.5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5z" />
                    </svg>

                    <p className="text-2xl italic text-gray-200 leading-relaxed mb-6">
                        "{currentTestimonial.quote}"
                    </p>
                    
                    <div className="border-t border-gray-800 pt-4">
                        <p className="text-lg font-bold text-white">
                            {currentTestimonial.name}
                        </p>
                        <p className="text-sm text-blue-400">
                            {currentTestimonial.title}
                        </p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button 
                    onClick={goToPrev} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-700/50 text-white hover:bg-gray-700 transition duration-200 z-10 focus:outline-none focus:ring-4 ring-blue-500/50"
                    aria-label="Previous testimonial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={goToNext} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-700/50 text-white hover:bg-gray-700 transition duration-200 z-10 focus:outline-none focus:ring-4 ring-blue-500/50"
                    aria-label="Next testimonial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                index === activeIndex ? 'bg-green-500 w-4' : 'bg-gray-600'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
  )
}

export default CustomerFeedbackCarousel