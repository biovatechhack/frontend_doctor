import React, { useState, useEffect } from 'react';
import { getAppointments } from '../api/mockApi';
import { ChevronRight, ChevronLeft, Plus, MoreVertical, Calendar as CalendarIcon, FileBarChart, Clock } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Schedule = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAppointments();
        setAppointmentsList(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
           <h2 className="text-2xl font-bold text-gray-900 border-r-4 border-blue-600 pr-3">جدول المواعيد</h2>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Timeline Area (Takes 3 columns) */}
        <div className="lg:col-span-3">
           
           {/* View Toggles */}
           <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-2 mb-6 shadow-sm">
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
           <div className="space-y-4 relative min-h-[400px]">
              {loading ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 rounded-xl">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-400 font-medium animate-pulse">جاري جلب جدول المواعيد...</p>
                 </div>
              ) : (
                <>
                  {/* Vertical line indicator */}
                  <div className="absolute right-[4.5rem] top-0 bottom-0 w-0.5 bg-gray-100 -z-10"></div>
                  
                  {appointmentsList.map((apt) => (
                     <div key={apt.id} className="flex items-center group">
                        {/* Time Slot */}
                        <div className="w-24 flex-shrink-0 text-center text-gray-800">
                           <p className="font-bold text-lg">{apt.time}</p>
                           <p className="text-xs text-gray-400 font-medium">{apt.amPm}</p>
                        </div>

                        {/* Content Card */}
                        <div className={`flex-1 pr-10 pl-0 py-1 ${apt.type === 'addition' ? 'opacity-60' : ''}`}>
                           {apt.type === 'addition' ? (
                              // Add new appointment placeholder
                              <button className="w-full h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-blue-500 hover:border-blue-300 hover:shadow-md transition duration-300">
                                 <Plus size={20} className="mr-2" />
                                 إضافة موعد متاح
                              </button>
                           ) : (
                              // Regular appointment card
                              <div className={`w-full bg-white border rounded-xl shadow-sm flex items-center justify-between p-4 px-6 group-hover:shadow-md transition duration-300
                                 ${apt.highlight ? 'border-orange-200 ring-1 ring-orange-200 bg-orange-50/10 border-l-4 border-l-orange-500' : 'border-gray-100 hover:border-blue-200'}`}>
                                 
                                 <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm relative group">
                                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.patient}&backgroundColor=c0aede`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                                       {apt.highlight && <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>}
                                    </div>
                                    <div className="text-right">
                                       <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{apt.patient}</h4>
                                       <p className="text-xs text-gray-500 flex items-center font-medium mt-1">
                                          {apt.highlight ? <Clock size={12} className="ml-1 text-orange-500" /> : <CalendarIcon size={12} className="ml-1" />}
                                          {apt.type}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-6">
                                    <span className={`px-4 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest border ${apt.statusColor.replace('bg-', 'border-').replace('text-', 'bg-').split(' ')[0]}`}>
                                       {apt.status}
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition">
                                       <MoreVertical size={20} />
                                    </button>
                                 </div>

                              </div>
                           )}
                        </div>
                     </div>
                  ))}
                </>
              )}
           </div>

        </div>

        {/* Sidebar Area (Takes 1 column) */}
        <div className="space-y-6">
           
           {/* Mini Calendar */}
           <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                 <div className="flex gap-2">
                    <ChevronLeft size={16} className="text-gray-400 hover:text-blue-500 cursor-pointer transition" />
                    <ChevronRight size={16} className="text-gray-400 hover:text-blue-500 cursor-pointer transition" />
                 </div>
                 <h3 className="font-bold text-gray-800">أكتوبر 2023</h3>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 mb-2 uppercase">
                 <div>ح</div><div>ن</div><div>ث</div><div>ر</div><div>خ</div><div>ج</div><div>س</div>
              </div>

              {/* Days Grid - Approximating based on image */}
              <div className="grid grid-cols-7 text-center text-xs gap-y-1">
                 <div className="text-gray-200 py-1.5">28</div><div className="text-gray-200 py-1.5">29</div><div className="text-gray-200 py-1.5">30</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">1</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">2</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">3</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">4</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">5</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">6</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">7</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">8</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">9</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">10</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">11</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition border border-blue-200">12</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">13</div>
                 <div className="py-1.5 bg-blue-800 text-white rounded-lg font-bold shadow-md scale-110 z-10">14</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">15</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">16</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">17</div>
                 <div className="py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer transition">18</div>
              </div>
           </div>

           {/* Daily Stats */}
           <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-100">
                 <FileBarChart size={20} className="text-blue-600" />
                 <h3 className="font-bold text-gray-800">إحصائيات اليوم</h3>
              </div>

              <div className="space-y-1">
                 <div className="flex py-2 justify-between items-center group cursor-default">
                    <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">12</span>
                    <span className="text-sm text-gray-500 font-medium">إجمالي المواعيد</span>
                 </div>
                 <div className="flex py-2 justify-between items-center group cursor-default">
                    <span className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition">5</span>
                    <span className="text-sm text-gray-500 font-medium">تم الكشف</span>
                 </div>
                 <div className="flex py-2 justify-between items-center group cursor-default">
                    <span className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">7</span>
                    <span className="text-sm text-gray-500 font-medium">قيد الانتظار</span>
                 </div>
              </div>

              <div className="mt-6">
                 <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase">
                    <span>42% مكتمل</span>
                    <span>اليوم</span>
                 </div>
                 <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-800 rounded-full" style={{ width: '42%' }}></div>
                 </div>
              </div>
           </div>

        </div>
        
      </div>
    </div>
  );
};

export default Schedule;
