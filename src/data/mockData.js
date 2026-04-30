export const dashStats = {
  totalPatients: 124,
  patientTrend: '+12%',
  activeEmergencies: 0,
  avgResponseTime: '4.2m',
  responseTrend: '-0.5m',
  operations: '3/5',
  operationsLabel: 'قيد الاستخدام'
};

export const highRiskPatients = [
  {
    id: 1,
    name: 'أحمد جابر العتيبي',
    age: 54,
    gender: 'ذكر',
    room: 'غرفة 302',
    duration: 'منذ 4 دقائق',
    issue: 'اشتباه جلطة قلب',
    cause: 'خلل بضربات القلب',
    metric: '124 bpm',
    status: 'RED RISK'
  },
  {
    id: 2,
    name: 'سارة محمود حسن',
    age: 28,
    gender: 'أنثى',
    room: 'غرفة 101',
    duration: 'منذ 12 دقيقة',
    issue: 'خلل تنفسي حاد',
    cause: 'تراجع الأكسجين SpO2',
    metric: '88%',
    status: 'RED RISK'
  },
  {
    id: 3,
    name: 'ماجد خالد العنزي',
    age: 68,
    gender: 'ذكر',
    room: 'غرفة 441',
    duration: 'منذ 18 دقيقة',
    issue: 'صدمة إنتانية',
    cause: 'ضغط الدم',
    metric: '85/50 mmHg',
    status: 'RED RISK'
  }
];

export const emergencyLogs = [
  {
    time: '08:42',
    type: 'alert',
    title: 'تنبيه حرج: انخفاض ضغط الدم للمريض الغرفة 441',
    desc: 'تم إرسال إشعار فوري للتمريض في الطابق الرابع'
  },
  {
    time: '08:38',
    type: 'info',
    title: 'تحديث: استجابة د. خالد لحالة الغرفة 302',
    desc: 'المريض في طريقه لغرفة القسطرة'
  },
  {
    time: '08:30',
    type: 'success',
    title: 'اكتمال الفحص الدوري للمرضى',
    desc: 'تم جمع المؤشرات دون أخطار للمرضى الغرف المستقرة'
  }
];

export const resourceAllocation = [
  { label: 'أجهزة التنفس الصناعي', used: 12, total: 15, color: 'bg-blue-600' },
  { label: 'وحدات الدم (O-)', used: 4, total: 20, color: 'bg-red-500' },
  { label: 'كادر التمريض المتاح', used: 28, total: 30, color: 'bg-green-500' }
];

export const appointments = [
  {
    id: 1,
    time: '09:00',
    amPm: 'صباحاً',
    patient: 'أحمد محمود الجابر',
    type: 'استشارة عامة',
    status: 'مؤكد',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 2,
    time: '10:30',
    amPm: 'صباحاً',
    patient: 'سارة خالد الشمري',
    type: 'متابعة دورية',
    status: 'قادم',
    statusColor: 'bg-blue-100 text-blue-700',
    highlight: true
  },
  {
    id: 3,
    time: '11:15',
    amPm: 'صباحاً',
    type: 'addition' // Placeholder for adding an appointment
  },
  {
    id: 4,
    time: '01:00',
    amPm: 'مساءً',
    patient: 'عمر عبد العزيز',
    type: 'فحص مستعجل',
    status: 'عاجل',
    statusColor: 'bg-red-100 text-red-700'
  },
  {
    id: 5,
    time: '02:30',
    amPm: 'مساءً',
    patient: 'محمد حسن الراوي',
    type: 'استشارة عامة',
    status: 'في الانتظار',
    statusColor: 'bg-yellow-100 text-yellow-700'
  }
];

export const patientsList = [
  { id: '101', name: 'أحمد محمود', age: 45, gender: 'ذكر', department: 'أمراض القلب', status: 'منوم', risk: 'متوسط', date: '2023-10-14' },
  { id: '102', name: 'فاطمة علي', age: 62, gender: 'أنثى', department: 'العناية المركزة', status: 'عناية مركزة', risk: 'عالي', date: '2023-10-15' },
  { id: '103', name: 'سالم عبدالله', age: 28, gender: 'ذكر', department: 'الطوارئ', status: 'خروج', risk: 'منخفض', date: '2023-10-16' },
  { id: '104', name: 'نورة سعد', age: 8, gender: 'أنثى', department: 'الطوارئ', status: 'منوم', risk: 'متوسط', date: '2023-10-17' },
  { id: '105', name: 'خالد يوسف', age: 55, gender: 'ذكر', department: 'أمراض القلب', status: 'عناية مركزة', risk: 'عالي', date: '2023-10-17' },
  { id: '106', name: 'ليلى منصور', age: 34, gender: 'أنثى', department: 'الباطنة', status: 'منوم', risk: 'منخفض', date: '2023-10-18' },
  { id: '107', name: 'عمر القحطاني', age: 71, gender: 'ذكر', department: 'العناية المركزة', status: 'عناية مركزة', risk: 'عالي', date: '2023-10-18' },
];
