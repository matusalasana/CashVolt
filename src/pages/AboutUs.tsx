import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  PieChart, 
  ArrowRight, 
  Users 
} from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Wallet className="w-6 h-6 text-emerald-500" />,
      title: "Smart Tracking",
      description: "Log every Birr with ease. Our intuitive interface makes manual entry a 2-second task."
    },
    {
      icon: <PieChart className="w-6 h-6 text-blue-500" />,
      title: "Visual Insights",
      description: "Beautifully rendered charts that show you exactly where your money goes every month."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      title: "Future Planning",
      description: "Set goals for that new car or dream home and track your progress in real-time."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "Secure by Design",
      description: "Your financial data is yours alone. We use industry-standard encryption to keep it safe."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Mastering your <span className="text-emerald-600">money</span> shouldn't be a chore.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Birres was born from a simple idea: financial freedom starts with 
              clarity. We build tools that help you track, save, and grow your 
              wealth without the headache.
            </p>
            <div className="flex gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2">
                Start Saving <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      </section>

      {/* Feature Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Birres?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Everything you need to manage your personal finances in one sleek dashboard.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-snug">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-900 text-white rounded-t-[3rem]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 italic">"Our mission is to make financial literacy accessible to everyone, one Birr at a time."</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                <Users className="text-white" />
              </div>
              <div>
                <p className="font-bold text-lg">The Birres Team</p>
                <p className="text-slate-400">Based in Addis Ababa</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-emerald-400">10k+</p>
              <p className="text-sm uppercase tracking-widest text-slate-400">Active Users</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-emerald-400">99%</p>
              <p className="text-sm uppercase tracking-widest text-slate-400">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-ish CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to take control?</h2>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
          Join Birres Today
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
