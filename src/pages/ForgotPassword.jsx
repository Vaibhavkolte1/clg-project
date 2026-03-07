import React from 'react'
import { FaRocket, FaChartLine, FaPalette, FaCube, FaBolt, FaLayerGroup } from 'react-icons/fa';

const ForgotPassword = () => {

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200 p-6 lg:p-12 font-sans selection:bg-cyan-500/30">

            {/* Animated Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl rotate-12 shadow-lg shadow-cyan-500/20" />
                        <h1 className="text-2xl font-black tracking-tighter text-white">NEO<span className="text-cyan-400">OBJECT</span></h1>
                    </div>
                </header>

                {/* THE BENTO GRID (Object Items) */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-4 gap-4 h-full lg:h-[800px]">

                    {/* 1. Large Hero Object */}
                    <div className="md:col-span-4 md:row-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-end relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
                        <FaRocket className="text-6xl text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">You Forgot<br /> your password.</h2>
                        <p className="text-slate-400 mt-4 max-w-md">then how i remember it? so go and sleep!</p>
                    </div>

                    {/* 2. Glass Stat Card */}
                    <div className="md:col-span-2 md:row-span-1 bg-white/5 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex justify-between items-start">
                            <FaChartLine className="text-emerald-400 text-xl" />
                            <span className="text-xs font-black text-emerald-400">+24%</span>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-white">94.2k</p>
                            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Active Nodes</p>
                        </div>
                    </div>

                    {/* 3. The "Color Picker" Object */}
                    <div className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                        <FaPalette className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:rotate-12 transition-transform duration-500" />
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Style Engine</p>
                        <p className="text-xl font-black mt-2">Dynamic Theming</p>
                        <div className="flex gap-2 mt-4">
                            <div className="w-6 h-6 rounded-full bg-white/20" />
                            <div className="w-6 h-6 rounded-full bg-white/40" />
                            <div className="w-6 h-6 rounded-full bg-white/60" />
                        </div>
                    </div>

                    {/* 4. Abstract Interactive Object */}
                    <div className="md:col-span-2 md:row-span-2 bg-slate-800/30 border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group">
                        <div className="w-32 h-32 relative mb-6">
                            <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
                            <div className="relative z-10 w-full h-full bg-slate-900 rounded-full flex items-center justify-center border border-cyan-400/50">
                                <FaCube className="text-4xl text-cyan-400 group-hover:rotate-[360deg] transition-transform duration-[2000ms]" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">Neural Core</h3>
                        <p className="text-xs text-slate-500 mt-2">Tap to synchronize with local clusters.</p>
                    </div>

                    {/* 5. Utility Strip */}
                    <div className="md:col-span-2 md:row-span-1 bg-white/5 border border-white/5 rounded-[2rem] p-6 flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-xl">
                            <FaBolt className="text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white">Ultra Latency</p>
                            <p className="text-[10px] text-slate-500">Sub-2ms response time</p>
                        </div>
                    </div>

                    {/* 6. Multi-Layer Stack Object */}
                    <div className="md:col-span-2 md:row-span-1 bg-gradient-to-tr from-cyan-600 to-blue-700 rounded-[2rem] p-6 flex justify-between items-center group overflow-hidden">
                        <div className="z-10">
                            <p className="text-xl font-black text-white">System Stack</p>
                            <button className="mt-2 text-[10px] font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full hover:bg-black/40 transition-all">View Layer</button>
                        </div>
                        <FaLayerGroup className="text-6xl text-white/20 -mr-4 group-hover:translate-x-2 transition-transform" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ForgotPassword