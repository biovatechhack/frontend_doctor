import React, { useState, useEffect } from 'react';
import { UserPlus, Download, ChevronDown, Search } from 'lucide-react';
import { getPatients } from '../api/mockApi';
import LoadingSpinner from '../components/LoadingSpinner';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState('الكل');
  const [ageGroupFilter, setAgeGroupFilter] = useState('جميع الأعمار');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [deptFilter, setDeptFilter] = useState('كل الأقسام');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPatients = patients.filter(p => {
    // Search filter
    if (searchQuery && !p.name.includes(searchQuery) && !p.id.includes(searchQuery)) return false;
    
    // Category filters
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-3 order-2 md:order-1">
           <button className="flex items-center gap-2 bg-[#004b87] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition shadow-sm">
              <UserPlus size={18} />
              <span>مريض جديد</span>
           </button>
           <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm">
              <Download size={18} />
              <span>تصدير التقارير</span>
           </button>
        </div>
        
        <div className="text-right order-1 md:order-2">
           <div className="text-sm text-gray-500 mb-1">
              الرئيسية / <span className="text-gray-800 font-medium">المرضى</span>
           </div>
           <h2 className="text-2xl font-bold text-gray-900 border-r-4 border-blue-600 pr-3">إدارة المرضى</h2>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-6">
         {/* Search Bar */}
         <div className="relative" dir="rtl">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
               type="text" 
               placeholder="البحث عن مريض بالاسم أو رقم الملف..."
               className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none text-right"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filter 1: Risk Level */}
            <div className="text-right">
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">مستوى الخطورة</label>
               <div className="relative">
                  <select 
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right transition shadow-sm" dir="rtl">
                     <option>الكل</option>
                     <option>عالي</option>
                     <option>متوسط</option>
                     <option>منخفض</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-400">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Filter 2: Age Group */}
            <div className="text-right">
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">الفئة العمرية</label>
               <div className="relative">
                  <select 
                    value={ageGroupFilter}
                    onChange={(e) => setAgeGroupFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right transition shadow-sm" dir="rtl">
                     <option>جميع الأعمار</option>
                     <option>أطفال (0-12)</option>
                     <option>بالغين (13-59)</option>
                     <option>كبار السن (60+)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-400">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Filter 3: Status */}
            <div className="text-right">
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">الحالة</label>
               <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right transition shadow-sm" dir="rtl">
                     <option>الكل</option>
                     <option>منوم</option>
                     <option>عناية مركزة</option>
                     <option>خروج</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-400">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Filter 4: Department */}
            <div className="text-right">
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">القسم</label>
               <div className="relative">
                  <select 
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right transition shadow-sm" dir="rtl">
                     <option>كل الأقسام</option>
                     <option>الطوارئ</option>
                     <option>أمراض القلب</option>
                     <option>العناية المركزة</option>
                     <option>الباطنة</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-400">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Patients List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        {loading ? (
           <div className="py-20 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-400 font-medium">جاري تحديث قائمة المرضى...</p>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">رقم الملف</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">اسم المريض</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">العمر / الجنس</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">القسم</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">مستوى الخطورة</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">تاريخ الدخول</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPatients.length > 0 ? (
                   filteredPatients.map((patient, idx) => (
                     <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                       <td className="px-6 py-4 text-sm font-medium text-gray-400 group-hover:text-blue-500">#{patient.id}</td>
                       <td className="px-6 py-4 text-sm font-bold text-gray-800">{patient.name}</td>
                       <td className="px-6 py-4 text-sm text-gray-600">{patient.age} سنة / {patient.gender}</td>
                       <td className="px-6 py-4 text-sm text-gray-600">{patient.department}</td>
                       <td className="px-6 py-4">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                           patient.status === 'منوم' ? 'bg-blue-50 text-blue-700' :
                           patient.status === 'عناية مركزة' ? 'bg-orange-50 text-orange-700' :
                           'bg-green-50 text-green-700'
                         }`}>
                           {patient.status}
                         </span>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                           patient.risk === 'عالي' ? 'border-red-100 text-red-600 bg-red-50' :
                           patient.risk === 'متوسط' ? 'border-yellow-100 text-yellow-600 bg-yellow-50' :
                           'border-green-100 text-green-600 bg-green-50'
                         }`}>
                           {patient.risk}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-500">{patient.date}</td>
                     </tr>
                   ))
                ) : (
                   <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                         <div className="flex flex-col items-center text-gray-400">
                            <Search size={40} className="mb-2 opacity-20" />
                            <p className="text-lg font-medium">لا توجد حالات تطابق التصفية.</p>
                         </div>
                      </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Patients;

