import { FiSearch } from "react-icons/fi"

function SearchBar({ search, setSearch }) {
  return (
    <div className="max-w-xl w-full mx-auto px-4 mt-8">
      <div className="relative group">
        
        {/* MAGNIFYING ICON */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 group-focus-within:text-indigo-400 text-lg transition-colors duration-200" />
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Search notes by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500/50 outline-none transition-all duration-300 focus:bg-black/40 focus:ring-4 focus:ring-indigo-500/10 shadow-lg"
        />

        {/* KEYBOARD SHORTCUT BADGE (SaaS visual cue) */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-gray-500 bg-white/5 border border-white/10 rounded-md">
            /
          </kbd>
        </div>

      </div>
    </div>
  )
}

export default SearchBar