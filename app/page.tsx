'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, LabelList
} from 'recharts';
import { 
  TrendingDown, TrendingUp, ShieldAlert, Target, ShieldCheck, 
  Users, CheckCircle2, AlertTriangle, Lightbulb, CalendarClock, 
  Rocket, Presentation, Activity, Award, BookOpen, Clock, HeartHandshake, Briefcase,
  ChevronRight, Sparkles, PieChart as PieChartIcon, Table, PlusCircle, Shield, CheckSquare, Trash2, RefreshCcw, Book, Newspaper,
  FileDown, Loader2
} from 'lucide-react';
import { Toaster } from 'sonner';
import { useExportPDF } from '@/hooks/use-export-pdf';

// --- DATA ---
const marginData = [
  { name: '2023', margen: -27 },
  { name: '2024', margen: 21 },
  { name: '2025', margen: 40 },
  { name: 'POA 2026', margen: 46 },
  { name: 'Proy. 2026', margen: 48 },
  { name: '1Q 2026', margen: 71 },
];

// --- CUSTOM COMPONENTS PARA GRAFICOS ---
const CustomPercentageLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const isNegative = value < 0;
  const labelY = isNegative ? y + height + 65 : y - 20;
  
  return (
    <text 
      x={x + width / 2} 
      y={labelY} 
      fill={isNegative ? "#ef4444" : "#2563eb"} 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontWeight="900" 
      fontSize="16"
    >
      {value}%
    </text>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  disabled?: boolean;
}

interface ListItemProps {
  icon: React.ReactNode;
  text: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  color: 'sky' | 'red';
}

interface ActionNodeProps {
  number: string;
  title?: string;
  text: string;
}

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface InnovationCardProps {
  text: string;
  className?: string;
  delay?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const taskRefs = useRef<(HTMLDivElement | null)[]>([]);

  const TOTAL_TASKS = 6;

  const { exportPDF, isExporting, progress } = useExportPDF({
    taskRefs,
    setActiveTab,
    totalTasks: TOTAL_TASKS,
  });

  const setTaskRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    taskRefs.current[index] = el;
  }, []);

  const handleExport = useCallback(async () => {
    const currentTab = activeTab;
    try {
      await exportPDF();
    } catch {
      // Error is already shown as a toast inside useExportPDF
    } finally {
      setActiveTab(currentTab);
    }
  }, [activeTab, exportPDF, setActiveTab]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800 overflow-x-hidden selection:bg-sky-300 selection:text-slate-900">
      <Toaster richColors position="top-right" />
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
           style={{ backgroundImage: 'radial-gradient(#0A192F 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-sky-300/30 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-[320px] bg-gradient-to-b from-[#0A192F] to-[#040e1f] text-white shadow-[10px_0_30px_rgba(10,25,47,0.15)] flex flex-col z-20 relative border-r border-white/5">
        <div className="p-10 flex flex-col items-center relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50"></div>
          
          {/* Logo with pulse effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative w-28 h-28 bg-[#0A192F] border-2 border-sky-400/30 rounded-full flex items-center justify-center shadow-2xl mb-6 transform transition-transform group-hover:scale-105">
              <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-sky-100 to-sky-400">UPDS</span>
            </div>
          </div>
          
          <h1 className="text-center font-extrabold text-xl leading-tight text-white tracking-wide">
            Universidad Privada<br/>Domingo Savio
          </h1>
          <div className="flex items-center gap-2 mt-3 bg-sky-900/30 px-4 py-1.5 rounded-full border border-sky-400/20">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></div>
            <p className="text-sky-300 text-xs font-bold tracking-widest uppercase">Sede Cobija</p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-4 mt-2">
          <NavButton 
            active={activeTab === 1} onClick={() => setActiveTab(1)} disabled={isExporting}
            icon={<Activity size={22} />} title="Tarea 1" subtitle="Foco en el Margen" 
          />
          <NavButton 
            active={activeTab === 2} onClick={() => setActiveTab(2)} disabled={isExporting}
            icon={<HeartHandshake size={22} />} title="Tarea 2" subtitle="Retención de Clientes" 
          />
          <NavButton 
            active={activeTab === 3} onClick={() => setActiveTab(3)} disabled={isExporting}
            icon={<Book size={22} />} title="Tarea 3" subtitle="Libro de Estrategia" 
          />
          <NavButton 
            active={activeTab === 4} onClick={() => setActiveTab(4)} disabled={isExporting}
            icon={<Lightbulb size={22} />} title="Tarea 4" subtitle="Cultura Innovadora" 
          />
          <NavButton 
            active={activeTab === 5} onClick={() => setActiveTab(5)} disabled={isExporting}
            icon={<RefreshCcw size={22} />} title="Tarea 5" subtitle="Rueda de Desarrollo" 
          />
          <NavButton 
            active={activeTab === 6} onClick={() => setActiveTab(6)} disabled={isExporting}
            icon={<Newspaper size={22} />} title="Tarea 6" subtitle="Visión 360" 
          />
        </nav>

        <div className="p-8 text-xs text-center text-slate-500 font-medium">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>
          Presentación Ejecutiva Estratégica <br/> <span className="text-sky-400/70">Visión 2026</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-10 relative z-10 scroll-smooth">
        <div className={`max-w-6xl mx-auto transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {activeTab === 1 && <div ref={setTaskRef(0)}><Task1 /></div>}
          {activeTab === 2 && <div ref={setTaskRef(1)}><Task2 /></div>}
          {activeTab === 3 && <div ref={setTaskRef(2)}><Task3 /></div>}
          {activeTab === 4 && <div ref={setTaskRef(3)}><Task4 /></div>}
          {activeTab === 5 && <div ref={setTaskRef(4)}><Task5 isExporting={isExporting} /></div>}
          {activeTab === 6 && <div ref={setTaskRef(5)}><Task6 /></div>}
        </div>
      </main>
    </div>
  );
}

// --- COMPONENTS ---

function NavButton({ active, onClick, icon, title, subtitle, disabled }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden text-left ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${
        active 
          ? 'bg-gradient-to-r from-blue-600/90 to-sky-500/90 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-white border border-sky-400/30' 
          : 'hover:bg-white/5 text-slate-400 hover:text-white border border-transparent'
      }`}
    >
      {/* Hover glow effect background */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] ${active ? 'hidden' : 'block'}`}></div>
      
      <div className={`mr-4 p-2.5 rounded-xl transition-all duration-300 relative z-10 ${
        active 
          ? 'bg-white text-blue-600 shadow-inner scale-110' 
          : 'bg-[#0F2A4A] group-hover:bg-[#1a3a63] group-hover:scale-110 text-sky-400/70 group-hover:text-sky-300'
      }`}>
        {icon}
      </div>
      <div className="relative z-10 flex-1">
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 transition-colors ${active ? 'text-sky-100' : 'text-slate-500 group-hover:text-sky-400/70'}`}>
          {title}
        </div>
        <div className={`font-bold text-sm tracking-wide ${active ? 'text-white' : 'text-slate-300'}`}>
          {subtitle}
        </div>
      </div>
      {active && <ChevronRight size={18} className="text-white/70 absolute right-4 opacity-50" />}
    </button>
  );
}

