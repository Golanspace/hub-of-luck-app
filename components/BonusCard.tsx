import React from 'react';
import { BonusOffer } from '../types.ts';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden mb-8 group hover:border-emerald-500/30 transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] animate-fadeInUp">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        <div className="lg:w-[32%] p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 flex items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-slate-50 border border-slate-100 rounded-[32px] p-4 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img src={bonus.logo} className="max-w-full h-auto object-contain rounded-2xl" alt={bonus.brand} />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xl md:text-2xl tracking-tighter leading-tight">{bonus.brand}</h4>
            <div className="flex items-center gap-1.5 mt-2">
              {[1,2,3,4,5].map(i => <span key={i} className="text-emerald-600 text-[8px]">★</span>)}
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">{bonus.rating}/5.0</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-slate-50/20">
          <div className="inline-flex items-center gap-2 mb-3">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Verified Hub Exclusive</span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">{bonus.offer}</div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase px-4 py-1.5 bg-white border border-slate-200 rounded-xl">Validated 2024</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase px-4 py-1.5 bg-white border border-slate-200 rounded-xl">Instant Load</span>
          </div>
        </div>

        <div className="lg:w-[28%] p-8 md:p-10 flex flex-col justify-center items-center gap-6 bg-white border-t lg:border-t-0 lg:border-l border-slate-100">
          <div className="w-full">
             <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.2em] block text-center mb-2">Bonus Code</span>
             <div className="px-6 py-4 bg-slate-950 text-emerald-400 text-sm font-mono font-black rounded-2xl border border-slate-800 text-center select-all cursor-pointer hover:bg-black transition-colors shadow-xl">
               {bonus.promoCode}
             </div>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-500/10 active:scale-95">
            Claim Offer Now
          </button>
        </div>

      </div>

      <div className="bg-slate-50/50 px-10 py-4 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">{bonus.terms}</p>
        <div className="flex items-center gap-4 opacity-40">
            <span className="text-[9px] font-black text-slate-950">21+</span>
            <span className="text-[9px] font-black text-slate-950 uppercase tracking-widest">Secure Link</span>
        </div>
      </div>
    </div>
  );
};

export default BonusCard;