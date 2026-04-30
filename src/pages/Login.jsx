import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, BriefcaseMedical, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4" dir="rtl">
      {/* Logo & Branding */}
      <div className="text-center mb-8">
        <div className="bg-blue-700 text-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <BriefcaseMedical size={32} />
        </div>
        <h1 className="text-3xl font-bold text-blue-800 tracking-wide mb-2">suivini</h1>
        <p className="text-gray-500 text-sm">المنصة الطبية المتكاملة للرعاية الذكية</p>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تسجيل الدخول</h2>
          <p className="text-gray-500 text-sm">يرجى إدخال بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mimocare.com"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-left"
                dir="ltr"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Mail size={18} />
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <a href="#" className="text-sm text-blue-600 hover:underline">نسيت كلمة المرور؟</a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-left tracking-widest"
                dir="ltr"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 mr-2 block text-sm text-gray-700">
                تذكرني على هذا الجهاز
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-[#0747a6] hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition duration-150 ease-in-out mt-6"
          >
            <span>تسجيل الدخول</span>
            <LogIn size={18} className="mr-2" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            ليس لديك حساب؟ <a href="#" className="font-medium text-blue-600 hover:underline">طلب إنشاء حساب جديد</a>
          </p>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-12 text-center text-xs text-gray-400 space-y-2">
        <p>الموثوقية • الدقة • الرعاية</p>
        <p>v2.4.0 |||||||| اتصال مشفر وآمن</p>
      </div>
    </div>
  );
};

export default Login;
