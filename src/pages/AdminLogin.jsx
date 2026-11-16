import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

// Simple local admin password — will be replaced by Google Sheets auth at setup
const ADMIN_PASSWORD = 'karyah2026';

export default function AdminLogin({ isOpen, onClose, onLoginSuccess }) {
  const [password, setPassword]   = useState('');
  const [showPwd, setShowPwd]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a brief check
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLoginSuccess('local_admin_token');
      } else {
        setError('Incorrect password. Default: karyah2026');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-modal border border-[#EFE8DE] p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#F3ECE0] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF1E5] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#FF8A1F]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#202020]">Admin Access</h3>
              <p className="text-xs text-[#77716B]">Karyah Registration Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#77716B] hover:bg-[#F3ECE0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#202020] uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#77716B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E0D4C3] text-sm text-[#202020] focus:outline-none focus:border-[#FF8A1F] focus:ring-2 focus:ring-[#FF8A1F]/20 transition-all"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77716B] hover:text-[#202020]"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-xl bg-[#FF8A1F] hover:bg-[#E8750E] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Verifying...</span></>
            ) : (
              <><Lock className="w-4 h-4" /><span>Access Dashboard</span></>
            )}
          </button>

          <p className="text-center text-[11px] text-[#77716B]">
            Default password: <span className="font-mono font-semibold text-[#202020]">karyah2026</span>
          </p>
        </form>
      </div>
    </div>
  );
}
