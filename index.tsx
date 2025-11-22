
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LayoutDashboard, 
  TreeDeciduous, 
  Wind, 
  AlertTriangle, 
  Activity, 
  Map as MapIcon, 
  Bell,
  Search,
  Cpu,
  Zap,
  Send,
  Menu,
  MoreHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Bot,
  Loader2,
  Wifi,
  FileText,
  Download,
  Play,
  Image as ImageIcon,
  X,
  CheckCircle2,
  Database,
  Layers,
  Star,
  Target,
  Lightbulb,
  Users,
  Smartphone
} from 'lucide-react';

// --- Types ---
type Alert = {
  id: number;
  treeId: string;
  location: string;
  risk: number;
  status: "CRITICAL" | "WARNING" | "STABLE";
  type: string;
  time: string;
};

type ChatMessage = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
};

// --- Mock Data ---
const ALERTS: Alert[] = [
  { id: 1, treeId: "T-1092", location: "Nguyễn Trãi, Thanh Xuân", risk: 92, status: "CRITICAL", type: "Nghiêng > 15°", time: "2 phút trước" },
  { id: 2, treeId: "T-0451", location: "Trần Phú, Hà Đông", risk: 78, status: "WARNING", type: "Rung lắc mạnh", time: "15 phút trước" },
  { id: 3, treeId: "T-2201", location: "Láng Hạ, Đống Đa", risk: 45, status: "STABLE", type: "Bảo trì định kỳ", time: "1 giờ trước" },
];

// --- Components ---

