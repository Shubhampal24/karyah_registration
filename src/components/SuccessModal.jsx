import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuccessModal({ isOpen, data, professionName, onClose }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF8A1F', '#E8750E', '#FED7AA', '#F97316', '#22C55E'],
        });
      } catch (e) {
        // confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const regId = data?.registration?.regId || data?.regId || 'REG-SUCCESS';
  const mobile = data?.registration?.mobileNumber || data?.mobileNumber || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-modal border border-[#EFE8DE] p-6 sm:p-8 text-center z-10 animate-in zoom-in-95 duration-200">
        {/* Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-[#FFF5EA] text-[#FF8A1F] mx-auto flex items-center justify-center mb-5 border-2 border-[#FF8A1F]/30 shadow-soft">
          <CheckCircle2 className="w-10 h-10 text-[#FF8A1F]" />
        </div>

        {/* Heading */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200 mb-3">
          <Sparkles className="w-3 h-3 text-green-600" />
          Confirmed Registration
        </span>
        <h3 className="text-2xl font-extrabold text-[#202020] tracking-tight">
          Registration Successful!
        </h3>
        <p className="text-sm text-[#77716B] mt-1.5">
          Welcome to the Karyah professional network.
        </p>

        {/* Registration Card Detail */}
        <div className="my-6 p-4 rounded-2xl bg-[#FFFBF7] border border-[#EFE8DE] text-left space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#77716B]">Registration ID:</span>
            <span className="font-mono font-bold text-[#FF8A1F] bg-[#FFF5EA] px-2 py-0.5 rounded border border-[#FF8A1F]/20">
              {regId}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#77716B]">Registered Profession:</span>
            <span className="font-bold text-[#202020]">{professionName}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#77716B]">Registered Mobile:</span>
            <span className="font-semibold text-[#202020]">+91 {mobile}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#77716B]">Excel Record Sync:</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              Auto-Synchronized
            </span>
          </div>
        </div>

        {/* Close Action */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-[#FF8A1F] hover:bg-[#E8750E] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Done</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
