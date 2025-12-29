
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">
                ♣
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                HubOfLuck
              </span>
            </div>
            <p className="max-w-sm mb-6 text-sm leading-relaxed">
              HubOfLuck is your independent source for the latest gaming news, regulatory updates, and exclusive brand bonuses. We advocate for responsible and legal gaming.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white">𝕏</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white">fb</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white">in</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Legal States Guide</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Bonus Finder</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">How to Play</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Responsible Gaming</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} HubOfLuck. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-widest font-semibold">
            <span className="text-gray-600">Gambling Problem? Call 1-800-GAMBLER</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
