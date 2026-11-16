import React from 'react';
import { UserCheck, ShieldCheck, Clock, LineChart } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Easy to Use',
      desc: 'Simple and user-friendly platform that makes everyday work management effortless.',
      icon: UserCheck,
    },
    {
      title: 'Secure & Reliable',
      desc: 'Keep your business information and team communication safe with secure workflows.',
      icon: ShieldCheck,
    },
    {
      title: 'Time & Cost Efficient',
      desc: 'Reduce manual work, save valuable time and manage operations economically.',
      icon: Clock,
    },
    {
      title: 'Complete Transparency',
      desc: 'Track activities, monitor progress and maintain accountability across your team.',
      icon: LineChart,
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF1E5] text-[#FF8A1F] border border-[#FF8A1F]/20 mb-3">
            WORKFLOW OPTIMIZATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#202020] tracking-tight">
            How Karyah Streamlines{' '}
            <span className="text-[#FF8A1F] block sm:inline">Your Entire Operation</span>
          </h2>
          <p className="mt-4 text-base text-[#77716B]">
            From task assignments to project tracking, Karyah helps civil & interior
            businesses manage their entire workflow. Improve collaboration, ensure security
            and keep every team member connected.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-soft hover:shadow-soft-hover hover:border-[#FF8A1F]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF8F1] text-[#FF8A1F] flex items-center justify-center mb-5 border border-[#FF8A1F]/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#202020] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#77716B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
