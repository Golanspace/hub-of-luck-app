import React from 'react';
import { BonusOffer } from '../types.ts';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 transition-all hover:border-emerald-500/50 hover:bg-[#151515] hover:shadow-2xl hover:shadow-emerald-900/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={bonus.logo} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt={bonus.brand} />
          <div>
            <h4 className="font-bold text-white uppercase tracking-tight">{bonus.brand}</h4>
            <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Verified 2024</div>
          </div>
        </div>
        <div className="text-xs font-bold text-gray-500">★ {bonus.rating}</div>
      </div>

      <div className="mb-6">
        <div className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors leading-tight">
          {bonus.offer}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-xl border border-white/5">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Code</span>
          <span className="font-mono text-sm font-black text-emerald-400">{bonus.promoCode}</span>
        </div>
        
        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
          Claim Now
        </button>
      </div>
    </div>
  );
};

export default BonusCard;