import React, { useState, useEffect } from 'react';
import { getDashboardStats, getHighRiskPatients, getEmergencyLogs, getResourceAllocation } from '../api/mockApi';
import { AlertTriangle, Activity, Clock, Stethoscope, Eye, CheckCircle, Info, ShieldCheck, Loader2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [highRisk, setHighRisk] = useState([]);
  const [logs, setLogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [s, hr, l, r] = await Promise.all([
          getDashboardStats(),
          getHighRiskPatients(),
          getEmergencyLogs(),
          getResourceAllocation()
        ]);
        setStats(s);
        setHighRisk(hr);
        setLogs(l);
        setResources(r);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 font-medium animate-pulse">جاري تحميل بيانات لوحة التحكم...</p>
      </div>
    );
  }

  const hasEmergencies = stats?.activeEmergencies > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Active Emergencies Banner */}
      <div className={`${hasEmergencies ? 'bg-red-700' : 'bg-[#1e3a8a]'} text-white rounded-xl p-4 flex items-center justify-between shadow-sm transition-colors duration-500`}>
        <button className={`bg-white px-6 py-2 rounded-lg font-bold text-sm transition ${hasEmergencies ? 'text-red-700 hover:bg-red-50' : 'text-blue-800 hover:bg-blue-50'}`}>
          عرض الكل
        </button>
        <div className="flex items-center text-right">
           <div className="mr-4">
            <h2 className="text-xl font-bold">
               {hasEmergencies ? 'حالات طارئة نشطة' : 'الوضع مستقر'}
            </h2>
            <p className={`text-sm mt-1 ${hasEmergencies ? 'text-red-200' : 'text-blue-200'}`}>
               {hasEmergencies 
                  ? `يوجد حالياً ${stats.activeEmergencies} حالات تتطلب تدخل فوري. من فضل التوجه للطوارئ.`
                  : 'لا توجد حالات طارئة نشطة في الوقت الحالي. الموارد تعمل بكفاءة.'}
            </p>
          </div>
          <div className={`${hasEmergencies ? 'bg-red-600' : 'bg-blue-700'} p-3 rounded-xl`}>
             {hasEmergencies ? <AlertTriangle size={28} /> : <ShieldCheck size={28} />}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Patients */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
             <span className="text-green-500 font-bold text-sm bg-green-50 px-2 py-1 rounded">
              {stats?.patientTrend} نمو
            </span>
            <div className="text-right">
              <p className="text-gray-500 text-sm mb-1">إجمالي المرضى</p>
              <h3 className="text-3xl font-bold text-blue-800">{stats?.totalPatients}</h3>
            </div>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
             <span className="text-green-500 font-bold text-sm bg-green-50 px-2 py-1 rounded">
              {stats?.responseTrend} تحسن
            </span>
            <div className="text-right">
              <p className="text-gray-500 text-sm mb-1">وقت الاستجابة</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats?.avgResponseTime}</h3>
            </div>
          </div>
        </div>

        {/* Operations/Resources */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start">
             <span className="text-gray-500 text-sm pt-1">
              {stats?.operationsLabel}
            </span>
            <div className="text-right">
              <p className="text-gray-500 text-sm mb-1">غرف العمليات</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats?.operations}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* High Risk Patients */}
      <div>
        <div className="flex items-center mb-4">
           <AlertTriangle size={20} className="text-red-600 ml-2" />
           <h3 className="text-lg font-bold text-gray-800">مرضى ذوي خطورة عالية</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highRisk.map((patient) => (
            <div key={patient.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col hover:border-red-200 transition-colors">
              {/* Card Header */}
              <div className="p-4 border-b border-gray-100">
                 <div className="flex justify-between items-start mb-2">
                    <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
                      {patient.status}
                    </span>
                    <div className="flex items-center gap-2">
                       <div className="text-right">
                          <h4 className="font-bold text-gray-800">{patient.name}</h4>
                          <p className="text-xs text-gray-500">العمر: {patient.age} سنة • {patient.room}</p>
                       </div>
                       <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex justify-center items-center font-bold">
                         {patient.gender === 'ذكر' ? 'ذ' : 'أ'}
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Card Body */}
              <div className="p-4 flex-1">
                 <div className="flex justify-between mb-4">
                    <div className="text-right">
                       <p className="text-xs text-gray-500 mb-1">وقت التنبيه</p>
                       <p className="text-sm font-semibold text-red-600">{patient.duration}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-gray-500 mb-1">الحالة الطبية</p>
                       <p className="text-sm font-bold text-gray-800">{patient.issue}</p>
                    </div>
                 </div>
                 
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-lg font-bold text-red-600">{patient.metric}</span>
                    <span className="text-xs text-gray-500">{patient.cause}</span>
                 </div>
                 
                 <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '85%' }}></div>
                 </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-4 pt-0">
                 <button className="w-full py-2 flex items-center justify-center text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
                    <Eye size={16} className="ml-2" />
                    عرض التفاصيل
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Column: Emergency Logs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
           <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-blue-600 hover:underline">عرض جميع السجلات</a>
              <h3 className="text-lg font-bold text-gray-800">سجل الاستجابة الفوري</h3>
           </div>
           
           <div className="space-y-4">
             {logs.map((log, index) => (
               <div key={index} className={`flex p-3 rounded-lg border-r-4 ${
                 log.type === 'alert' ? 'bg-red-50 border-red-500' :
                 log.type === 'info' ? 'bg-blue-50 border-blue-500' :
                 'bg-green-50 border-green-500'
               }`}>
                  <div className="w-16 flex-shrink-0 text-sm text-gray-500 font-medium pt-1">
                     {log.time}
                  </div>
                  <div className="flex-1 pr-4 border-r border-gray-200 text-right">
                     <h4 className="font-bold text-gray-800">{log.title}</h4>
                     <p className="text-sm text-gray-600 mt-1">{log.desc}</p>
                  </div>
                  <div className="w-10 flex justify-center items-start pt-1">
                     {log.type === 'alert' && <AlertTriangle size={20} className="text-red-500" />}
                     {log.type === 'info' && <Activity size={20} className="text-blue-500" />}
                     {log.type === 'success' && <CheckCircle size={20} className="text-green-500" />}
                  </div>
               </div>
             ))}
           </div>
           
           <div className="mt-4 flex items-center justify-center p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
               <Info size={16} className="ml-2 text-blue-500" />
               مقدار 3 حالات عولجت بغرف التدخل السريع. نجاح التعافي.
           </div>
        </div>
        
        {/* Left Column: Resource Allocation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
           <h3 className="text-lg font-bold text-gray-800 mb-6 text-right">توزيع الموارد</h3>
           
           <div className="space-y-6">
             {resources.map((resource, index) => (
                <div key={index}>
                   <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm text-gray-800">{resource.used}/{resource.total}</span>
                      <span className="text-sm font-medium text-gray-600">{resource.label}</span>
                   </div>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                         className={`h-full rounded-full ${resource.color}`} 
                         style={{ width: `${(resource.used / resource.total) * 100}%` }}
                      ></div>
                   </div>
                </div>
             ))}
           </div>
           
           <div className="mt-8 bg-blue-50 rounded-lg p-4">
               <div className="text-right">
                  <span className="text-xs text-blue-600 font-bold mb-1 block">تنبيه الموارد</span>
                  <p className="text-sm text-gray-700">شبه نقص في وحدات الدم فصيلة O-، يرجى التواصل مع بنك الدم.</p>
               </div>
           </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
