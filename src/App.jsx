import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Cpu,
  Globe,
  Zap,
  Search,
  Bell,
  Plus,
  Play,
  Pause,
  Settings,
  Terminal,
  ChevronRight,
  Layers,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Bot,
  Box,
  Menu,
  X,
  Star
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

// --- Particle Background Component ---
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#14F1D9]/10 rounded-full blur-xl"
          initial={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// --- GlassCard Component ---
const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { y: -8, scale: 1.02, borderColor: "rgba(20, 241, 217, 0.3)" } : {}}
    className={`bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl relative group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#14F1D9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
);

// --- GlowButton Component ---
const GlowButton = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-[#14F1D9] to-[#6366F1] text-black font-bold shadow-[0_0_20px_rgba(20,241,217,0.4)] hover:shadow-[0_0_35px_rgba(20,241,217,0.6)]",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    outline: "border border-[#14F1D9] text-[#14F1D9] hover:bg-[#14F1D9]/10"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={`px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap active:scale-90 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- AgentCard Component ---
const AgentCard = ({ agent, onClick }) => (
  <GlassCard className="p-5 cursor-pointer" onClick={onClick}>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#14F1D9]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-10 ${agent.color} bg-current`}>
        <agent.icon className={`w-6 h-6 ${agent.textColor}`} />
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full animate-pulse ${agent.status === 'Active' ? 'bg-[#14F1D9]' : 'bg-yellow-500'}`} />
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">{agent.status}</span>
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#14F1D9] transition-colors">{agent.name}</h3>
    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{agent.desc}</p>

    <div className="space-y-3">
      <div className="flex justify-between text-[11px] text-gray-500 font-mono">
        <span>EFFICIENCY</span>
        <span>{agent.metric}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${agent.metric}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${agent.gradient}`}
        />
      </div>
    </div>

    <div className="flex justify-between mt-5 pt-4 border-t border-white/5">
      <div className="flex gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"><Play size={16} /></button>
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"><Settings size={16} /></button>
      </div>
      <button className="text-[#14F1D9] text-sm font-semibold flex items-center gap-1 group/btn">
        Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </GlassCard>
);

// --- WorkflowBlock Component ---
const WorkflowBlock = ({ type, icon: Icon, color, title }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex flex-col items-center gap-4 relative group"
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-[#0B1120] shadow-xl group-hover:border-[#14F1D9]/50 transition-colors cursor-pointer relative`}>
      <div className={`absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40 ${color}`} />
      <Icon className="text-white relative z-10" />
    </div>
    <span className="text-xs font-mono text-gray-400 uppercase tracking-tighter group-hover:text-white transition-colors">{title}</span>
  </motion.div>
);

// --- Custom Cursor / Glow Overlay Component ---
const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="cursor-glow" />;
};

