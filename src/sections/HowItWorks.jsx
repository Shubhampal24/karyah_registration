import React from 'react';
import {
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
  FileText,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorks({ onRegisterClick }) {
  const features = [
    {
      title: 'Project Management',
      icon: FolderKanban,
      desc: 'Plan scopes, track timelines and keep site milestones aligned.',
    },
    {
      title: 'Task Management',
      icon: CheckSquare,
      desc: 'Assign daily trade deliverables directly to site workers.',
    },
    {
      title: 'Team Collaboration',
      icon: Users,
      desc: 'Connect architects, contractors, and labour in synchronized real-time.',
    },
    {
      title: 'Work Tracking',
      icon: TrendingUp,
      desc: 'Monitor on-ground execution, material usage, and trade attendance.',
    },
    {
      title: 'Daily Updates',
      icon: FileText,
      desc: 'Send photographic proof, job completion logs, and instant site status.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white/70 border-y border-[#EFE8DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF1E5] text-[#FF8A1F] border border-[#FF8A1F]/20">
              SMART WORK & PROJECT MANAGEMENT PLATFORM
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#202020] tracking-tight leading-[1.15]">
              Manage Work.{' '}
              <span className="text-[#FF8A1F] block">Connect Teams.</span>
            </h2>

            <p className="text-base text-[#77716B] leading-relaxed">
              Karyah brings your workforce, projects and daily operations together
              on one platform. Track activities, coordinate teams and manage work
              with better transparency and accountability.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3.5 rounded-full bg-[#FF8A1F] hover:bg-[#E8750E] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual / Orbit Column inspired by Reference Screenshot */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF9F2] to-[#FFF3E6] border border-[#EFE8DE] shadow-soft">
              {/* Central Karyah Hub Card */}
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-4 rounded-2xl bg-white shadow-soft border border-[#FF8A1F]/30">
                  <span className="text-2xl font-extrabold text-[#FF8A1F]">karyah:</span>
                  <span className="block text-[10px] text-[#77716B] tracking-widest font-serif">
                    | कर्मशील भव: |
                  </span>
                </div>
              </div>

              {/* Grid of 5 Modules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 border border-[#EFE8DE] shadow-sm hover:border-[#FF8A1F]/60 hover:shadow-soft transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] text-[#FF8A1F] flex items-center justify-center mb-3 group-hover:bg-[#FF8A1F] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#202020] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#77716B] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