// --- TASK 1: FOCO EN EL MARGEN ---
function Task1() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
      <header className="mb-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} /> Prioridad Estratégica
        </div>
        <h2 className="text-5xl font-black text-[#0A192F] flex items-center gap-4 tracking-tight">
          Foco en el Margen
        </h2>
        <p className="text-slate-500 mt-4 text-xl font-medium border-l-4 border-blue-500 pl-5 max-w-3xl leading-relaxed">
          El margen es prioridad. Necesitamos <span className="text-blue-600 font-bold">entenderlo</span>, <span className="text-blue-600 font-bold">defenderlo</span> y <span className="text-blue-600 font-bold">gestionarlo</span> activamente.
        </p>
      </header>

      {/* Chart Section */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white transition-all hover:shadow-[0_20px_50px_-12px_rgba(14,165,233,0.15)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-[#0A192F]"></div>
        <h3 className="text-2xl font-black text-[#0A192F] mb-12 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><TrendingUp size={24} /></div>
          Evolución del Margen (2023 - 2026)
        </h3>
        
        <div className="h-[380px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marginData} margin={{ top: 40, right: 30, left: -20, bottom: 90 }}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.9}/>
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#b91c1c" stopOpacity={0.9}/>
                </linearGradient>
                <linearGradient id="colorHighlight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} height={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', color: '#0A192F', padding: '12px 20px' }}
                itemStyle={{ color: '#2563eb' }}
                formatter={(value: number) => [`${value}%`, 'Margen']}
              />
              <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
              <Bar dataKey="margen" radius={[8, 8, 8, 8]} animationDuration={2000} minPointSize={5}>
                {marginData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.margen < 0 ? 'url(#colorNegative)' : entry.name === '1Q 2026' ? 'url(#colorHighlight)' : 'url(#colorPositive)'} 
                  />
                ))}
                <LabelList 
                  dataKey="name" 
                  position="center" 
                  angle={-90}
                  fill="#ffffff" 
                  fontWeight="bold" 
                  fontSize={14}
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }} 
                />
                <LabelList 
                  dataKey="margen" 
                  content={<CustomPercentageLabel />}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-slate-200 shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col">
          <div className="absolute -right-6 -top-6 text-slate-100 opacity-50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
            <TrendingDown size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 shrink-0 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
                <TrendingDown size={24} />
              </div>
              <h4 className="font-extrabold text-lg text-[#0A192F] leading-tight">Factores que presionan el margen</h4>
            </div>
            <ul className="space-y-5">
              <ListItem icon={<Users/>} text="La relación alumnos por grupo" />
              <ListItem icon={<Briefcase/>} text="Docentes de prácticas externas" />
              <ListItem icon={<Award/>} text="Costos docentes especialistas" />
            </ul>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-slate-200 shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col">
          <div className="absolute -right-6 -top-6 text-slate-100 opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
            <ShieldAlert size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 shrink-0 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner">
                <ShieldAlert size={24} />
              </div>
              <h4 className="font-extrabold text-lg text-[#0A192F] leading-tight">Factores que limitan el crecimiento de ingresos</h4>
            </div>
            <ul className="space-y-5">
              <ListItem icon={<Target/>} text="Tendencia a saturación de mercado geográfico principal (ACRE)" />
              <ListItem icon={<TrendingUp/>} text="Competencia" />
              <ListItem icon={<BookOpen/>} text="Acreditación MERCOSUR" />
            </ul>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-br from-[#0A192F] via-[#0d2342] to-blue-900 rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(10,25,47,0.5)] border border-blue-800 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col">
          <div className="absolute -right-6 -top-6 text-blue-800/40 opacity-50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
            <ShieldCheck size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-extrabold text-lg text-white leading-tight">Medidas concretas para defender el margen</h4>
            </div>
            <ul className="space-y-4">
              <ListItemDark text="Manejo detallado de distribución de alumnos por grupo" />
              <ListItemDark text="Tamaño de aulas de infraestructura nueva - 50 estudiantes" />
              <ListItemDark text="Cobros por prácticas externas" />
              <ListItemDark text="Cobro por materia reprobada" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TASK 2: RETENCIÓN ---
function Task2() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700 fill-mode-both">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Users size={14} /> Objetivo Crítico
        </div>
        <h2 className="text-5xl font-black text-[#0A192F] flex items-center gap-4 tracking-tight">
          Misión: Ni un cliente menos
        </h2>
        <p className="text-slate-500 mt-4 text-xl font-medium border-l-4 border-sky-400 pl-5 max-w-3xl leading-relaxed">
          La retención no es negociable. La experiencia del cliente debe ser <span className="text-sky-600 font-bold">consistente</span> y de <span className="text-sky-600 font-bold">alto nivel</span>.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Potencian */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-100 to-transparent rounded-bl-full -z-0 opacity-60"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-[#0A192F] flex items-center gap-3 mb-8">
              <div className="p-2 bg-sky-100 text-sky-600 rounded-xl shrink-0"><CheckCircle2 size={24} /></div> 
              Factores que potencian la retención
            </h3>
            <div className="space-y-4">
              <FeatureCard 
                icon={<Clock />} title="Oferta horarios sin puente" color="sky"
              />
              <FeatureCard 
                icon={<Activity />} title="Seguimiento y control académico continuo a docentes y alumnos" color="sky"
              />
              <FeatureCard 
                icon={<HeartHandshake />} title="Atención administrativa - académica bilingüe" color="sky"
              />
            </div>
          </div>
        </div>

        {/* Perjudican */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full -z-0 opacity-60"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-[#0A192F] flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-100 text-red-500 rounded-xl shrink-0"><AlertTriangle size={24} /></div> 
              Factores que perjudican la retención
            </h3>
            <div className="space-y-4">
              <FeatureCard 
                icon={<ShieldAlert />} title="Falta de acreditación MERCOSUR" color="red"
              />
              <FeatureCard 
                icon={<BookOpen />} title="Riguroso control del reglamento" color="red"
              />
              <FeatureCard 
                icon={<CalendarClock />} title="Trámites de inscripción y pagos burocráticos" color="red"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medidas Concretas - Enhanced connected design */}
      <div className="bg-[#0A192F] rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(10,25,47,0.6)] relative overflow-hidden mt-10 border border-blue-900/50">
        {/* Decorative Grid Background inside the dark card */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <Target className="text-sky-400" size={32} />
            </div>
            Medidas concretas para no perder clientes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-800 via-sky-400 to-blue-800 opacity-50 z-0"></div>

            <ActionNode 
              number="01"
              text="Divulgación sobre características de acreditación MERCOSUR e implementación de la sede Santa Cruz"
            />
            <ActionNode 
              number="02"
              text="Divulgación masiva y amigable del reglamento"
            />
            <ActionNode 
              number="03"
              text="Adecuación del SAADS al sistema semestral y a las características de clientes de la sede Cobija"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TASK 3: LIBRO DE ESTRATEGIA ---
function Task3() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700 fill-mode-both">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Book size={14} /> Gestión Estratégica
        </div>
        <h2 className="text-5xl font-black text-[#0A192F] flex items-center gap-4 tracking-tight">
          Libro de Estrategia 2026
        </h2>
        <p className="text-slate-500 mt-4 text-xl font-medium border-l-4 border-sky-400 pl-5 max-w-3xl leading-relaxed">
          Necesitamos <span className="text-sky-600 font-bold">disciplina estratégica real</span>, no solo un documento de archivo.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Estado */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -z-0"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0A192F] mb-6">Estado Actual</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="text-sky-500 shrink-0 mt-0.5" size={20} />
                <span className="text-slate-600 font-medium leading-snug">Definición estratégica completa en todas las áreas (direcciones) para el 2026.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="text-sky-500 shrink-0 mt-0.5" size={20} />
                <span className="text-slate-600 font-medium leading-snug">Implementación de Cuadro de mando (Excel).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Trabajo */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0A192F] mb-6">Metodología</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="text-sky-500 shrink-0 mt-0.5" size={20} />
                <span className="text-slate-600 font-medium leading-snug">Se revisará y analizará en equipo.</span>
              </li>
              <li className="flex gap-3">
                <CalendarClock className="text-sky-500 shrink-0 mt-0.5" size={20} />
                <span className="text-slate-600 font-medium leading-snug">Frecuencia de seguimiento <strong className="text-blue-700">trimestral</strong>.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3: Ajustes */}
        <div className="bg-gradient-to-br from-[#0A192F] to-blue-900 rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(10,25,47,0.5)] border border-blue-800 text-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              <Activity size={28} />
            </div>
            <h3 className="text-2xl font-black text-white mb-6">Ajustes Recientes</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
                <Sparkles className="text-sky-400 shrink-0 mt-0.5" size={20} />
                <span className="text-sky-50 font-medium leading-relaxed">
                  Adecuación del libro al POA aprobado 2026.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TASK 4: CULTURA INNOVADORA ---