// --- Mobile Navigation Component ---
const MobileNav = ({ isOpen, onClose, activeTab, setActiveTab }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0B1120] border-l border-white/10 z-[70] p-10 flex flex-col md:hidden"
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-bold text-2xl tracking-tighter">AETHER<span className="text-[#14F1D9]">OS</span></span>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
          </div>
          <div className="flex flex-col gap-6">
            {['Dashboard', 'Agents', 'Workflows', 'Analytics'].map((item) => (
              <button
                key={item}
                onClick={() => { setActiveTab(item.toLowerCase()); onClose(); }}
                className={`text-xl font-bold transition-colors text-left flex items-center justify-between group ${activeTab === item.toLowerCase() ? 'text-[#14F1D9]' : 'text-gray-400'}`}
              >
                {item}
                <ChevronRight size={20} className={`transform transition-transform ${activeTab === item.toLowerCase() ? 'translate-x-0' : '-translate-x-4 opacity-0'}`} />
              </button>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/5">
            <GlowButton className="w-full justify-center">Deploy Agent</GlowButton>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Loader Component ---
const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-[#0B1120] flex flex-col items-center justify-center p-6 text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#14F1D9] border-t-transparent rounded-full mb-8 relative"
          >
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-[#6366F1] animate-reverse-spin" />
          </motion.div>
          <h2 className="text-2xl font-bold tracking-tighter mb-4">INITIALIZING <span className="text-[#14F1D9]">AETHER OS</span></h2>
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-[#14F1D9] to-[#6366F1]"
            />
          </div>
          <p className="mt-4 text-[10px] text-gray-500 font-mono animate-pulse">ESTABLISHING QUANTUM HANDSHAKE...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Hero 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // SSR Safe Scroll Listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const agents = [
    { name: "Atlas-7", status: "Active", metric: 94, desc: "Logistics & Supply Chain Intelligence", icon: Box, color: "text-blue-500", textColor: "text-blue-400", gradient: "from-blue-500 to-indigo-600" },
    { name: "Sentrix", status: "Active", metric: 88, desc: "Global Security & Threat Mitigation", icon: ShieldCheck, color: "text-[#14F1D9]", textColor: "text-[#14F1D9]", gradient: "from-[#14F1D9] to-emerald-500" },
    { name: "Vocalis", status: "Training", metric: 42, desc: "Natural Language Synthesis & Dialect Adaption", icon: MessageSquare, color: "text-purple-500", textColor: "text-purple-400", gradient: "from-purple-500 to-pink-500" },
    { name: "Quantus", status: "Active", metric: 99, desc: "Predictive Financial Market Analysis", icon: BarChart3, color: "text-amber-500", textColor: "text-amber-400", gradient: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white selection:bg-[#14F1D9]/30 font-sans overflow-x-hidden">
      <PageLoader />
      <CursorGlow />
      <ParticleBackground />

      {/* Floating Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ${scrolled ? 'top-2' : ''}`}>
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#14F1D9] to-[#6366F1] rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu size={18} className="text-black" />
            </div>
            <span className="font-bold text-xl tracking-tighter hidden sm:block">AETHER<span className="text-[#14F1D9]">OS</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Agents', 'Workflows', 'Analytics'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`text-sm font-medium transition-all relative py-1 ${activeTab === item.toLowerCase() ? 'text-[#14F1D9]' : 'text-gray-400 hover:text-white'}`}
              >
                {item}
                {activeTab === item.toLowerCase() && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#14F1D9]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className={`relative flex items-center bg-white/5 rounded-full transition-all duration-500 ${searchExpanded ? 'w-48 px-3' : 'w-10'}`}>
              <Search size={18} className="text-gray-400 cursor-pointer" onClick={() => setSearchExpanded(!searchExpanded)} />
              {searchExpanded && <input type="text" placeholder="Search system..." className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2" autoFocus />}
            </div>
            <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-full transition-colors hidden sm:block">
              <Bell size={18} className="text-gray-400" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#EC4899] rounded-full animate-pulse"></div>
            </div>
            <GlowButton className="hidden lg:flex py-2 px-5 text-sm">
              <Plus size={16} /> Deploy Agent
            </GlowButton>
            <button className="md:hidden p-2 hover:bg-white/5 rounded-lg active:scale-95 transition-all text-[#14F1D9]" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Hero Section */}
      <section className="relative pt-40 md:pt-52 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14F1D9]/10 border border-[#14F1D9]/20 text-[#14F1D9] text-xs font-bold mb-8 tracking-widest uppercase"
            >
              <Zap size={14} className="animate-pulse" /> v4.2.0 NEXT-GEN CORE READY
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter">
              Your Autonomous <br />
              <span className="text-[#14F1D9] drop-shadow-[0_0_15px_rgba(20,241,217,0.3)]">AI Workforce</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
              Orchestrate a swarm of intelligent agents that learn, adapt, and execute complex operations across your entire infrastructure with zero latency.
            </p>
            <div className="flex flex-wrap gap-5">
              <GlowButton className="px-10 py-5 text-base">Launch Workspace</GlowButton>
              <GlowButton variant="secondary" className="px-10 py-5 text-base group">
                Explore Capabilities
                <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
              </GlowButton>
            </div>

            <div className="mt-16 flex items-center gap-8 text-gray-500 grayscale opacity-50">
              <Cpu size={32} />
              <Globe size={32} />
              <ShieldCheck size={32} />
              <Activity size={32} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden lg:block perspective-1000"
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative z-10"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#14F1D9]/20 to-[#6366F1]/20 blur-3xl rounded-full"></div>
              <GlassCard className="p-2 border-white/20 relative z-10 bg-[#0B1120]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="rounded-xl overflow-hidden bg-[#0B1120] border border-white/10 aspect-video relative group/hero">
                  {/* Mock UI in Hero */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="w-full space-y-6">
                      <div className="flex justify-between items-end gap-3 h-40">
                        {agents.map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.random() * 60 + 40}%` }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 + i * 0.2 }}
                            className={`w-full bg-gradient-to-t ${i % 2 === 0 ? 'from-[#14F1D9] to-[#6366F1]' : 'from-[#6366F1] to-purple-500'} rounded-t-lg opacity-40 group-hover/hero:opacity-80 transition-opacity`}
                          />
                        ))}
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full relative overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                          className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-[#14F1D9] to-transparent"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="h-14 flex-1 bg-white/5 rounded-xl border border-white/10 group-hover/hero:border-[#14F1D9]/30 transition-colors"></div>
                        <div className="h-14 flex-1 bg-white/5 rounded-xl border border-white/10 group-hover/hero:border-[#14F1D9]/30 transition-colors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20"
            >
              <GlassCard className="p-4 flex items-center gap-3 bg-[#111827] border-[#14F1D9]/20 shadow-xl shadow-[#14F1D9]/5">
                <div className="p-2 bg-pink-500/20 rounded-lg shadow-inner"><Star size={20} className="text-pink-500" /></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-mono">THROUGHPUT</p>
                  <p className="font-bold text-[#14F1D9]">12.4k req/s</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -left-12 z-20"
            >
              <GlassCard className="p-4 flex items-center gap-3 bg-[#111827] border-[#6366F1]/20">
                <div className="p-2 bg-[#6366F1]/20 rounded-lg"><Zap size={20} className="text-[#6366F1]" /></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-mono">LATENCY</p>
                  <p className="font-bold">0.8 ms</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366F1]/5 blur-[120px] rounded-full -mt-20 -mr-20 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Active Intelligence</h2>
            <p className="text-gray-400 text-lg leading-relaxed">Real-time telemetry and status monitoring of your deployed neural nodes across global clusters.</p>
          </div>
          <button className="text-sm font-bold text-[#14F1D9] flex items-center gap-2 group hover:gap-3 transition-all px-6 py-3 rounded-full bg-[#14F1D9]/5 border border-[#14F1D9]/10">
            VIEW ALL SYSTEMS <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AgentCard agent={agent} onClick={() => setSelectedAgent(agent)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Activity & Data */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="h-full group/log">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Terminal size={20} className="text-[#14F1D9]" />
                  <h3 className="font-bold tracking-widest uppercase text-xs">Neural Log Stream</h3>
                </div>
                <div className="flex gap-3">
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-gray-500 font-mono cursor-pointer hover:bg-white/10 transition-colors uppercase">Filter: Primary</span>
                  <span className="px-3 py-1 rounded-full bg-[#14F1D9]/10 text-[9px] text-[#14F1D9] font-bold uppercase tracking-tighter flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14F1D9] animate-ping" />
                    Live
                  </span>
                </div>
              </div>
              <div className="p-6 h-[450px] overflow-y-auto font-mono text-[13px] space-y-4 custom-scrollbar bg-[#0B1120]/30">
                <div className="flex gap-4 text-[#14F1D9] group/line hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="opacity-30 flex-shrink-0">09:21:44</span>
                  <span>Atlas-7 initialized handshake with ERP-Global-Main</span>
                </div>
                <div className="flex gap-4 text-white/70 group/line hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="opacity-30 flex-shrink-0">09:21:45</span>
                  <span>Sentrix scanning subnet 192.168.1.x for vulnerability markers...</span>
                </div>
                <div className="flex gap-4 text-pink-400 group/line hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="opacity-30 flex-shrink-0">09:21:48</span>
                  <span className="flex items-center gap-2"><X size={14} /> Warning: Vocalis resource usage exceeded 85% on Node 4</span>
                </div>
                <div className="flex gap-4 text-[#14F1D9] group/line hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="opacity-30 flex-shrink-0">09:22:01</span>
                  <span>Quantus generated predictive model for Q3 Commodities</span>
                </div>
                <div className="flex gap-4 text-emerald-400 group/line hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="opacity-30 flex-shrink-0">09:22:15</span>
                  <span className="flex items-center gap-2"><ShieldCheck size={14} /> System-wide health check completed. All nodes operational.</span>
                </div>
                <div className="flex gap-4 text-[#6366F1] group/line hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="opacity-30 flex-shrink-0">09:22:20</span>
                  <span>Syncing distributed state across 12 edge clusters...</span>
                </div>
                <div className="flex gap-4 text-[#14F1D9] animate-pulse">
                  <span className="opacity-30 flex-shrink-0">09:22:30</span>
                  <span className="inline-block w-2 h-4 bg-[#14F1D9] align-middle"></span>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-8">
            <GlassCard className="p-8 bg-gradient-to-br from-[#111827] to-[#0B1120] border-[#14F1D9]/10">
              <h4 className="text-gray-500 text-[10px] font-mono mb-6 uppercase tracking-widest">Network Health</h4>
              <div className="flex justify-between items-center mb-8">
                <div className="text-5xl font-bold tracking-tighter">99.8<span className="text-lg text-gray-600 font-mono ml-1">SR</span></div>
                <div className="p-4 bg-[#14F1D9]/10 rounded-2xl">
                  <Activity size={32} className="text-[#14F1D9] animate-vertical-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-mono uppercase">
                  <span className="text-gray-500">Latency Threshold</span>
                  <span className="text-[#14F1D9]">14ms OPTIMAL</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "14%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#14F1D9] to-emerald-500"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-[#6366F1]/10">
              <h4 className="text-gray-500 text-[10px] font-mono mb-8 uppercase tracking-widest">Compute Efficiency</h4>
              <div className="flex items-center justify-center py-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                    <motion.circle
                      cx="80" cy="80" r="74"
                      stroke="currentColor" strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="465"
                      initial={{ strokeDashoffset: 465 }}
                      animate={{ strokeDashoffset: 130 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-[#6366F1]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-tighter">72<span className="text-sm font-normal text-gray-500">%</span></span>
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Loaded</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4 font-mono">NODE-B CLUSTER AUTO-BALANCED</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Workflow Builder Preview */}
      <section className="py-40 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter uppercase">Orchestration Flows</h2>
          <p className="text-gray-400 mb-24 max-w-2xl mx-auto text-lg">Connect agents to complex triggers and automated conditional logic pipelines with our drag-and-drop neural bridge.</p>
        </motion.div>

        <div className="relative inline-flex items-center justify-center p-16 md:p-24 bg-white/[0.01] rounded-[3rem] border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#14F1D9]/5 to-transparent blur-[80px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 relative z-10">
            <WorkflowBlock title="Webhook" icon={Globe} color="bg-blue-500" />

            <div className="hidden md:block w-32 h-[2px] bg-gradient-to-r from-blue-500 via-[#14F1D9] to-[#14F1D9] relative">
              <motion.div
                animate={{ x: [0, 128] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"
              />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20">POST_REQ</div>
            </div>

            <WorkflowBlock title="Classifier" icon={Layers} color="bg-[#14F1D9]" />

            <div className="hidden md:block w-32 h-[2px] bg-gradient-to-r from-[#14F1D9] via-[#6366F1] to-purple-500 relative">
              <motion.div
                animate={{ x: [0, 128] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"
              />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#14F1D9] bg-[#14F1D9]/10 px-2 py-1 rounded border border-[#14F1D9]/20">TOKENIZE</div>
            </div>

            <WorkflowBlock title="Execution" icon={Zap} color="bg-purple-500" />
          </div>
        </div>
      </section>

      {/* Capabilities Marquee */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 overflow-hidden">
        <div className="flex gap-8 animate-marquee py-12 whitespace-nowrap">
          {['API Automation', 'Multi-Agent Collaboration', 'Visual Reasoning', 'Self-Healing Loops', 'Human-in-the-Loop', 'Encrypted Computation', 'Edge Deployment', 'Zero-Trust Architecture'].map((feat, i) => (
            <div key={i} className="px-10 py-8 rounded-3xl bg-[#111827] border border-white/10 flex items-center gap-5 inline-block shadow-2xl hover:border-[#14F1D9]/30 transition-all group">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#14F1D9]/10 transition-colors">
                <Bot className="text-[#14F1D9]" size={28} />
              </div>
              <span className="text-xl font-bold tracking-tight">{feat}</span>
            </div>
          ))}
          {/* Repeat for loop */}
          {['API Automation', 'Multi-Agent Collaboration', 'Visual Reasoning', 'Self-Healing Loops', 'Human-in-the-Loop', 'Encrypted Computation', 'Edge Deployment', 'Zero-Trust Architecture'].map((feat, i) => (
            <div key={i + 20} className="px-10 py-8 rounded-3xl bg-[#111827] border border-white/10 flex items-center gap-5 inline-block shadow-2xl hover:border-[#14F1D9]/30 transition-all group">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#14F1D9]/10 transition-colors">
                <Bot className="text-[#14F1D9]" size={28} />
              </div>
              <span className="text-xl font-bold tracking-tight">{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
          >
            Scalable Intelligence
          </motion.h2>
          <div className="flex items-center justify-center gap-6 mt-12 bg-white/5 p-2 rounded-full w-fit mx-auto border border-white/5">
            <button className="px-6 py-2 rounded-full text-sm font-bold text-gray-500">Monthly</button>
            <button className="px-6 py-2 rounded-full text-sm font-bold bg-[#14F1D9] text-black shadow-[0_0_20px_rgba(20,241,217,0.3)]">Yearly <span className="text-[10px] ml-1 opacity-70">(-25%)</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Explorer", price: "0", features: ["1 Active Agent", "Standard Speed", "Community Support", "Public Cloud"] },
            { name: "Builder", price: "49", features: ["5 Active Agents", "Custom Models", "Priority Queue", "Edge Processing"], highlight: false },
            { name: "Scale", price: "199", features: ["Unlimited Agents", "Enterprise API", "Dedicated Node", "SOC2 Compliance"], highlight: true },
            { name: "Custom", price: "...", features: ["Custom SLA", "On-Prem Deployment", "White Glove Support", "Custom Hardware"], highlight: false }
          ].map((plan, i) => (
            <GlassCard key={i} className={`p-10 relative flex flex-col ${plan.highlight ? 'border-[#14F1D9]/50 shadow-[#14F1D9]/10' : ''}`}>
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#14F1D9] to-[#6366F1] text-black text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-tighter">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{plan.name}</h3>
              <div className="text-5xl font-bold mb-10 tracking-tighter">
                ${plan.price}
                {plan.price !== "..." && <span className="text-sm text-gray-600 font-mono ml-1 uppercase">/mo</span>}
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-400 group/item">
                    <ShieldCheck size={18} className="text-[#14F1D9] group-hover/item:scale-110 transition-transform" />
                    {f}
                  </li>
                ))}
              </ul>
              <GlowButton variant={plan.highlight ? 'primary' : 'secondary'} className="w-full justify-center py-4">Get Started</GlowButton>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden relative">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#6366F1]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <h2 className="text-center text-5xl md:text-6xl font-bold mb-32 tracking-tighter uppercase">Powering Global Operations</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { name: "Sarah Chen", role: "CTO, Neuralinked", text: "The most intuitive agentic platform we've integrated. Deployment cycles dropped by 60% in the first month." },
            { name: "Marcus Thorne", role: "AI Lead, QuantumSec", text: "AetherOS provides the granular control necessary for high-stakes security automation and real-time response." },
            { name: "Elena Rossi", role: "Founder, Synthetix", text: "Scaling our workforce from 10 humans to 1,000 agents was seamless. The neural bridge logic is mind-blowing." }
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <GlassCard className="p-10 bg-white/5 border-white/10 hover:bg-white/[0.08] transition-all h-full">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gray-800 to-gray-700 shadow-xl flex items-center justify-center font-bold text-gray-500 overflow-hidden relative">
                    <span className="relative z-10">{t.name[0]}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#14F1D9]/10 to-transparent" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed text-lg">"{t.text}"</p>
                <div className="flex gap-1.5 mt-10 text-[#14F1D9]">
                  {[...Array(5)].map((_, star) => <Star key={star} size={16} fill="currentColor" />)}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-40 pb-16 px-6 bg-[#0B1120] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-20 mb-32">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-tr from-[#14F1D9] to-[#6366F1] rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Cpu size={22} className="text-black" />
                </div>
                <span className="font-bold text-3xl tracking-tighter">AETHER<span className="text-[#14F1D9]">OS</span></span>
              </div>
              <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
                Building the foundational operating system for the autonomous future. Security-first, AI-native infrastructure for the next billion agents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Enter node address for updates" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-[#14F1D9] outline-none text-sm min-w-[280px] transition-all focus:bg-white/[0.08]" />
                <GlowButton className="py-4 px-8">Join Network</GlowButton>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gray-400">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Agent Marketplace</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Core Nodes</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">System Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gray-400">Governance</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Our Vision</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Collective</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Transparency</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors">Privacy Protocol</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gray-400">Social</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors font-mono">X / TWITTER</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors font-mono">GITHUB / SRC</a></li>
                <li><a href="#" className="hover:text-[#14F1D9] transition-colors font-mono">DISCORD / DEV</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-white/5 text-gray-600 font-mono text-[10px] uppercase tracking-[0.2em]">
            <p>© 2024 AETHER INTELLIGENCE SYSTEMS // QUANTUM CORE DEPLOYED</p>
            <div className="flex gap-12 font-bold">
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
              <a href="#" className="hover:text-white transition-colors">LEGAL NOTICE</a>
              <a href="#" className="hover:text-white transition-colors">SECURITY AUDIT</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Agent Detail Side Panel */}
      <AnimatePresence>
        {selectedAgent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgent(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-4 bottom-4 right-4 w-[95%] max-w-2xl bg-[#0B1120] border border-white/10 z-[90] shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl bg-opacity-10 ${selectedAgent.color} bg-current`}>
                    <selectedAgent.icon className={`w-8 h-8 ${selectedAgent.textColor}`} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight">{selectedAgent.name}</h2>
                    <p className="text-[#14F1D9] font-mono text-[10px] tracking-widest mt-1 uppercase">{selectedAgent.status} NODE ACTIVATED</p>
                  </div>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="p-3 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"><X size={28} /></button>
              </div>

              <div className="p-10 space-y-12 overflow-y-auto custom-scrollbar">
                <section>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">Functional Description</h4>
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
                    <p className="text-gray-300 leading-relaxed text-xl">{selectedAgent.desc}</p>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 group hover:border-[#14F1D9]/30 transition-colors">
                    <p className="text-[9px] font-mono text-gray-500 mb-3 tracking-[0.2em] uppercase">Uptime Reliability</p>
                    <p className="font-black text-3xl tracking-tighter">14d 2h 4m</p>
                  </div>
                  <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 group hover:border-[#6366F1]/30 transition-colors">
                    <p className="text-[9px] font-mono text-gray-500 mb-3 tracking-[0.2em] uppercase">Throughput / TPM</p>
                    <p className="font-black text-3xl tracking-tighter">~45,000</p>
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-6">Core Competencies</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Heuristic Reasoning', 'Real-time Translation', 'Conflict Resolution', 'Semantic Search', 'Vector Quantization', 'Cross-Chain Sync'].map((c, i) => (
                      <span key={i} className="px-5 py-2.5 rounded-full bg-[#14F1D9]/5 text-[#14F1D9] text-xs font-bold border border-[#14F1D9]/10 hover:bg-[#14F1D9]/10 transition-colors cursor-default">{c}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-6">Integration Map</h4>
                  <div className="aspect-square w-full rounded-3xl border border-dashed border-white/10 flex items-center justify-center text-gray-600 font-mono text-[10px]">
                    [ VISUAL BRIDGE DIAGRAM INITIALIZING ]
                  </div>
                </section>
              </div>

              <div className="mt-auto p-10 border-t border-white/5 bg-white/[0.01] flex gap-5">
                <GlowButton className="flex-1 py-5 text-base">Restart Agent Instance</GlowButton>
                <GlowButton variant="secondary" className="flex-1 py-5 text-base">Terminal Debugger</GlowButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 1.5s linear infinite;
        }
        @keyframes vertical-pulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.7); opacity: 0.5; }
        }
        .animate-vertical-pulse {
          animation: vertical-pulse 2s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 241, 217, 0.2);
        }
        :root {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
      `}} />
    </div>
  );
}
