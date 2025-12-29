import React from 'react';
import { BonusOffer } from '../types.ts';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-8 transition-all hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-1">
      <div className="absolute top-8 right-8">
        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Active</span>
        </div>
      </div>

      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-50 shadow-sm">
          <img src={bonus.logo} className="w-full h-full object-cover" alt={bonus.brand} />
        </div>
        <div>
          <h4 className="serif-title font-black text-gray-900 text-xl tracking-tight">{bonus.brand}</h4>
          <div className="flex items-center gap-2 mt-1">
             <div className="flex text-amber-400 text-xs">★★★★★</div>
             <span className="text-[10px] text-gray-400 font-bold uppercase">{bonus.rating}/5.0</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-2xl font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
          {bonus.offer}
        </div>
        <div className="mt-4 p-4 bg-emerald-50/50 rounded-2xl border border-dashed border-emerald-200">
           <p className="text-[11px] text-emerald-800 font-medium leading-relaxed italic">"{bonus.terms}"</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col justify-center bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100">
          <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Promo Code</span>
          <span className="font-mono text-sm font-black text-gray-900">{bonus.promoCode}</span>
        </div>
        
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.15em] transition-all shadow-lg shadow-emerald-100/50">
          Claim Now
        </button>
      </div>
    </div>
  );
};

export default BonusCard;