import React from 'react';
import { BonusOffer } from '../types.ts';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6 group hover:border-emerald-400 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* Brand/Logo Section */}
        <div className="lg:w-1/4 p-8 border-b lg:border-b-0 lg:border-r border-slate-100 flex items-center gap-6">
          <div className="w-20 h-20 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-2 flex items-center justify-center">
            <img src={bonus.logo} className="max-w-full h-auto object-contain rounded-lg" alt={bonus.brand} />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xl leading-tight">{bonus.brand}</h4>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-amber-500 text-xs">★★★★★</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bonus.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Offer Details section */}
        <div className="flex-1 p-8 flex flex-col justify-center bg-slate-50/20">
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">Editor Verified Offer</div>
          <div className="text-2xl font-black text-slate-900 mb-3 leading-tight tracking-tight">{bonus.offer}</div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase px-2.5 py-1 bg-white border border-slate-200 rounded-md">Legal in 45+ US States</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase px-2.5 py-1 bg-white border border-slate-200 rounded-md">Instant Access</span>
          </div>
        </div>

        {/* Action / Promo Code Section */}
        <div className="lg:w-1/4 p-8 flex flex-col justify-center items-center gap-4 bg-white border-t lg:border-t-0 lg:border-l border-slate-100">
          <div className="w-full">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block text-center mb-1.5">Use Promo Code</span>
             <div className="px-4 py-2.5 bg-slate-900 text-white text-xs font-mono font-black rounded-lg border border-slate-950 text-center select-all cursor-pointer hover:bg-black transition-colors">
               {bonus.promoCode}
             </div>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-emerald-600/10">
            Claim Bonus
          </button>
          <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">Read Expert Review ›</a>
        </div>

      </div>

      {/* Terms Footer */}
      <div className="bg-slate-50 px-8 py-2.5 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 font-medium italic">"{bonus.terms}"</p>
        <div className="flex items-center gap-4">
            <span className="text-[9px] font-black text-emerald-600 uppercase">21+</span>
            <span className="text-[9px] font-black text-slate-400 uppercase">Licensed</span>
        </div>
      </div>
    </div>
  );
};

export default BonusCard;