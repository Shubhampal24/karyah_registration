import React, { useState, useEffect } from 'react';
import { X, Phone, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import AnimalImage from './AnimalImage';

export default function RegistrationModal({
  isOpen,
  profession,
  onClose,
  onSubmit,
  isSubmitting,
  errorMessage,
}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [customTrade, setCustomTrade] = useState('');
  const [consent, setConsent] = useState(true);
  const [validationError, setValidationError] = useState('');

  // Always reset fields whenever modal opens or profession changes
  useEffect(() => {
    if (isOpen) {
      setMobileNumber('');
      setCustomTrade('');
      setValidationError('');
      setConsent(true);
    }
  }, [isOpen, profession?.id]);

  if (!isOpen || !profession) return null;

  const handleMobileChange = (e) => {
    // Only accept numeric digits, up to 10 characters
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(digitsOnly);

    // Live validation
    if (digitsOnly.length > 0) {
      const firstDigit = digitsOnly[0];
      if (!['6', '7', '8', '9'].includes(firstDigit)) {
        setValidationError('Indian mobile numbers must start with 6, 7, 8, or 9.');
        return;
      }
    }

    if (digitsOnly.length === 10) {
      setValidationError('');
    } else if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobileNumber) {
      setValidationError('Please enter your 10-digit mobile number.');
      return;
    }

    const firstDigit = mobileNumber[0];
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      setValidationError('Indian mobile numbers must start with 6, 7, 8, or 9.');
      return;
    }

    if (mobileNumber.length !== 10) {
      setValidationError(`Please enter a complete 10-digit mobile number (currently ${mobileNumber.length}/10).`);
      return;
    }

    if (!consent) {
      setValidationError('Please check the consent box to receive registration communications.');
      return;
    }

    setValidationError('');
    const finalProfessionName =
      profession.id === 'prof_other' && customTrade.trim()
        ? `Other: ${customTrade.trim()}`
        : profession.name;

    onSubmit({
      professionId: profession.id,
      professionName: finalProfessionName,
      mobileNumber,
    });
  };

  const isValidNumber = mobileNumber.length === 10 && /^[6-9]\d{9}$/.test(mobileNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-modal border border-[#EFE8DE] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3ECE0] bg-[#FFFBF7]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A1F]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A1F]">
              Karyah Professional Network
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#77716B] hover:text-[#202020] hover:bg-[#F3ECE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* Selected Profession Preview Niche */}
          <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#FFF5EA] to-[#FFF9F2] border border-[#FF8A1F]/20 mb-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-b from-[#EAE3D8] to-[#F7F2EB] shadow-inner flex items-center justify-center flex-shrink-0 relative border border-[#DCD3C4]">
              <AnimalImage species={profession.species} className="w-16 h-16 object-contain filter drop-shadow-sm" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-[#FF8A1F] uppercase tracking-wide">
                {profession.animal || 'Selected Trade'}
              </span>
              <h4 className="text-lg font-black text-[#202020] leading-tight">
                {profession.name}
              </h4>
              <p className="text-xs text-[#77716B] mt-0.5 line-clamp-1 font-medium">
                {profession.gear}
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-5">
            <h3 className="text-2xl font-black text-[#202020] tracking-tight">
              Join Karyah
            </h3>
            <p className="text-sm text-[#77716B] mt-1">
              Enter your mobile number to register as an{' '}
              <strong className="text-[#FF8A1F] font-bold">{profession.name}</strong>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Optional trade name for 'Other' */}
            {profession.id === 'prof_other' && (
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wider mb-2">
                  Specify Your Profession / Trade <span className="text-[#888] font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solar Installer, Welder, Crane Operator, Surveyor..."
                  value={customTrade}
                  onChange={(e) => setCustomTrade(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF9] border border-[#E0D4C3] focus:border-[#FF8A1F] focus:ring-2 focus:ring-[#FF8A1F]/20 text-sm font-semibold text-[#202020] placeholder-[#A8A29E] focus:outline-none transition-all disabled:opacity-60"
                  autoFocus
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wider">
                  Mobile Number
                </label>
                {isValidNumber && (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Valid Indian Number
                  </span>
                )}
              </div>

              <div className="relative flex items-center">
                {/* Country Code Prefix */}
                <div className="absolute left-3.5 flex items-center gap-1.5 text-sm font-semibold text-[#202020] border-r border-[#EFE8DE] pr-2.5 py-1 select-none">
                  <span className="text-base">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 10-digit number (e.g. 9876543210)"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  disabled={isSubmitting}
                  className={`w-full pl-24 pr-10 py-3.5 rounded-2xl bg-[#FFFDF9] border text-base text-[#202020] font-mono font-semibold placeholder-[#A8A29E] focus:outline-none transition-all disabled:opacity-60 ${
                    validationError
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : isValidNumber
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                      : 'border-[#E0D4C3] focus:border-[#FF8A1F] focus:ring-2 focus:ring-[#FF8A1F]/20'
                  }`}
                  autoFocus
                />
                <Phone className="w-4 h-4 text-[#77716B] absolute right-3.5 pointer-events-none" />
              </div>
              <p className="text-[11px] text-[#77716B] mt-1.5 font-medium">
                Indian mobile numbers must be 10 digits starting with 6, 7, 8, or 9.
              </p>
            </div>

            {/* Error Message */}
            {(validationError || errorMessage) && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{validationError || errorMessage}</span>
              </div>
            )}

            {/* Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded text-[#FF8A1F] focus:ring-[#FF8A1F] border-gray-300 w-4 h-4 accent-[#FF8A1F]"
                />
                <span className="text-xs text-[#77716B] leading-relaxed">
                  I agree to receive communications regarding construction opportunities,
                  project notifications, and work updates from Karyah.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#FF8A1F] hover:bg-[#E8750E] text-white font-black text-base shadow-sm hover:shadow-soft-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 group mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          {/* Assurance */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-[#77716B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Your number will only be used for registration and relevant Karyah opportunities.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
