
import React from 'react';

export default function Dashboard() {
  // Mock Data mimicking a user's profile state
  const profile = {
    name: "Alex Sterling",
    headline: "Product Strategist & Creator",
    bio: "Crafting digital experiences that matter. Building the future of networking.",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=0073e6",
    links: [
      { id: 1, title: "Latest Project", url: "#", icon: "🚀", highlight: true },
      { id: 2, title: "Book a Consultation", url: "#", icon: "📅", highlight: false },
      { id: 3, title: "Portfolio", url: "#", icon: "🎨", highlight: false },
      { id: 4, title: "Newsletter", url: "#", icon: "📩", highlight: false },
    ]
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      
      {/* Profile Header */}
      <div className="text-center space-y-4 w-full flex flex-col items-center">
        <div className="relative group cursor-pointer">
          {/* Animated Glow Behind Avatar */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="relative w-32 h-32 rounded-full border-4 border-slate-950 bg-slate-900 object-cover shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="space-y-2 max-w-xs mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">{profile.name}</h1>
          <p className="text-blue-400 font-medium text-sm uppercase tracking-wider">{profile.headline}</p>
          <p className="text-slate-400 text-sm leading-relaxed">{profile.bio}</p>
        </div>
      </div>

      {/* Links Grid / List */}
      <div className="w-full space-y-4">
        {profile.links.map((link) => (
          <a 
            key={link.id}
            href={link.url}
            className={`
              group relative block w-full p-4 rounded-xl transition-all duration-300
              ${link.highlight 
                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:bg-blue-500 border border-blue-400' 
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-lg'}
              hover:-translate-y-1 hover:scale-[1.02]
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl filter drop-shadow-md">{link.icon}</span>
                <span className="font-medium text-lg tracking-tight">{link.title}</span>
              </div>
              
              {/* Arrow Icon */}
              <svg 
                className={`w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 ${link.highlight ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Social Icons Row */}
      <div className="flex items-center justify-center gap-6 pt-4">
        {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
          <button 
            key={social}
            className="text-slate-500 hover:text-white hover:scale-110 transition-all duration-300"
            aria-label={social}
          >
             {/* Placeholder SVGs for social icons to avoid external dependency issues in skeleton */}
             <div className="w-6 h-6 bg-current opacity-50 rounded-full hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}
