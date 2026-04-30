import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center space-x-reverse space-x-4">
        <div className="relative">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-96 pl-3 pr-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition outline-none"
            placeholder="بحث عن مريض بالاسم أو رقم الهوية..."
          />
        </div>
        <span className="text-blue-600 font-semibold text-lg mr-4">نظام ميد-إي آي</span>
      </div>

      <div className="flex items-center space-x-reverse space-x-4">
        <button className="text-gray-500 hover:text-gray-700 bg-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200">
          <Bell size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-700 bg-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200">
          <Settings size={20} />
        </button>
        <div className="flex items-center gap-2 mr-2">
          <div className="flex flex-col text-left items-end">
            <span className="text-sm font-semibold text-gray-800">د. أحمد الهاشمي</span>
            <span className="text-xs text-gray-500">طبيب قلب</span>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
            {/* Generate avatar using UI placeholder */}
            <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=c0aede,d1d4f9,ffdfbf" 
               alt="User Avatar" 
               className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