function Task4() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700 fill-mode-both">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Lightbulb size={14} /> Visión de Futuro
        </div>
        <h2 className="text-5xl font-black text-[#0A192F] flex items-center gap-4 tracking-tight">
          Cultura Innovadora
        </h2>
        <p className="text-slate-500 mt-4 text-xl font-medium border-l-4 border-sky-400 pl-5 max-w-3xl leading-relaxed">
          La innovación tiene que verse en <span className="text-sky-600 font-bold">acciones concretas</span>, medibles y ejecutables en el corto plazo.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 1Q2026 - Timeline Style */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl border border-slate-100 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Presentation size={150} />
          </div>
          
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-[#0A192F] flex items-center gap-3">
              1Q - Iniciativas implementadas
            </h3>
            <span className="bg-sky-100 text-sky-700 text-xs font-bold px-4 py-1.5 rounded-full border border-sky-200 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-500"></div> Ejecutado
            </span>
          </div>
          
          <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-sky-400 before:to-slate-200">
            <TimelineItem 
              icon={<CalendarClock />} 
              title="Sistema de Aulas y Horarios" 
              desc="Búsqueda optimizada y en tiempo real para estudiantes y docentes." 
            />
            <TimelineItem 
              icon={<Rocket />} 
              title="Expansión de Mercado Perú" 
              desc="Inicio activo de promoción y divulgación en este nuevo mercado." 
            />
            <TimelineItem 
              icon={<Activity />} 
              title="Sala Quirúrgica" 
              desc="Implementación de una sala quirúrgica para practicas de la materia de cirugía I y cirugía II." 
            />
          </div>
        </div>

        {/* 2Q2026 - Glassmorphism Grid */}
        <div className="bg-gradient-to-br from-[#0A192F] to-[#0f2a52] rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(10,25,47,0.5)] text-white relative overflow-hidden border border-blue-800/50">
          {/* Glowing orbs inside card */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500 rounded-full blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
          
          <div className="relative z-10 flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              2Q - Impulso a la innovación
            </h3>
            <span className="bg-blue-900/50 text-sky-300 text-xs font-bold px-4 py-1.5 rounded-full border border-sky-500/30 flex items-center gap-2 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div> En Proceso
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <InnovationCard text="Tabla anatómica anatomage" delay="0" />
            <InnovationCard text="Oficina de ventas virtual" delay="100" />
            <InnovationCard text="Sistema control pago docente" delay="200" />
            <InnovationCard text="Sistema gestión horario/aulas" delay="300" />
            <InnovationCard text="Inventario activos y uniformes (Excel)" delay="400" />
            <InnovationCard text="Sala simulación ginecológica" delay="500" />
            <InnovationCard text="Sala simulación neonato-pediátrica" delay="600" className="sm:col-span-2 text-center justify-center bg-sky-900/40 border-sky-400/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function ListItem({ icon, text }: ListItemProps) {
  return (
    <li className="flex items-start gap-4 group cursor-default">
      <div className="mt-0.5 bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300 shadow-sm">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
      </div>
      <span className="text-[#0A192F] font-semibold text-sm leading-snug pt-1.5 group-hover:text-blue-700 transition-colors">{text}</span>
    </li>
  );
}

function ListItemDark({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-4 group cursor-default bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
      <CheckCircle2 className="text-sky-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform" size={20} />
      <span className="text-sky-50 font-medium text-sm leading-relaxed">{text}</span>
    </li>
  );
}

function FeatureCard({ icon, title, desc, color }: FeatureCardProps) {
  const isSky = color === 'sky';
  const bgColors = isSky ? 'bg-sky-50 hover:bg-sky-100 border-sky-100' : 'bg-red-50 hover:bg-red-100 border-red-100';
  const iconColors = isSky ? 'bg-white text-sky-500 shadow-sky-200/50' : 'bg-white text-red-500 shadow-red-200/50';
  const titleColor = isSky ? 'text-[#0A192F]' : 'text-[#0A192F]';
  const descColor = isSky ? 'text-slate-600' : 'text-slate-600';

  return (
    <div className={`p-5 rounded-2xl flex gap-5 items-center transition-all duration-300 border ${bgColors} hover:shadow-lg transform hover:-translate-y-1`}>
      <div className={`p-3.5 rounded-xl shrink-0 h-fit shadow-md ${iconColors} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-bold text-sm md:text-base leading-snug ${titleColor}`}>{title}</h4>
        {desc && <p className={`text-sm mt-1.5 leading-relaxed ${descColor}`}>{desc}</p>}
      </div>
    </div>
  );
}

function ActionNode({ number, title, text }: ActionNodeProps) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
      {/* Node circle */}
      <div className="w-16 h-16 bg-[#0A192F] rounded-full border-4 border-[#0A192F] flex items-center justify-center text-xl font-black text-white relative z-10 shadow-[0_0_0_2px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_0_4px_rgba(56,189,248,0.8)] group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-[#0A192F] to-blue-900 shrink-0">
        {number}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(56,189,248,0.4)]"></div>
      </div>
      
      {/* Content */}
      <div className="mt-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:bg-white/10 group-hover:border-sky-400/30 transition-all duration-300 h-full w-full relative overflow-hidden flex flex-col justify-center">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {title && <h4 className="text-sky-300 font-bold mb-3 text-lg">{title}</h4>}
        <p className={`text-slate-300 leading-relaxed font-medium ${title ? 'text-sm' : 'text-base'}`}>{text}</p>
      </div>
    </div>
  );
}

