import React from 'react';
import { Target, Users, ShieldCheck, Heart, ArrowRight, Zap } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      title: "Simplicity First",
      desc: "Managing money shouldn't be a second job. We build tools that are intuitive and fast.",
      icon: <Zap className="text-amber-500" />,
      bg: "bg-amber-50"
    },
    {
      title: "Data Security",
      desc: "Your financial data is yours alone. We prioritize privacy and local storage security.",
      icon: <ShieldCheck className="text-blue-500" />,
      bg: "bg-blue-50"
    },
    {
      title: "Local Context",
      desc: "Built specifically for the Ethiopian economy, supporting ETB and local financial habits.",
      icon: <Heart className="text-rose-500" />,
      bg: "bg-rose-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
              Empowering Ethiopia’s <br />
              <span className="text-indigo-400">Financial Future.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              EthioTrack started with a simple question: How can we make expense tracking 
              accessible, digital, and tailored for our local community? Today, we provide 
              the tools to help thousands manage their ETB with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { lab: "Active Users", val: "10K+" },
              { lab: "Monthly Transactions", val: "1M+" },
              { lab: "Savings Created", val: "45M ETB" },
              { lab: "Uptime", val: "99.9%" }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.lab}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Core Values</h2>
          <p className="text-slate-500 mt-2">The principles that guide every feature we build.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all group">
              <div className={`w-14 h-14 ${v.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">
            Ready to master your budget?
          </h2>
          <p className="text-indigo-100 mb-10 text-lg relative z-10 opacity-90">
            Join thousands of Ethiopians taking control of their finances today.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black flex items-center gap-2 mx-auto hover:bg-indigo-50 transition-all relative z-10 group">
            Get Started Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
