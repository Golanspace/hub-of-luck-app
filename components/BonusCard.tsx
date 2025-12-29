import React from 'react';
import { BonusOffer } from '../types.ts';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-50">
            <img src={bonus.logo} className="w-full h-full object-cover" alt={bonus.brand} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{bonus.brand}</h4>
            <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Verified 2024</div>
          </div>
        </div>
        <div className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">★ {bonus.rating}</div>
      </div>

      <div className="mb-6">
        <div className="text-xl font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
          {bonus.offer}
        </div>
        <p className="text-[10px] text-gray-400 mt-2 font-medium leading-relaxed">{bonus.terms}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100/50">
          <span className="text-[9px] text-gray-400 font-black uppercase">Promo Code</span>
          <span className="font-mono text-sm font-black text-emerald-600">{bonus.promoCode}</span>
        </div>
        
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-emerald-100">
          Claim Bonus
        </button>
      </div>
    </div>
  );
};

export default BonusCard;