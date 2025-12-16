import React from 'react'

const Hero: React.FC = () => {
    return (
        <section className="relative h-[400px] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511556532299-8967196e5009?q=80&w=2070&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">The Best Digital Marketplace</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl">Find thousands of digital goods from games and software to gift cards and more.</p>
            </div>
        </section>
    )
}

export default Hero
