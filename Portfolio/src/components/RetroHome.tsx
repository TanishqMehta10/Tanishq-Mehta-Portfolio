import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, CheckSquare, Minimize2, Maximize2, X, Terminal, Code2, Cpu, User } from 'lucide-react';

// Reusable Window Component
const RetroWindow = ({ 
  title, 
  children, 
  className = "", 
  defaultPosition = { x: 0, y: 0 },
  delay = 0,
  icon: Icon = Terminal
}: { 
  title: string, 
  children: React.ReactNode, 
  className?: string,
  defaultPosition?: { x: number, y: number },
  delay?: number,
  icon?: any
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8, x: defaultPosition.x, y: defaultPosition.y - 40 }}
      animate={{ opacity: 1, scale: 1, y: defaultPosition.y }}
      transition={{ type: "spring", bounce: 0.4, delay }}
      whileDrag={{ scale: 1.02, zIndex: 60 }}
      className={`absolute flex flex-col bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:border-purple-500/30 transition-shadow duration-500 rounded-xl overflow-hidden ${className}`}
      style={{ touchAction: "none", zIndex: 10 }}
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 cursor-grab active:cursor-grabbing group">
        <div className="flex items-center gap-2.5">
          <button onClick={() => setIsClosed(true)} className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center">
            <X size={8} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center">
            <Minimize2 size={8} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all flex items-center justify-center">
            <Maximize2 size={8} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-purple-400" />
          <span className="text-gray-300 font-sans text-xs tracking-wider font-medium select-none">
            {title}
          </span>
        </div>
        <div className="w-16"></div> {/* spacer for centering title */}
      </div>

      {/* Window Content */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-5 flex-1 overflow-auto custom-scrollbar"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RetroHome: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center pt-20 z-10 hidden md:flex">
      
      {/* Premium Animated Glowing Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDelay: '4s', animationDuration: '9s' }}></div>
        
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="relative w-full h-[750px] max-w-7xl mx-auto z-10 perspective-1000">
        
        {/* Profile Window */}
        <RetroWindow 
          title="Tanishq_Mehta.exe" 
          defaultPosition={{ x: -20, y: 150 }} 
          delay={0.1}
          icon={User}
          className="w-72 md:w-[340px] h-auto z-20 left-1/2 -ml-[170px]"
        >
          <div className="flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-48 h-48 rounded-full overflow-hidden mb-6 p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex justify-center items-center">
                <img src="/updt profile photo.jpg" alt="Tanishq Mehta" className="w-full h-full object-cover transition-all duration-700 hover:scale-110" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-1">
              Tanishq Mehta
            </h1>
            <p className="text-gray-400 font-mono text-sm mt-1 text-center bg-white/5 py-1 px-4 rounded-full border border-white/10">
              Full-Stack Eng. / AI & ML
            </p>
            <div className="flex gap-4 mt-6">
               <motion.button 
                 whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.6)" }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => window.open('https://www.linkedin.com/in/tanishq-mehta-2052832b7/', '_blank')}
                 className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full transition-all"
               >
                 Let's Connect
               </motion.button>
            </div>
          </div>
        </RetroWindow>

        {/* Education Window */}
        <RetroWindow 
          title="under_grad.json" 
          defaultPosition={{ x: 50, y: 50 }} 
          delay={0.2}
          icon={Code2}
          className="w-72 max-w-xs z-10 left-[5%] xl:left-[8%]"
        >
          <div className="space-y-3 font-mono text-[13px]">
            <p className="text-pink-400">{"{"}</p>
            <div className="pl-4 space-y-2">
              <p><span className="text-cyan-400">"degree"</span>: <span className="text-yellow-300">"B.Tech in CSE"</span>,</p>
              <p><span className="text-cyan-400">"institute"</span>: <span className="text-yellow-300">"Walchand Institute of Technology"</span>,</p>
              <p><span className="text-cyan-400">"status"</span>: <span className="text-green-400">"Pursuing"</span></p>
            </div>
            <p className="text-pink-400">{"}"}</p>
          </div>
        </RetroWindow>

        {/* Notable Projects Window */}
        <RetroWindow 
          title="projects.sh" 
          defaultPosition={{ x: 20, y: 320 }} 
          delay={0.3}
          icon={Terminal}
          className="w-80 md:w-96 max-w-md z-30 left-[3%] xl:left-[6%]"
        >
          <div className="space-y-4 font-mono text-xs md:text-sm text-gray-300">
            <div className="flex items-start gap-3 group">
              <CheckSquare className="text-green-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-green-400/50 drop-shadow-md" size={16} />
              <div>
                <p className="text-purple-300 font-semibold mb-1 hover:text-purple-200 cursor-pointer">Smart Tourist Safety System</p>
                <p className="text-gray-500 text-xs">Emergency response & immediate rescue</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <CheckSquare className="text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-cyan-400/50 drop-shadow-md" size={16} />
              <div onClick={() => window.open('https://github.com/TanishqMehta10/Smart_Exam_Surveillance', '_blank')}>
                <p className="text-purple-300 font-semibold mb-1 hover:text-cyan-200 cursor-pointer">Smart Exam Surveillance</p>
                <p className="text-gray-500 text-xs">Real-time CV cheat detection & alerts</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-cyan-400 animate-pulse">
              <span className="text-pink-500">&gt;</span> Drag windows to interact_
            </div>
          </div>
        </RetroWindow>

        {/* About Notepad Window */}
        <RetroWindow 
          title="README.md" 
          defaultPosition={{ x: -20, y: 80 }} 
          delay={0.4}
          className="w-80 md:w-96 max-w-lg z-10 right-[5%] xl:right-[10%]"
        >
          <div className="flex">
            {/* Fake Editor Line Numbers */}
            <div className="flex flex-col text-slate-600 font-mono text-[13px] pr-4 select-none border-r border-white/10 mr-4">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
            </div>
            <div className="font-mono text-[13px] text-gray-300 leading-relaxed space-y-3">
              <p>
                <span className="text-pink-400">#</span> <span className="text-purple-300 font-bold">Identity</span><br/>
                <span className="text-gray-400">A creative mind with a deep passion for creating impactful solutions.</span>
              </p>
              <p>
                <span className="text-pink-400">##</span> <span className="text-cyan-300 font-bold">Philosophy</span><br/>
                <span className="text-gray-400">Writing clean, efficient code and creating experiences that matter.</span>
              </p>
              <p>
                <span className="text-pink-400">###</span> <span className="text-green-300 font-bold">Current State</span><br/>
                <span className="text-gray-400">Exploring new tech, building open-source, and constant ideation.</span>
              </p>
            </div>
          </div>
        </RetroWindow>

        {/* Passions Folders Window */}
        <RetroWindow 
          title="~/skills/passions" 
          defaultPosition={{ x: -100, y: 420 }} 
          delay={0.5}
          icon={Cpu}
          className="w-80 md:w-96 max-w-md z-20 right-[3%] xl:right-[8%]"
        >
          <div className="grid grid-cols-3 gap-y-6 gap-x-2 text-center text-gray-300 font-mono text-[11px]">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Folder className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </div>
              <span className="group-hover:text-cyan-300 transition-colors hidden md:block">Full-Stack Web</span>
              <span className="group-hover:text-cyan-300 transition-colors md:hidden">Web Dev</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Folder className="w-10 h-10 md:w-12 md:h-12 text-purple-400 fill-purple-400/20 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
              </div>
              <span className="group-hover:text-purple-300 transition-colors">AI / ML</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Folder className="w-10 h-10 md:w-12 md:h-12 text-pink-400 fill-pink-400/20 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
              </div>
              <span className="group-hover:text-pink-300 transition-colors">Data Viz</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Folder className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 fill-yellow-400/20 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              </div>
              <span className="group-hover:text-yellow-300 transition-colors">UI / UX</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Folder className="w-10 h-10 md:w-12 md:h-12 text-green-400 fill-green-400/20 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
              </div>
              <span className="group-hover:text-green-300 transition-colors">Problem Solving</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Terminal className="w-10 h-10 md:w-12 md:h-12 text-indigo-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
              </div>
              <span className="group-hover:text-indigo-300 transition-colors">Clean Code</span>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};

export default RetroHome;
