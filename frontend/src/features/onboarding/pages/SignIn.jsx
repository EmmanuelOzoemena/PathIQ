import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import { Button } from '../../../components/ui/Button';
import StudentSidebar from '../components/StudentSidebar';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout customSidebarContent={<StudentSidebar />}>
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-[#001D66] mb-2">Sign in to PathIQ</h1>
        <p className="text-gray-500 mb-10 text-sm font-medium">
          Welcome back! Your learning continues here.
        </p>

        {/* Login Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-[#001D66] text-xs font-bold mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="johnnoah@email.com" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[#001D66] text-xs font-bold uppercase tracking-wide">
                Password
              </label>
              <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>
            <input 
              type="password" 
              placeholder="****************" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>

          <Button className="py-4 shadow-lg shadow-blue-900/20">Sign In</Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-10">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            or continue with email
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 mb-10">
          <Button variant="outline" className="flex items-center justify-center gap-2 text-sm py-3">
             <span className="font-bold">G</span> Google
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2 text-sm py-3">
             <span className="font-bold">f</span> Facebook
          </Button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 font-medium">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            className="text-[#001D66] font-bold underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;