// 1. Glass Card Container (The Core of Glassmorphism)
const GlassCard = ({ 
  children, 
  className = "", 
  noPadding = false 
}: { 
  children?: React.ReactNode; 
  className?: string;
  noPadding?: boolean;
}) => (
  <div className={`relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl rounded-2xl overflow-hidden flex flex-col ${className}`}>
    {/* Noise texture for realism */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    
    {/* Gradient Glow Effect */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none"></div>
    
    <div className={`relative z-10 h-full flex flex-col ${noPadding ? '' : 'p-6'}`}>
      {children}
    </div>
  </div>
);

// 2. Sidebar
const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  onToggleAutoDemo, 
  isAutoDemo,
  onOpenPoster 
}: { 
  activeTab: string, 
  setActiveTab: (t: string) => void,
  onToggleAutoDemo: () => void,
  isAutoDemo: boolean,
  onOpenPoster: () => void
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate download delay
    setTimeout(() => {
      setIsExporting(false);
      alert("Đã xuất báo cáo: GREEN_SAFE_REPORT_2024.pdf");
    }, 2000);
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
    { id: 'map', icon: MapIcon, label: 'Bản đồ Số' },
    { id: 'devices', icon: Cpu, label: 'Thiết bị AIoT' },
    { id: 'alerts', icon: AlertTriangle, label: 'Cảnh báo' },
  ];

  return (
    <div className="h-full flex flex-col py-6 w-20 lg:w-64 transition-all duration-300 border-r border-white/5 bg-slate-900/50 backdrop-blur-lg fixed lg:static z-50">
      <div className="flex items-center gap-3 px-6 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <TreeDeciduous className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col hidden lg:flex">
          <span className="text-lg font-bold text-white tracking-wide">Green Safe</span>
          <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Smart Urban Guard</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-emerald-500/20 to-transparent text-emerald-300' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 h-full w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
            )}
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-400' : ''}`} />
            <span className="hidden lg:block font-medium">{item.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="h-px bg-white/5 my-2 mx-4"></div>
        
        <div className="text-xs font-bold text-slate-500 px-4 mb-2 uppercase tracking-wider hidden lg:block">Công cụ thuyết trình</div>

        {/* Auto Demo Button */}
        <button
          onClick={onToggleAutoDemo}
          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group border ${
            isAutoDemo 
              ? 'border-red-500/30 bg-red-500/10 text-red-400' 
              : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
          }`}
        >
           {isAutoDemo ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 group-hover:text-emerald-400" />}
          <span className="hidden lg:block font-medium">
            {isAutoDemo ? 'Dừng Demo' : 'Auto Demo'}
          </span>
        </button>

        {/* Poster Generator Button */}
        <button
          onClick={onOpenPoster}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-200 group"
        >
          <ImageIcon className="w-5 h-5 group-hover:text-purple-400" />
          <span className="hidden lg:block font-medium">Tạo Poster</span>
        </button>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-200 group"
        >
          {isExporting ? (
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
          ) : (
            <FileText className="w-5 h-5 group-hover:text-emerald-400" />
          )}
          <span className="hidden lg:block font-medium">
            {isExporting ? 'Đang xuất...' : 'Xuất báo cáo'}
          </span>
        </button>
      </div>

      <div className="px-6 mt-auto">
        <GlassCard className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 !border-white/5" noPadding>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-slate-200">System Health</span>
              </div>
              <span className="text-xs text-emerald-400 font-mono">98.5%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-[98.5%] bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
            </div>
            <div className="mt-2 text-[10px] text-slate-500">All nodes operational. Low latency.</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// 3. Stat Card
const StatCard = ({ title, value, subtext, icon: Icon, trend, color = "emerald" }: any) => (
  <GlassCard className="group hover:border-white/20 transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-400`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
      <p className="text-xs text-slate-500">{subtext}</p>
    </div>
    {/* Decoration */}
    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-500 to-transparent opacity-50`}></div>
  </GlassCard>
);

// 4. AI Chat Widget
const AIChatWidget = ({ isAutoDemo }: { isAutoDemo: boolean }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'ai', text: 'Xin chào! Tôi là trợ lý AI Green Safe. Hệ thống vừa phát hiện 1 cây có nguy cơ gãy đổ cao tại Nguyễn Trãi. Bạn cần báo cáo chi tiết không?' }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Auto Demo Logic for Chat
  useEffect(() => {
    let demoInterval: any;
    if (isAutoDemo) {
      demoInterval = setInterval(() => {
        // Simulate user typing
        const demoQuestions = ["Tình trạng Node T-1092?", "Dự báo thời tiết?", "Lên lịch bảo trì?"];
        const randomQ = demoQuestions[Math.floor(Math.random() * demoQuestions.length)];
        
        // Add user msg
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: randomQ }]);
        
        // Add AI response after delay
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            sender: 'ai', 
            text: `Phân tích ${randomQ}: Dữ liệu từ 4 cảm biến cho thấy tình trạng Ổn định. Độ lệch chuẩn 0.4%.` 
          }]);
        }, 1000);

      }, 8000); // Chat every 8 seconds
    }
    return () => clearInterval(demoInterval);
  }, [isAutoDemo]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    
    // Fake AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'Đã nhận lệnh. Đang phân tích dữ liệu từ cảm biến MPU6050 tại Node T-1092... Dự báo khả năng đổ trong 30 phút tới là 89% nếu gió giật cấp 6.' 
      }]);
    }, 1500);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <GlassCard className="flex flex-col h-full !p-0" noPadding>
      <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center animate-pulse-slow">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Gemini Analysis</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar max-h-[300px] lg:max-h-none">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10 focus-within:border-emerald-500/50 transition-colors">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi Gemini về tình trạng cây..." 
            className="bg-transparent border-none outline-none text-sm text-white px-3 py-2 flex-1 placeholder-slate-500"
          />
          <button 
            onClick={handleSend}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-[0_0_10px_rgba(16,185,129,0.4)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

// 5. Simulated Map Widget with Radar Effect
const MapWidget = () => (
  <GlassCard className="h-full relative group !p-0 overflow-hidden" noPadding>
    <div className="absolute inset-0 bg-slate-800">
      {/* Fake Map Grid */}
      <div className="w-full h-full opacity-20" style={{ 
        backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>

      {/* Radar Scan Effect */}
      <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 w-[100vh] h-[100vh] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent rotate-45 animate-[spin_4s_linear_infinite] pointer-events-none"></div>
      
      {/* Simulated Nodes */}
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)] animate-pulse group/node">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-emerald-400 text-[10px] px-2 py-1 rounded opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-emerald-500/30">
          Node T-001: Ổn định
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)] animate-bounce z-10 cursor-pointer">
        <div className="absolute -top-10 -left-10 bg-red-500/20 text-red-200 text-[10px] px-3 py-1.5 rounded-lg border border-red-500/50 backdrop-blur-md whitespace-nowrap flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 text-red-400" />
          <span>Cảnh báo: T-1092 (Nghiêng)</span>
        </div>
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
      </div>

      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
      
      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 z-20">
        <button className="bg-slate-900/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-2">
          <Wifi className="w-3 h-3" />
          LoRaWAN Connected
        </button>
        <button className="bg-emerald-500/10 backdrop-blur border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          Live Monitoring
        </button>
      </div>
    </div>
  </GlassCard>
);

// 6. Boot Screen Component
const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Initializing System...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Random progress jump
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    const texts = [
      "Loading Modules...",
      "Connecting to LoRaWAN Gateway...",
      "Calibrating MPU6050 Sensors...",
      "Syncing with Gemini AI...",
      "System Ready."
    ];

    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex++;
      if (textIndex < texts.length) setText(texts[textIndex]);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0f172a] z-[100] flex flex-col items-center justify-center text-emerald-500">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <TreeDeciduous className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-emerald-400" />
      </div>
      <div className="font-mono text-2xl font-bold tracking-widest mb-2">GREEN SAFE</div>
      <div className="font-mono text-sm text-emerald-400/70 mb-6">{text}</div>
      
      <div className="w-64 h-1 bg-emerald-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-400 transition-all duration-200 ease-out shadow-[0_0_10px_rgba(16,185,129,0.6)]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 font-mono text-xs text-emerald-600">{progress}%</div>
    </div>
  );
};

// 7. Poster Generator Component (Updated Design for Reference)
const PosterGenerator = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#020617] overflow-auto animate-in zoom-in-95 duration-300">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 p-2 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 rounded-full z-50 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="min-h-screen p-4 lg:p-8 flex items-center justify-center overflow-x-auto">
        {/* POSTER CONTAINER - Size A0 (approx ratio) */}
        <div className="w-[1000px] min-w-[1000px] bg-[#042f2e] relative shadow-2xl overflow-hidden text-white font-sans select-none border-8 border-white/5">
          
          {/* --- Background Elements --- */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
          {/* Gradient Orbs */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[100px]"></div>

          {/* --- HEADER --- */}
          <div className="relative z-10 pt-10 px-12 pb-8 text-center">
            {/* Top Logos */}
            <div className="flex justify-between items-end mb-6 border-b border-emerald-500/30 pb-4">
               <div className="flex gap-3">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-blue-900 shadow-lg">LOGO<br/>BTC</div>
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-red-600 shadow-lg">LOGO<br/>UIT</div>
               </div>
               <div className="text-emerald-200 tracking-[0.3em] uppercase text-xs font-bold mb-2">
                 Khoa Hệ thống Thông tin - UIT
               </div>
            </div>

            {/* Main Title Block */}
            <div className="flex flex-col items-center">
              <h1 className="text-[100px] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-300 drop-shadow-[0_0_25px_rgba(16,185,129,0.6)] font-[Arial]">
                AISC 2025
              </h1>
              
              <div className="mt-8 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative bg-[#022c22] border border-emerald-500/50 px-16 py-4 rounded-xl shadow-2xl">
                   <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                     GREEN SAFE
                   </h2>
                   <p className="text-emerald-400 text-sm tracking-widest uppercase mt-1 font-medium">
                     Smart Urban Tree Monitoring System
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- BODY GRID --- */}
          <div className="relative z-10 px-12 pb-12 grid grid-cols-12 gap-6">
            
            {/* COLUMN 1: Problem & Solution */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* DAT VAN DE */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg text-red-400 border border-red-500/20">
                       <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">ĐẶT VẤN ĐỀ</h3>
                 </div>
                 <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex gap-2">
                       <span className="text-red-400 font-bold">•</span>
                       Mưa bão gây gãy đổ cây, thiệt hại lớn.
                    </li>
                    <li className="flex gap-2">
                       <span className="text-red-400 font-bold">•</span>
                       Quản lý thủ công, thiếu dữ liệu.
                    </li>
                    <li className="flex gap-2">
                       <span className="text-red-400 font-bold">•</span>
                       Phản ứng chậm khi có sự cố.
                    </li>
                 </ul>
              </div>

              {/* GIAI PHAP */}
              <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 flex-1 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb className="w-20 h-20 text-emerald-400" />
                 </div>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/20">
                       <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-300">GIẢI PHÁP</h3>
                 </div>
                 <div className="text-sm text-slate-300 space-y-4">
                    <p>Hệ thống <strong>IoT + AI</strong> giám sát thời gian thực độ nghiêng & rung chấn.</p>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="bg-emerald-900/40 p-2 rounded text-center border border-emerald-500/20">
                          <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                          <span className="text-[10px]">Mobile App</span>
                       </div>
                       <div className="bg-emerald-900/40 p-2 rounded text-center border border-emerald-500/20">
                          <Bot className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                          <span className="text-[10px]">Gemini AI</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* COLUMN 2: Main Visual / Architecture */}
            <div className="col-span-4 flex flex-col">
               <div className="bg-gradient-to-b from-emerald-900/40 to-[#022c22] border border-emerald-500/30 rounded-2xl p-1 h-full relative flex items-center justify-center">
                  {/* Central Diagram Representation */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                     <div className="w-32 h-32 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center relative animate-pulse">
                        <TreeDeciduous className="w-16 h-16 text-emerald-400" />
                        {/* Orbiting Dots */}
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                     </div>
                     <div className="h-16 w-0.5 bg-gradient-to-b from-emerald-400 to-transparent"></div>
                     <div className="grid grid-cols-2 gap-4 w-full mt-2">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                           <div className="text-xs font-bold text-emerald-300 mb-1">SENSOR</div>
                           <div className="text-[10px] text-slate-400">MPU6050 + ESP32</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                           <div className="text-xs font-bold text-emerald-300 mb-1">SERVER</div>
                           <div className="text-[10px] text-slate-400">Cloud Analysis</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* COLUMN 3: Strategy & Values */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* CHIEN LUOC */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-500/20">
                       <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">CHIẾN LƯỢC</h3>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                       <span className="text-slate-300">Hạ tầng</span>
                       <span className="text-emerald-400 font-bold">LoRaWAN</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                       <span className="text-slate-300">Nền tảng</span>
                       <span className="text-emerald-400 font-bold">Web Dashboard</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-300">Xử lý</span>
                       <span className="text-emerald-400 font-bold">Big Data</span>
                    </div>
                 </div>
              </div>

              {/* GIA TRI XA HOI */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 flex-1 text-white shadow-lg relative overflow-hidden">
                 <div className="absolute -bottom-4 -right-4 text-white/10">
                    <Users className="w-32 h-32" />
                 </div>
                 <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    GIÁ TRỊ XÃ HỘI
                 </h3>
                 <p className="text-sm leading-relaxed text-emerald-50">
                    Đảm bảo an toàn tính mạng cho người dân. Hỗ trợ chính quyền quy hoạch đô thị thông minh, tiết kiệm ngân sách và bảo vệ lá phổi xanh thành phố.
                 </p>
              </div>
            </div>

            {/* BOTTOM: Screenshots */}
            <div className="col-span-12 mt-2">
               <div className="bg-black/30 rounded-xl p-4 border border-white/10 flex items-end gap-4">
                  <div className="flex-1">
                     <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Giao diện hệ thống</div>
                     <div className="grid grid-cols-3 gap-4">
                        <img src="https://placehold.co/300x180/064e3b/10b981?text=Map+Dashboard" className="rounded-lg border border-white/10 opacity-90" />
                        <img src="https://placehold.co/300x180/064e3b/3b82f6?text=Tree+Data" className="rounded-lg border border-white/10 opacity-90" />
                        <img src="https://placehold.co/300x180/064e3b/f43f5e?text=Alert+App" className="rounded-lg border border-white/10 opacity-90" />
                     </div>
                  </div>
                  <div className="w-48 shrink-0 text-right">
                     <div className="text-sm font-bold text-white mb-1">Team Green Safe</div>
                     <div className="flex justify-end gap-1">
                        {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full bg-slate-600 border border-white/30"></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [booted, setBooted] = useState(false);
  const [isAutoDemo, setIsAutoDemo] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  // Auto Demo Logic
  useEffect(() => {
    let interval: any;
    if (isAutoDemo) {
      const tabs = ['dashboard', 'map', 'devices', 'alerts'];
      let currentIndex = tabs.indexOf(activeTab);
      
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabs.length;
        setActiveTab(tabs[currentIndex]);
      }, 5000); // Switch tabs every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoDemo, activeTab]);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200 selection:bg-emerald-500/30 animate-in fade-in duration-700">
      {showPoster && <PosterGenerator onClose={() => setShowPoster(false)} />}

      {/* Background Ambient Light */}
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onToggleAutoDemo={() => setIsAutoDemo(!isAutoDemo)}
        isAutoDemo={isAutoDemo}
        onOpenPoster={() => setShowPoster(true)}
      />

      <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-screen relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Dashboard
              <span className="text-emerald-500">.</span>
            </h1>
            <p className="text-slate-400 text-sm">Chào mừng trở lại, Admin. Hệ thống đang hoạt động ổn định.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative group flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full md:w-64 pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-white/5 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-white/10 focus:border-emerald-500/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 sm:text-sm transition-all duration-200"
                placeholder="Tìm kiếm Node, Khu vực..."
              />
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-300" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Tổng số cây giám sát" 
            value="42,593" 
            subtext="Trên 12 Quận/Huyện" 
            icon={TreeDeciduous} 
            trend="+125 tuần này"
            color="emerald"
          />
          <StatCard 
            title="Cảnh báo rủi ro" 
            value="03" 
            subtext="Cần xử lý ngay lập tức" 
            icon={AlertTriangle} 
            trend="Cao"
            color="red"
          />
          <StatCard 
            title="Tốc độ gió trung bình" 
            value="12 km/h" 
            subtext="Hướng Đông Nam" 
            icon={Wind} 
            color="blue"
          />
          <StatCard 
            title="Tỉ lệ an toàn" 
            value="99.8%" 
            subtext="Dựa trên AI Prediction" 
            icon={ShieldCheck} 
            trend="Ổn định"
            color="violet"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[600px] lg:h-[500px]">
          {/* Main Map Area (Takes 2 columns) */}
          <div className="lg:col-span-2 h-full">
             <MapWidget />
          </div>
          
          {/* AI Chat Sidebar (Takes 1 column) */}
          <div className="h-full">
            <AIChatWidget isAutoDemo={isAutoDemo} />
          </div>
        </div>

        {/* Recent Alerts Table */}
        <GlassCard className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Cảnh báo thời gian thực
            </h3>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Xem tất cả
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pl-2 font-medium">Mã cây</th>
                  <th className="pb-3 font-medium">Vị trí</th>
                  <th className="pb-3 font-medium">Loại cảnh báo</th>
                  <th className="pb-3 font-medium">Mức độ rủi ro</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                  <th className="pb-3 font-medium text-right pr-2">Thời gian</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {ALERTS.map((alert) => (
                  <tr key={alert.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                    <td className="py-4 pl-2 font-mono text-slate-300 group-hover:text-white">{alert.treeId}</td>
                    <td className="py-4 text-slate-400">{alert.location}</td>
                    <td className="py-4 text-slate-300">{alert.type}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${alert.risk > 80 ? 'bg-red-500' : alert.risk > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${alert.risk}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-400">{alert.risk}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        alert.status === 'CRITICAL' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : alert.status === 'WARNING'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2 text-slate-500 font-mono text-xs">{alert.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);