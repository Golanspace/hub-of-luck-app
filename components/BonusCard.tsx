
import React from 'react';
import { BonusOffer } from '../types';

interface BonusCardProps {
  bonus: BonusOffer;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  return (
    <div className="relative p-5 border border-gray-100 rounded-xl hover:border-emerald-500 transition-all bg-white group shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 overflow-hidden">
      {/* Rating badge */}
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">
        Top Choice
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img src={bonus.logo} className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shadow-sm" alt={bonus.brand} />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-100">
             <div className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 rounded-full">★ {bonus.rating}</div>
          </div>
        </div>
        <div>
          <h4 className="font-black text-gray-900 text-lg leading-tight uppercase tracking-tight">{bonus.brand}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Legit & Verified</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors leading-[1.1]">
          {bonus.offer}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-dashed border-gray-200 group-hover:bg-emerald-50 transition-colors">
          <span className="text-[10px] font-black text-gray-400 uppercase">Promo Code</span>
          <span className="font-mono text-sm font-black text-emerald-700">{bonus.promoCode}</span>
        </div>
        
        <button className="w-full bg-[#0a0f0d] hover:bg-emerald-600 text-white py-4 rounded-xl text-sm font-black tracking-widest transition-all transform active:scale-95 shadow-lg shadow-gray-900/10 uppercase">
          Claim Offer
        </button>
        
        <p className="text-[9px] text-gray-400 text-center font-medium leading-tight px-4">
          {bonus.terms}
        </p>
      </div>
    </div>
  );
};

export default BonusCard;
