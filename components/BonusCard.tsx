import React from 'react';
import { BonusOffer } from '../types.ts';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-emerald-500/50 transition-all hover:shadow-xl animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-8">
        
        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
          <img src={bonus.logo} className="max-w-full h-auto object-contain rounded-lg" alt={bonus.brand} />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
             <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Editor's Choice</span>
             <div className="flex text-emerald-600 text-[8px]">★★★★★</div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">{bonus.offer}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{bonus.brand} | Verified Link</p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 w-full md:w-auto">
          <div className="w-full px-6 py-4 bg-slate-900 text-emerald-400 text-xs font-mono font-black rounded-xl border border-slate-800 text-center select-all cursor-pointer shadow-sm">
            {bonus.promoCode}
          </div>
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-8 rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 whitespace-nowrap">
            Claim Offer
          </button>
        </div>
      </div>

      <div className="bg-slate-50 px-8 py-3 flex justify-between items-center border-t border-slate-100">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{bonus.terms}</span>
        <span className="text-[9px] text-slate-950 font-black uppercase tracking-widest italic">21+ | Valid US</span>
      </div>
    </div>
  );
};

export default BonusCard;