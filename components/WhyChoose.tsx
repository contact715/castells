
import React from 'react';
import { Shield, Target, Users, TrendingUp, DollarSign, CheckCircle2, ArrowUpRight, Calendar, Star, ArrowDownRight, BarChart } from 'lucide-react';
import { AnimatedList } from './AnimatedList';
import { motion } from 'framer-motion';
import { Highlighter } from './Highlighter';

const REASONS = [
  { 
    id: "01",
    title: 'Specialized Intel', 
    desc: 'We don’t guess. We rely on data from 500+ home service campaigns.',
    icon: Shield,
  },
  { 
    id: "02",
    title: 'Profit Focused', 
    desc: 'Clicks don’t pay bills. We optimize exclusively for revenue and ROAS.',
    icon: Target, 
  },
  { 
    id: "03",
    title: 'Full Partnership', 
    desc: 'You get a dedicated marketing director, not just a support ticket.',
    icon: Users,
  },
];

interface NotificationItem {
  name: string;
  description: string;
  time: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    name: "New Lead from Castells",
    description: "Inbound Inquiry • $120k Project",
    time: "Just now",
    icon: TrendingUp,
    color: "#E08576", // Coral
    bg: "bg-coral/10",
  },
  {
    name: "Payment Received",
    description: "Invoice #3492 • $8,500",
    time: "2m ago",
    icon: DollarSign,
    color: "#10B981", // Green
    bg: "bg-green-500/10",
  },
  {
    name: "Strategy Call Booked",
    description: "High-Intent Lead • Calendar",
    time: "5m ago",
    icon: Calendar,
    color: "#8B5CF6", // Violet
    bg: "bg-violet-500/10",
  },
  {
    name: "Campaign Optimization",
    description: "ROAS increased to 5.2x",
    time: "12m ago",
    icon: Target,
    color: "#3B82F6", // Blue
    bg: "bg-blue-500/10",
  },
  {
    name: "New 5-Star Review",
    description: "Google Business Profile",
    time: "15m ago",
    icon: Star,
    color: "#F59E0B", // Amber
    bg: "bg-amber-500/10",
  },
  {
    name: "Cost Per Lead Dropped",
    description: "CPA reduced by 18%",
    time: "22m ago",
    icon: ArrowDownRight,
    color: "#06B6D4", // Cyan
    bg: "bg-cyan-500/10",
  },
  {
    name: "Lead Qualified",
    description: "Moved to 'Negotiation'",
    time: "30m ago",
    icon: CheckCircle2,
    color: "#EC4899", // Pink
    bg: "bg-pink-500/10",
  }
];

const NotificationCard: React.FC<NotificationItem> = ({ name, description, icon: Icon, color, time, bg }) => {
  return (
    <figure
      className="relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-xl p-3 transition-all duration-200 ease-in-out hover:bg-black/5 dark:hover:bg-white/5 border-b border-black/5 dark:border-white/5 last:border-0"
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm font-bold text-text-primary">
            <span className="">{name}</span>
            <span className="mx-1 text-text-secondary">·</span>
            <span className="text-[10px] text-text-secondary font-sans">{time}</span>
          </figcaption>
          <p className="text-xs font-normal text-text-secondary truncate">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const WhyChoose: React.FC = () => {
  return (
    <section className="py-32 bg-ivory border-t border-black/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
              Why Us
            </div>
          <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight text-text-primary tracking-tight">
            The <Highlighter action="underline" color="#E08576"><span className="italic text-coral">Unfair</span></Highlighter> Advantage
          </h2>
          <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
            Most agencies sell you hours. We sell you outcomes. Here is how we structure your dominance.
          </p>
        </div>

        {/* Dashboard Concept Layout */}
        <div className="bg-surface border border-black/10 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden mb-12 group">
            
            {/* Background Ambient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left: Content */}
                <div>
                    <h3 className="font-display text-4xl font-medium mb-6">Real-Time Revenue Engine</h3>
                    <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        Stop wondering where your money is going. We build a custom live dashboard for every client, connecting your ad spend directly to your CRM revenue. You see the leads, the bookings, and the ROI as it happens.
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-coral" />
                            <span className="text-sm font-bold text-text-primary">Automated Lead Qualification</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-coral" />
                            <span className="text-sm font-bold text-text-primary">24/7 Performance Monitoring</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-coral" />
                            <span className="text-sm font-bold text-text-primary">Transparent ROI Reporting</span>
                        </li>
                    </ul>
                    <button className="text-sm font-bold uppercase tracking-widest text-coral border-b border-coral/30 pb-1 hover:border-coral transition-colors flex items-center gap-2 w-fit">
                        See how it works <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Right: The Widget */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-coral/20 to-transparent blur-xl opacity-20 transform -rotate-6 scale-95" />
                    <div className="bg-white dark:bg-black border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-1">
                        
                        {/* Fake Browser Header */}
                        <div className="bg-ivory dark:bg-white/5 border-b border-black/5 p-4 flex items-center justify-between">
                             <div className="flex gap-2">
                                 <div className="w-3 h-3 rounded-full bg-red-400" />
                                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                 <div className="w-3 h-3 rounded-full bg-green-400" />
                             </div>
                             <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Castells_Client_Dash.exe</div>
                             <div className="w-4" />
                        </div>

                        {/* Widget Content */}
                        <div className="p-6">
                             <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-xs text-text-secondary uppercase tracking-widest">Total Pipeline</div>
                                    <div className="text-3xl font-display font-bold">$428,950</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-text-secondary uppercase tracking-widest">Growth</div>
                                    <div className="text-sm font-bold text-green-500 flex items-center justify-end gap-1">
                                        +24.5% <TrendingUp className="w-3 h-3" />
                                    </div>
                                </div>
                             </div>

                             <div className="space-y-2 mb-6">
                                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "75%" }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-coral" 
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                                    <span>Goal Progress</span>
                                    <span>75%</span>
                                </div>
                             </div>

                             <div className="border-t border-black/5 pt-4">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-3">Live Feed</div>
                                {/* Fixed height container to prevent jitter */}
                                <div className="h-[240px] overflow-hidden relative">
                                    <AnimatedList delay={2000} maxItems={3} className="w-full">
                                        {NOTIFICATIONS.map((item, idx) => (
                                            <NotificationCard key={idx} {...item} />
                                        ))}
                                    </AnimatedList>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REASONS.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-black p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-coral/30 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-ivory dark:bg-white/10 flex items-center justify-center text-text-primary group-hover:bg-coral group-hover:text-white transition-colors mb-6">
                        <item.icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-coral transition-colors">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            ))}
        </div>
        
      </div>
    </section>
  );
};

export default WhyChoose;
