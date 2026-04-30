import React from 'react';
import { appointments } from '../data/mockData';
import { ChevronRight, ChevronLeft, Plus, MoreVertical, Calendar as CalendarIcon, FileBarChart, Clock } from 'lucide-react';

const Schedule = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div className="flex gap-3">
           {/* Date Navigator */}
           <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
              اليوم
           </button>
           <div className="flex items-center bg-white border border-gray-200 rounded-lg">
              <button className="px-3 py-2 text-gray-500 hover:bg-gray-50 border-l border-gray-200">
                 <ChevronRight size={18} />
              </button>
              <span className="px-4 py-2 text-sm font-bold text-gray-800">
                 14 أكتوبر - 20 أكتوبر 2023
              </span>
              <button className="px-3 py-2 text-gray-500 hover:bg-gray-50 border-r border-gray-200">
                 <ChevronLeft size={18} />
              </button>
           </div>
        </div>
        
        <div className="text-right">
           <div className="text-sm text-gray-500 mb-1">
              الرئيسية / <span className="text-gray-800">الجدول الزمني</span>
           </div>
           <h2 className="text-2xl font-bold text-gray-900">جدول المواعيد</h2>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Timeline Area (Takes 3 columns) */}
        <div className="lg:col-span-3">
           
           {/* View Toggles */}
           <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-2 mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1 w-64">
                 <button className="flex-1 text-center py-1.5 text-sm font-bold bg-white text-gray-800 shadow-sm rounded-md">
                    عرض اليوم
                 </button>
                 <button className="flex-1 text-center py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800">
                    عرض الأسبوع
                 </button>
              </div>
              
              <div className="flex gap-2">
                 <button className="px-4 py-2 text-sm bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-100">
                    كل العيادات
                 </button>
                 <button className="px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 rounded-lg border border-transparent">
                    باطنة
                 </button>
              </div>
           </div>

           {/* Timeline List */}
           <div className="space-y-4 relative">
              {/* Vertical line indicator */}
              <div className="absolute right-24 top-0 bottom-0 w-0.5 bg-gray-100 -z-10"></div>
              
              {appointments.map((apt) => (
                 <div key={apt.id} className="flex items-center group">
                    {/* Time Slot */}
                    <div className="w-24 flex-shrink-0 text-center text-gray-800">
                       <p className="font-bold text-lg">{apt.time}</p>
                       <p className="text-xs text-gray-400">{apt.amPm}</p>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 pr-4 pl-0 py-1 ${apt.type === 'addition' ? 'opacity-60' : ''}`}>
                       {apt.type === 'addition' ? (
                          // Add new appointment placeholder
                          <button className="w-full h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-blue-500 hover:border-blue-300 transition">
                             <Plus size={20} className="mr-2" />
                             إضافة موعد متاح
                          </button>
                       ) : (
                          // Regular appointment card
                          <div className={`w-full bg-white border rounded-xl shadow-sm flex items-center justify-between p-4 px-6
                             ${apt.highlight ? 'border-orange-200 ring-1 ring-orange-200 bg-orange-50/10 border-l-4 border-l-orange-500' : 'border-gray-200'}`}>
                             
                             <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.patient}&backgroundColor=c0aede`} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="text-right">
                                   <h4 className="font-bold text-gray-800">{apt.patient}</h4>
                                   <p className="text-xs text-gray-500 flex items-center">
                                      {apt.highlight ? <Clock size={12} className="ml-1" /> : <CalendarIcon size={12} className="ml-1" />}
                                      {apt.type}
                                   </p>
                                </div>
                             </div>

                             <div className="flex items-center gap-6">
                                <span className={`px-4 py-1 text-xs font-bold rounded-full ${apt.statusColor}`}>
                                   {apt.status}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600">
                                   <MoreVertical size={20} />
                                </button>
                             </div>

                          </div>
                       )}
                    </div>
                 </div>
              ))}
           </div>

        </div>

        {/* Sidebar Area (Takes 1 column) */}
        <div className="space-y-6">
           
           {/* Mini Calendar */}
           <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                 <div className="flex gap-2">
                    <ChevronLeft size={16} className="text-gray-400 cursor-pointer" />
                    <ChevronRight size={16} className="text-gray-400 cursor-pointer" />
                 </div>
                 <h3 className="font-bold text-gray-800">أكتوبر 2023</h3>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-400 mb-2">
                 <div>ح</div><div>ن</div><div>ث</div><div>ر</div><div>خ</div><div>ج</div><div>س</div>
              </div>

              {/* Days Grid - Approximating based on image */}
              <div className="grid grid-cols-7 text-center text-sm gap-y-2">
                 <div className="text-gray-300">28</div><div className="text-gray-300">29</div><div className="text-gray-300">30</div>
                 <div className="py-1">1</div><div className="py-1">2</div><div className="py-1">3</div><div className="py-1">4</div>
                 <div className="py-1">5</div><div className="py-1">6</div><div className="py-1">7</div><div className="py-1">8</div>
                 <div className="py-1">9</div><div className="py-1">10</div><div className="py-1">11</div>
                 <div className="py-1">12</div><div className="py-1">13</div>
                 <div className="py-1 bg-blue-800 text-white rounded-lg font-bold shadow-sm">14</div>
                 <div className="py-1">15</div><div className="py-1">16</div><div className="py-1">17</div><div className="py-1">18</div>
              </div>
           </div>

           {/* Daily Stats */}
           <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                 <FileBarChart size={20} className="text-blue-600" />
                 <h3 className="font-bold text-gray-800">إحصائيات اليوم</h3>
              </div>

              <div className="space-y-4">
                 <div className="flex py-2 justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">12</span>
                    <span className="text-sm text-gray-600">إجمالي المواعيد</span>
                 </div>
                 <div className="flex py-2 justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">5</span>
                    <span className="text-sm text-gray-600">تم الكشف</span>
                 </div>
                 <div className="flex py-2 justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">7</span>
                    <span className="text-sm text-gray-600">قيد الانتظار</span>
                 </div>
              </div>

              <div className="mt-6">
                 <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-800 rounded-full" style={{ width: '40%' }}></div>
                 </div>
              </div>
           </div>

        </div>
        
      </div>
    </div>
  );
};

export default Schedule;
