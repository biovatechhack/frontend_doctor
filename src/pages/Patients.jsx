import React, { useState } from 'react';
import { UserPlus, Download, ChevronDown } from 'lucide-react';
import { patientsList } from '../data/mockData';

const Patients = () => {
  const [riskFilter, setRiskFilter] = useState('الكل');
  const [ageGroupFilter, setAgeGroupFilter] = useState('جميع الأعمار');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [deptFilter, setDeptFilter] = useState('كل الأقسام');

  const filteredPatients = patientsList.filter(p => {
    if (riskFilter !== 'الكل' && p.risk !== riskFilter) return false;
    if (statusFilter !== 'الكل' && p.status !== statusFilter) return false;
    if (deptFilter !== 'كل الأقسام' && p.department !== deptFilter) return false;
    
    if (ageGroupFilter !== 'جميع الأعمار') {
       if (ageGroupFilter === 'أطفال (0-12)' && p.age > 12) return false;
       if (ageGroupFilter === 'بالغين (13-59)' && (p.age < 13 || p.age > 59)) return false;
       if (ageGroupFilter === 'كبار السن (60+)' && p.age < 60) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 mt-4">
           {/* Left side actions (visually due to RTL they are on the left) */}
           <button className="flex items-center gap-2 bg-[#004b87] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition">
              <UserPlus size={18} />
              <span>مريض جديد</span>
           </button>
           <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition">
              <Download size={18} />
              <span>تصدير التقارير</span>
           </button>
        </div>
        
        <div className="text-right">
           <div className="text-sm text-gray-500 mb-1">
              الرئيسية / <span className="text-gray-800">المرضى</span>
           </div>
           <h2 className="text-2xl font-bold text-gray-900">إدارة المرضى</h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Filter 1: Risk Level */}
            <div className="text-right flex flex-col justify-end">
               <label className="block text-sm font-medium text-gray-600 mb-2">مستوى الخطورة</label>
               <div className="relative">
                  <select 
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 text-right" dir="rtl">
                     <option>الكل</option>
                     <option>عالي</option>
                     <option>متوسط</option>
                     <option>منخفض</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Filter 2: Age Group */}
            <div className="text-right flex flex-col justify-end">
               <label className="block text-sm font-medium text-gray-600 mb-2">الفئة العمرية</label>
               <div className="relative">
                  <select 
                    value={ageGroupFilter}
                    onChange={(e) => setAgeGroupFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 text-right" dir="rtl">
                     <option>جميع الأعمار</option>
                     <option>أطفال (0-12)</option>
                     <option>بالغين (13-59)</option>
                     <option>كبار السن (60+)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Filter 3: Status */}
            <div className="text-right flex flex-col justify-end">
               <label className="block text-sm font-medium text-gray-600 mb-2">الحالة</label>
               <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 text-right" dir="rtl">
                     <option>الكل</option>
                     <option>منوم</option>
                     <option>عناية مركزة</option>
                     <option>خروج</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Filter 4: Department */}
            <div className="text-right flex flex-col justify-end">
               <label className="block text-sm font-medium text-gray-600 mb-2">القسم</label>
               <div className="relative">
                  <select 
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 text-right" dir="rtl">
                     <option>كل الأقسام</option>
                     <option>الطوارئ</option>
                     <option>أمراض القلب</option>
                     <option>العناية المركزة</option>
                     <option>الباطنة</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

         </div>
      </div>
      
      {/* Patients List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <table className="w-full text-right" dir="rtl">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">رقم الملف</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">اسم المريض</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">العمر / الجنس</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">القسم</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">الحالة</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">مستوى الخطورة</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">تاريخ الدخول</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.length > 0 ? (
               filteredPatients.map((patient, idx) => (
                 <tr key={idx} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 text-sm font-medium text-gray-500">#{patient.id}</td>
                   <td className="px-6 py-4 text-sm font-bold text-gray-800">{patient.name}</td>
                   <td className="px-6 py-4 text-sm text-gray-600">{patient.age} سنة / {patient.gender}</td>
                   <td className="px-6 py-4 text-sm text-gray-600">{patient.department}</td>
                   <td className="px-6 py-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                       patient.status === 'منوم' ? 'bg-blue-100 text-blue-800' :
                       patient.status === 'عناية مركزة' ? 'bg-orange-100 text-orange-800' :
                       'bg-green-100 text-green-800'
                     }`}>
                       {patient.status}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                       patient.risk === 'عالي' ? 'border-red-200 text-red-700 bg-red-50' :
                       patient.risk === 'متوسط' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                       'border-green-200 text-green-700 bg-green-50'
                     }`}>
                       {patient.risk}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-sm text-gray-500">{patient.date}</td>
                 </tr>
               ))
            ) : (
               <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">لا توجد حالات تطابق التصفية.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Patients;
