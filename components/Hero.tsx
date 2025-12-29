import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center bg-[#050505] overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-20 scale-105"
          alt="Luxury Gaming Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live Market Intelligence</span>
          </div>
          
          <h1 className="text-7xl lg:text-9xl font-black leading-[0.9] mb-8 tracking-tighter uppercase italic">
            Play <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Smarter.</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl font-medium">
            Professional-grade data and exclusive access to the US regulated gaming market's most lucrative opportunities.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] uppercase tracking-widest text-sm">
              Get Access Now
            </button>
            <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold py-5 px-10 rounded-xl transition-all uppercase tracking-widest text-sm">
              Our Methodology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;