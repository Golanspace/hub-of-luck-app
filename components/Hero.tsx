import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center bg-white overflow-hidden border-b border-gray-100">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/30 skew-x-12 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
        
        {/* Subtle pattern or image */}
        <img 
          src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-[0.03] grayscale"
          alt="Clean Gaming Background"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Verified Market Intelligence</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tighter text-gray-900 uppercase">
            Industry <br/>
            <span className="text-emerald-600 italic">Excellence.</span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-medium">
            Professional-grade data and exclusive access to the US regulated gaming market's most lucrative opportunities. Pure intelligence, no noise.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 px-10 rounded-xl transition-all shadow-xl shadow-emerald-100 uppercase tracking-widest text-xs">
              Claim Premium Access
            </button>
            <button className="bg-gray-900 hover:bg-black text-white font-black py-5 px-10 rounded-xl transition-all uppercase tracking-widest text-xs shadow-xl shadow-gray-200">
              Latest Data Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;