function TimelineItem({ icon, title, desc }: TimelineItemProps) {
  return (
    <div className="relative group">
      {/* Node Point */}
      <div className="absolute -left-[45px] top-1.5 w-7 h-7 bg-white border-4 border-sky-200 rounded-full flex items-center justify-center group-hover:border-sky-500 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300 z-10">
        <div className="w-2 h-2 bg-sky-500 rounded-full group-hover:scale-150 transition-transform"></div>
      </div>
      
      {/* Content */}
      <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-lg group-hover:border-sky-100 transition-all duration-300 transform group-hover:translate-x-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-sky-500 bg-sky-50 p-1.5 rounded-lg">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
          </div>
          <h4 className="font-extrabold text-[#0A192F] text-lg">{title}</h4>
        </div>
        <p className="text-sm text-slate-500 font-medium leading-relaxed pl-10">{desc}</p>
      </div>
    </div>
  );
}

function InnovationCard({ text, className = "", delay }: InnovationCardProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 hover:border-sky-400/40 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-default group ${className}`}>
      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] group-hover:scale-150 group-hover:bg-white transition-all shrink-0"></div>
      <span className="text-sm font-semibold text-sky-50 leading-snug">{text}</span>
    </div>
  );
}

// --- TASK 5: RUEDA DE DESARROLLO ---

const wheelDataMap: Record<string, any> = {
  REMOVER: {
    name: 'REMOVER', color: '#0A192F', icon: <Trash2 size={20}/>, title: 'Eliminar / Reducir',
    focus: 'Elementos negativos que frenan nuestro avance y debemos erradicar.',
    items: [
      { t: 'Centralización de Decisiones', d: 'Reducir la concentración de aprobaciones en la Rectoría, delegando procesos operativos para ganar agilidad.', emoji: '⏳', short: 'Centralización de Decisiones' },
      { t: 'Procesos de comunicación interno', d: 'Eliminar los silos de información entre las áreas académicas y administrativas mediante el nuevo sistema de comunicación formal.', emoji: '⚠️', short: 'Procesos de comunicación interno' },
      { t: 'Sobrecarga Operativa Manual', d: 'Reducir el trabajo administrativo repetitivo mediante la digitalización y el uso estratégico de herramientas de IA en la gestión.', emoji: '⏳', short: 'Sobrecarga Operativa Manual' },
      { t: 'Extensión en proyectos de impacto local', d: 'Eliminar la baja participación en proyectos de impacto local, activando la vinculación con el sector salud de Cobija.', emoji: '✅', short: 'Extensión en proyectos de impacto local' }
    ]
  },
  CREAR: {
    name: 'CREAR', color: '#38bdf8', icon: <PlusCircle size={20}/>, title: 'Agregar / Inventar',
    focus: 'Elementos positivos que sumamos para el futuro de la sede.',
    items: [
      { t: 'Integración Tecnológica FinTech', d: 'Implementar la pasarela de pagos PIX para el mercado brasileño, eliminando fricciones en la recaudación.', emoji: '⏳', short: 'Integración Tecnológica FinTech' },
      { t: 'Comité de investigación biomédica', d: 'Creación del Comité de Investigación Biomédica para vincular la carrera de Medicina con la salud regional amazónica.', emoji: '⚠️', short: 'Comité de investigación biomédica' },
      { t: 'Centro de Formación Continua', d: 'Lanzamiento del Centro de Formación Continua y la Academia de Idiomas para diversificar los ingresos más allá del pregrado.', emoji: '⚠️', short: 'Centro de Formación Continua' },
      { t: 'Nuevos Mercados', d: 'Ejecución de la estrategia de captación en los nodos fronterizos de Madre de Dios (Perú) y Rondonia (Brasil).', emoji: '✅', short: 'Nuevos Mercados' }
    ]
  },
  PRESERVAR: {
    name: 'PRESERVAR', color: '#2563eb', icon: <Shield size={20}/>, title: 'Mantener / Mejorar',
    focus: 'Lo positivo que es nuestra "salsa secreta" y no debe descuidarse.',
    items: [
      { t: 'Oferta Horaria Diferenciada', d: 'Mantener la flexibilidad de horarios, que es el factor #1 de nuestra ventaja competitiva frente a la competencia local.', emoji: '✅', short: 'Oferta Horaria Diferenciada' },
      { t: 'Cercanía y Fidelización', d: 'Consolidar la tasa de baja deserción mediante el modelo de atención al cliente y acompañamiento estudiantil.', emoji: '✅', short: 'Cercanía y Fidelización' },
      { t: 'Disciplina Financiera', d: 'Preservar el equilibrio operativo y la política de compras anticipadas para mitigar la volatilidad cambiaria.', emoji: '✅', short: 'Disciplina Financiera' },
      { t: 'Cultura de Adaptabilidad bilingüe', d: 'Fomentar la resiliencia del equipo docente que ha demostrado una gran capacidad de ajuste al entorno bilingüe.', emoji: '⏳', short: 'Cultura de Adaptabilidad bilingüe' }
    ]
  },
  ACEPTAR: {
    name: 'ACEPTAR', color: '#0ea5e9', icon: <CheckSquare size={20}/>, title: 'Hacer las paces / Mitigar',
    focus: 'Factores negativos que no podemos cambiar, pero debemos gestionar con sabiduría.',
    items: [
      { t: 'Dependencia del Mercado Brasileño', d: 'Aceptar que el 90% de nuestra matrícula es internacional; en lugar de verlo solo como un riesgo, gestionarlo como nuestra mayor oportunidad.', emoji: '✅', short: 'Dependencia del Mercado Brasileño' },
      { t: 'Entorno macro-económico y político', d: 'Aceptar la devaluación monetaria y las limitaciones de la infraestructura pública regional, ajustando nuestros planes de contingencia.', emoji: '⏳', short: 'Entorno macro-económico y político' },
      { t: 'Curva de Maduración de Procesos', d: 'Reconocer que la transición al sistema semestral de Medicina requiere un tiempo de adaptación técnica que no se puede forzar.', emoji: '⏳', short: 'Curva de Maduración de Procesos' }
    ]
  }
};

const wheelDataList = [wheelDataMap.CREAR, wheelDataMap.PRESERVAR, wheelDataMap.ACEPTAR, wheelDataMap.REMOVER];

function Task5({ isExporting = false }: { isExporting?: boolean }) {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700 fill-mode-both pb-10">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <RefreshCcw size={14} /> Seguimiento Metodológico
          </div>
          <h2 className="text-5xl font-black text-[#0A192F] flex items-center gap-4 tracking-tight">
            Rueda de Desarrollo
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium border-l-4 border-sky-400 pl-5 max-w-3xl leading-relaxed">
            Metas definidas y situación actual al cierre del <span className="text-sky-600 font-bold">1er trimestre</span>.
          </p>
        </div>
        
        {/* Toggle View Buttons */}
        <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <button 
            onClick={() => setViewMode('chart')}
            disabled={isExporting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''} ${viewMode === 'chart' ? 'bg-[#0A192F] text-white shadow-md' : 'text-slate-500 hover:text-[#0A192F] hover:bg-slate-100'}`}
          >
            <PieChartIcon size={18} /> Vista Gráfico
          </button>
          <button 
            onClick={() => setViewMode('table')}
            disabled={isExporting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''} ${viewMode === 'table' ? 'bg-[#0A192F] text-white shadow-md' : 'text-slate-500 hover:text-[#0A192F] hover:bg-slate-100'}`}
          >
            <Table size={18} /> Vista Tabla
          </button>
        </div>
      </header>

      {viewMode === 'chart' ? (
        // --- VISTA RUEDA CSS AVANZADA (ESTILO IMAGEN) ---
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 animate-in fade-in duration-500 relative overflow-hidden flex justify-center items-center">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-[#0A192F]"></div>
          
          {/* Wheel Container - Escalado mejorado para evitar superposiciones */}
          <div className="relative w-[340px] h-[340px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] my-6 animate-in zoom-in duration-700">
            
            {/* Background Circle (Rotated diagonally) */}
            <div className="absolute inset-0 rounded-full shadow-2xl border-[6px] border-white overflow-hidden transform rotate-45">
               {/* TL -> TOP -> REMOVER */}
               <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#0A192F] hover:brightness-110 transition-all"></div>
               {/* TR -> RIGHT -> CREAR */}
               <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-400 hover:brightness-110 transition-all"></div>
               {/* BR -> BOTTOM -> PRESERVAR */}
               <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-600 hover:brightness-110 transition-all"></div>
               {/* BL -> LEFT -> ACEPTAR */}
               <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-sky-600 hover:brightness-110 transition-all"></div>
               
               {/* Cross borders (creates the X separator in the middle) */}
               <div className="absolute top-0 bottom-0 left-1/2 w-[6px] bg-white -translate-x-1/2"></div>
               <div className="absolute left-0 right-0 top-1/2 h-[6px] bg-white -translate-y-1/2"></div>
            </div>

            {/* Overlays Wrapper - Posiciones ajustadas dinámicamente */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* TOP: REMOVER */}
              <div className="absolute top-[3%] sm:top-[5%] md:top-[7%] lg:top-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center w-[150px] sm:w-48 md:w-56 lg:w-72">
                 <h4 className="text-white font-black text-xs sm:text-base md:text-lg lg:text-2xl tracking-wider drop-shadow-md">REMOVER</h4>
                 <span className="text-white/90 text-[9px] sm:text-xs md:text-sm font-bold mb-1 sm:mb-2 drop-shadow-md">(Eliminar/Reducir)</span>
                 <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-xl border border-slate-200 w-full pointer-events-auto transition-transform hover:scale-105">
                   <ul className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-slate-800 font-bold space-y-1 lg:space-y-1.5 leading-tight text-left">
                     {wheelDataMap.REMOVER.items.map((item: any, i: number) => <li key={i} className="flex gap-1.5 items-start"><span className="shrink-0">{item.emoji}</span><span>{item.short}</span></li>)}
                   </ul>
                 </div>
              </div>

              {/* BOTTOM: PRESERVAR */}
              <div className="absolute bottom-[3%] sm:bottom-[5%] md:bottom-[7%] lg:bottom-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center w-[150px] sm:w-48 md:w-56 lg:w-72">
                 <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-xl border border-slate-200 w-full mb-1 sm:mb-2 pointer-events-auto transition-transform hover:scale-105">
                   <ul className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-slate-800 font-bold space-y-1 lg:space-y-1.5 leading-tight text-left">
                     {wheelDataMap.PRESERVAR.items.map((item: any, i: number) => <li key={i} className="flex gap-1.5 items-start"><span className="shrink-0">{item.emoji}</span><span>{item.short}</span></li>)}
                   </ul>
                 </div>
                 <span className="text-white/90 text-[9px] sm:text-xs md:text-sm font-bold drop-shadow-md">(Mantener/Mejorar)</span>
                 <h4 className="text-white font-black text-xs sm:text-base md:text-lg lg:text-2xl tracking-wider drop-shadow-md">PRESERVAR</h4>
              </div>

              {/* RIGHT: CREAR */}
              <div className="absolute right-[2%] sm:right-[4%] md:right-[5%] lg:right-[7%] top-1/2 -translate-y-1/2 flex flex-col items-center w-[140px] sm:w-48 md:w-56 lg:w-64">
                 <div className="text-center w-full">
                   <h4 className="text-white font-black text-xs sm:text-base md:text-lg lg:text-2xl tracking-wider drop-shadow-md">CREAR</h4>
                   <span className="text-white/90 text-[9px] sm:text-xs md:text-sm font-semibold drop-shadow-md">(Agregar/Inventar)</span>
                 </div>
                 <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-xl border border-slate-200 w-full pointer-events-auto transition-transform hover:scale-105 mt-1 sm:mt-2">
                   <ul className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-slate-800 font-bold space-y-1 lg:space-y-1.5 leading-tight text-left">
                     {wheelDataMap.CREAR.items.map((item: any, i: number) => <li key={i} className="flex gap-1.5 items-start"><span className="shrink-0">{item.emoji}</span><span>{item.short}</span></li>)}
                   </ul>
                 </div>
              </div>

              {/* LEFT: ACEPTAR */}
              <div className="absolute left-[2%] sm:left-[4%] md:left-[5%] lg:left-[7%] top-1/2 -translate-y-1/2 flex flex-col items-center w-[140px] sm:w-48 md:w-56 lg:w-64">
                 <div className="text-center w-full">
                   <h4 className="text-white font-black text-xs sm:text-base md:text-lg lg:text-2xl tracking-wider drop-shadow-md">ACEPTAR</h4>
                   <span className="text-white/90 text-[9px] sm:text-xs md:text-sm font-semibold drop-shadow-md">(Hacer las Paces)</span>
                 </div>
                 <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-xl border border-slate-200 w-full pointer-events-auto transition-transform hover:scale-105 mt-1 sm:mt-2">
                   <ul className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-slate-800 font-bold space-y-1 lg:space-y-1.5 leading-tight text-left">
                     {wheelDataMap.ACEPTAR.items.map((item: any, i: number) => <li key={i} className="flex gap-1.5 items-start"><span className="shrink-0">{item.emoji}</span><span>{item.short}</span></li>)}
                   </ul>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // --- VISTA DE TABLA MATRIZ ---
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden animate-in fade-in duration-500">
          <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#0A192F] to-blue-900 text-white">
                <th className="p-6 text-lg font-bold w-1/4 border-r border-white/10">Cuadrante</th>
                <th className="p-6 text-lg font-bold w-3/4">Metas Definidas (Seguimiento)</th>
              </tr>
            </thead>
            <tbody>
              {wheelDataList.map((quadrant, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  {/* Columna Izquierda: Título del Cuadrante */}
                  <td className="p-6 align-top border-r border-slate-100">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-full text-white shadow-md mb-3" style={{ backgroundColor: quadrant.color }}>
                        {quadrant.icon}
                      </div>
                      <h4 className="font-black text-xl text-[#0A192F]">{quadrant.name}</h4>
                      <p className="text-sm font-bold mt-1" style={{ color: quadrant.color }}>{quadrant.title}</p>
                    </div>
                  </td>
                  {/* Columna Derecha: Lista de Tareas */}
                  <td className="p-6">
                    <p className="text-slate-500 font-medium italic mb-4 pb-4 border-b border-slate-100 text-sm">
                      Foco: {quadrant.focus}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      {quadrant.items.map((item: any, i: number) => (
                        <div key={i} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
                          <div className="text-2xl shrink-0 leading-none pt-0.5">{item.emoji}</div>
                          <div>
                            <strong className="text-[#0A192F] block mb-1 text-sm">
                              {item.t}
                            </strong>
                            <p className="text-slate-600 text-xs leading-relaxed">
                              {item.d}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}

// --- TASK 6: NEWSLETTER (VISIÓN 360) ---
function Task6() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-both pb-10">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Newspaper size={14} /> Comunicación Directiva
          </div>
          <h2 className="text-5xl font-black text-[#0A192F] flex items-center gap-4 tracking-tight">
            Newsletter Ejecutivo
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium border-l-4 border-sky-400 pl-5 max-w-3xl leading-relaxed">
            Síntesis de gestión con <span className="text-sky-600 font-bold">claridad estratégica</span> y visión institucional.
          </p>
        </div>
      </header>

      {/* NEWSPAPER CONTAINER */}
      <div className="bg-[#FAF9F6] text-[#0A192F] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-sm border border-slate-300 relative overflow-hidden">
        {/* Paper texture overlay */}
        {/* Paper texture — uses a subtle CSS pattern instead of remote image to avoid CORS issues during PDF export */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)" }}></div>
        
        <div className="relative z-10">
          {/* HEADER / MASTHEAD */}
          <div className="border-b-[6px] border-[#0A192F] pb-6 mb-6 text-center">
            <h1 className="text-6xl md:text-8xl font-black font-serif tracking-tighter mb-4 text-[#0A192F]">VISIÓN 360</h1>
            <div className="flex justify-between items-center border-t-2 border-b-2 border-[#0A192F] py-2 px-4 font-bold uppercase text-xs md:text-sm tracking-widest text-[#0A192F]">
              <span>Q1 2026</span>
              <span className="text-sky-600">UPDS SEDE COBIJA</span>
              <span>Rectorado Regional</span>
            </div>
            <p className="mt-6 text-lg md:text-xl font-serif italic text-slate-700 px-4 md:px-20 leading-relaxed">
              {"El primer trimestre ha definido el ritmo del año: hemos consolidado nuestra hegemonía, acelerado la innovación académica y abrazado un modelo estratégico que transforma nuestra diversidad fronteriza en una ventaja sólida."}
            </p>
          </div>

          {/* NEWSPAPER GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* COLUMN 1: Logros y Clientes + Posicionamiento */}
            <div className="md:col-span-4 space-y-8">
              <section>
                <h3 className="font-black text-xl border-b border-[#0A192F] pb-2 mb-4 uppercase tracking-wider">Logros & Clientes</h3>
                <p className="font-serif text-sm italic text-slate-600 mb-4">Resultados concretos que reafirman nuestro compromiso con la excelencia y la comunidad estudiantil.</p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-sky-600 font-black text-lg mt-0.5">•</span>
                    <div>
                      <span className="block font-bold text-sm">681 Nuevos Estudiantes</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-600 font-black text-lg mt-0.5">•</span>
                    <div>
                      <span className="block font-bold text-sm">31 Transferencias</span>
                      <span className="text-xs text-slate-600 font-serif">Alumnos captados de otras casas de estudios.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-600 font-black text-lg mt-0.5">•</span>
                    <div>
                      <span className="block font-bold text-sm">47.3 Alumnos por Grupo</span>
                      <span className="text-xs text-slate-600 font-serif">Promedio óptimo mantenido.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 pt-3 border-t border-slate-300">
                    <div className="w-full bg-[#0A192F] text-white p-4 rounded-sm">
                      <span className="block text-xs font-bold uppercase text-sky-300 mb-1">Tasa de Deserción</span>
                      <span className="block text-3xl font-black font-serif">5.25%</span>
                      <span className="text-xs text-slate-300 italic">Un índice histórico que demuestra la eficacia de nuestra retención.</span>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="pt-2 border-t-2 border-[#0A192F]">
                <h3 className="font-black text-xl mb-3 uppercase tracking-wider">Entorno y Mercado</h3>
                <h4 className="font-serif font-bold text-lg leading-tight mb-2">Expansión Estratégica Transfronteriza</h4>
                <p className="text-sm font-serif text-slate-800 leading-relaxed text-justify mb-3">
                  Nuestra visión no reconoce fronteras. Este trimestre marcamos un hito con el <strong>ingreso oficial a los mercados de Perú y Rondonia (Brasil)</strong>, transformando el entorno geográfico de mercado en nuestro mayor activo.
                </p>
              </section>
            </div>

            {/* COLUMN 2: Innovación & Novedades (Center highlighted block) */}
            <div className="md:col-span-4 flex flex-col">
              <div className="bg-[#0A192F] text-white p-6 rounded-sm shadow-xl flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>
                
                <h3 className="font-black text-xl text-sky-400 border-b border-white/20 pb-2 mb-5 uppercase tracking-wider">Innovación del Trimestre</h3>
                
                <h4 className="font-serif font-bold text-2xl leading-tight mb-4">
                  Transformación de Infraestructura Clínica y Académica
                </h4>
                
                <p className="font-serif text-sm text-slate-300 italic mb-6">
                  {"No solo enseñamos medicina, construimos los escenarios donde se salvan vidas."}
                </p>
                
                <div className="space-y-6 mt-auto">
                  {/* Quirófano Section */}
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto-quirofano-BsI5gAJopKMwibFt1FUcobY5OidRIX.jpeg" 
                      alt="Sala Quirúrgica UPDS" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="bg-white/10 p-4 border-l-4 border-sky-400">
                      <span className="block font-bold uppercase text-xs text-sky-300 mb-1">Hito Académico</span>
                      <span className="block text-lg font-bold">Implementación de Sala Quirúrgica</span>
                      <span className="block text-xs font-serif text-slate-300 mt-1">Quirófano de primer nivel para prácticas reales de Cirugía I y II.</span>
                    </div>
                  </div>
                  
                  {/* Modernización de Aulas Section */}
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modernizacion-aulas-cjJ9ZTmHJpkWAhlRcMQAujr3eMJfjB.jpeg" 
                      alt="Modernización de Aulas UPDS" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="bg-white/10 p-4 border-l-4 border-blue-500">
                      <span className="block font-bold uppercase text-xs text-blue-300 mb-1">Expansión Física</span>
                      <span className="block text-lg font-bold">Modernización de Aulas</span>
                      <span className="block text-xs font-serif text-slate-300 mt-1">6 aulas nuevas inauguradas y 6 en fase avanzada de construcción.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Posicionamiento & Rector */}
            <div className="md:col-span-4 space-y-8">
              
              <section>
                <h3 className="font-black text-xl border-b border-[#0A192F] pb-2 mb-4 uppercase tracking-wider text-right">Posicionamiento</h3>
                <div className="text-right mb-6">
                  <h4 className="font-serif font-bold text-3xl leading-tight text-[#0A192F]">
                    #1 en la Región
                  </h4>
                  <p className="font-black text-sky-600 uppercase text-xs tracking-widest mt-1">Liderazgo Fronterizo Absoluto</p>
                </div>
                <p className="text-sm font-serif text-slate-800 leading-relaxed text-justify">
                  Nos consolidamos en el <strong>primer lugar</strong> de toda la región fronteriza en preferencia académica, con <strong>2,415 alumnos activos en la carrera de Medicina</strong> lo que representa el 44% del total de estudiantes en la ciudad de Cobija. Este volumen no es solo un número, es la validación internacional de nuestra calidad y propuesta de valor bilingüe.
                </p>
              </section>

              {/* RECTOR PHOTO & QUOTE */}
              <section className="border-t-2 border-[#0A192F] pt-6 relative">
                <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FAF9F6] px-3 font-bold text-xs tracking-widest uppercase">Visión Directiva</h3>
                
                <div className="flex flex-col items-center text-center mt-4">
                  {/* Rector Photo */}
                  <div className="w-40 h-48 bg-slate-300 mb-4 border-4 border-white shadow-lg relative overflow-hidden group">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto-rector-regional.png-tOEEYbgbltrg1zpNbrruLs7YlHGIpM.jpeg" 
                      alt="Luis Michel Bravo Alencar - Rector Regional" 
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle photo overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <h4 className="font-black text-lg uppercase tracking-wide">Luis Michel Bravo Alencar</h4>
                  <p className="text-xs text-sky-700 font-bold tracking-widest uppercase mb-4">Rector Regional</p>
                  
                  <div className="relative">
                    <span className="absolute -top-4 -left-4 text-5xl text-sky-300 opacity-50 font-serif">{'"'}</span>
                    <p className="font-serif text-sm italic text-slate-700 leading-relaxed px-4">
                      Iniciamos nuestro cuarto año consolidando a la UPDS como la facultad de medicina de referencia para el Acre (Brasil), Madre de Dios (Perú) y Pando. Con el 40% del mercado local, maduramos procesos y tecnología mientras optimizamos nuestro margen operativo. Cada paso tiene un propósito claro: transformar la educación fronteriza en una ventaja competitiva irrefutable. Un año que no se espera, se conquista.
                    </p>
                    <span className="absolute -bottom-6 -right-4 text-5xl text-sky-300 opacity-50 font-serif">{'"'}</span>
                  </div>
                </div>
              </section>

            </div>
          </div>
          
          <div className="mt-12 border-t-4 border-double border-[#0A192F] pt-4 text-center">
            <span className="font-serif font-bold text-xs uppercase tracking-[0.3em] text-[#0A192F]">Universidad Privada Domingo Savio — Boletín Estratégico Exclusivo</span>
          </div>

        </div>
      </div>
    </div>
  );
}
