
import { Outlet } from 'react-router-dom';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-950 to-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 opacity-20 pointer-events-none mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Main Container - Mobile First, Centered Layout (Profile/Bio Pattern) */}
      <div className="relative min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Container - Glassmorphism */}
        <main className="w-full max-w-md mx-auto">
          {/* Top Bar / Branding (Subtle) */}
          <nav className="flex justify-between items-center px-6 py-3 mb-8 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-bold text-white text-xs tracking-tighter">LC</span>
              </div>
              <span className="font-semibold text-sm tracking-wide text-white/90">LinkCard</span>
            </div>
            <button className="text-xs font-medium text-blue-300 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-full hover:bg-white/5">
              Share
            </button>
          </nav>

          {/* Content Area */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center space-y-2">
            <div className="flex justify-center items-center gap-2 text-slate-500 text-xs">
              <span>Powered by</span>
              <span className="font-bold text-slate-300">LinkCard</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
