import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Users, Calendar, Settings, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'لوحة القيادة', icon: Activity, path: '/dashboard' },
    { name: 'المرضى', icon: Users, path: '/patients' },
    { name: 'الجدول الزمني', icon: Calendar, path: '/schedule' },
  ];

  return (
    <aside className="w-64 bg-white border-l border-gray-200 h-screen sticky top-0 flex flex-col items-center py-6">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-700 rounded text-white flex items-center justify-center mb-2">
          <Activity size={24} />
        </div>
        <h1 className="text-xl font-bold text-blue-800">مركز التحكم</h1>
        <p className="text-xs text-gray-500">الذكاء الاصطناعي السريري</p>
      </div>

      <nav className="w-full flex-1">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg w-full transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon
                  size={20}
                  className="ml-3"
                />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full px-4 mt-auto">
        <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
          <PlusCircle size={20} className="ml-2" />
          <span>إضافة حالة طوارئ</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
