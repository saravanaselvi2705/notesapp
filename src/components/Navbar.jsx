import { FiFeather } from "react-icons/fi"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
            <FiFeather className="text-white text-xl animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-lg leading-none bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Notesapp
            </span>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-0.5">
              Personal Workspace
            </span>
          </div>
        </div>

        {/* STATUS / BADGE */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-300">
            Live Syncing
          </span>
        </div>

      </div>
    </nav>
  )
}

export default Navbar