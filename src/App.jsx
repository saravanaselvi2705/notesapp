import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import NoteForm from "./components/NoteForm"
import NoteCard from "./components/NoteCard"
import SearchBar from "./components/SearchBar"
import { FiBookOpen, FiArchive, FiTrash2, FiFilter, FiChevronDown } from "react-icons/fi"

function App() {

  // NOTES STATE
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  // SEARCH STATE
  const [search, setSearch] = useState("")

  // EDIT NOTE STATE
  const [editNote, setEditNote] = useState(null)

  // TAG FILTER STATE
  const [selectedTag, setSelectedTag] = useState("")

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // FILTER ACTIVE NOTES
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())

    const matchesTag =
      selectedTag === "" ||
      (note.tags && note.tags.includes(selectedTag))

    return (
      !note.archived &&
      !note.trashed &&
      matchesSearch &&
      matchesTag
    )
  })

  // EXTRACT ALL UNIQUE VALID TAGS
  const allTags = [
    ...new Set(
      notes
        .flatMap((note) => note.tags || [])
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    )
  ]

  // GET ARCHIVED AND TRASH COUNTS
  const archivedNotes = notes.filter((note) => note.archived && !note.trashed)
  const trashedNotes = notes.filter((note) => note.trashed)

  return (
    <div className="min-h-screen bg-black text-gray-100 pb-24 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* AMBIENT BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] left-[15%] w-[40vw] h-[40vw] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* NAVBAR */}
      <Navbar />

      <main className="relative z-10">
        
        {/* SEARCH BAR */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* TAG FILTER */}
        <div className="max-w-xl w-full mx-auto px-4 mt-5">
          <div className="relative group">
            
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200">
              <FiFilter className="text-md" />
            </div>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] text-gray-300 border border-white/10 outline-none transition-all duration-300 focus:bg-black/40 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 shadow-lg cursor-pointer appearance-none text-sm"
            >
              <option value="" className="bg-zinc-950 text-gray-300">
                Filter by Tag (Show All)
              </option>
              {allTags.map((tag, index) => (
                <option
                  key={index}
                  value={tag}
                  className="bg-zinc-950 text-gray-300"
                >
                  Tag: {tag}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
              <FiChevronDown className="text-sm" />
            </div>

          </div>
        </div>

        {/* NOTE FORM */}
        <NoteForm
          notes={notes}
          setNotes={setNotes}
          editNote={editNote}
          setEditNote={setEditNote}
        />

        {/* ACTIVE NOTES CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FiBookOpen className="text-lg" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Active Workspace
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-400 shadow-inner">
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  setEditNote={setEditNote}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 px-6 flex flex-col items-center justify-center text-center bg-white/[0.01] border border-dashed border-white/5 rounded-3xl backdrop-blur-sm max-w-lg mx-auto w-full transition-all duration-300 hover:border-white/10">
              <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 shadow-lg shadow-indigo-500/5">
                <FiBookOpen className="text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Active Notes</h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                {search || selectedTag
                  ? "We couldn't find any notes matching your search or tag criteria. Try clearing filters!"
                  : "Your creative space is empty. Add a new note above to start capturing your thoughts!"}
              </p>
            </div>
          )}
        </div>

        {/* ARCHIVED NOTES CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FiArchive className="text-lg" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Archived Vault
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-400 shadow-inner">
              {archivedNotes.length} {archivedNotes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {archivedNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  setEditNote={setEditNote}
                />
              ))}
            </div>
          ) : (
            <div className="py-10 px-6 flex flex-col items-center justify-center text-center bg-white/[0.01] border border-dashed border-white/5 rounded-3xl backdrop-blur-sm max-w-lg mx-auto w-full transition-all duration-300 hover:border-white/10">
              <div className="p-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 shadow-lg shadow-emerald-500/5">
                <FiArchive className="text-2xl" />
              </div>
              <h4 className="text-md font-bold text-white mb-1">Archive is Empty</h4>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                Archive notes you've completed to keep your active workspace organized and clean.
              </p>
            </div>
          )}
        </div>

        {/* TRASH NOTES CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FiTrash2 className="text-lg" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Trash Bin
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-400 shadow-inner">
              {trashedNotes.length} {trashedNotes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {trashedNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trashedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  setEditNote={setEditNote}
                />
              ))}
            </div>
          ) : (
            <div className="py-10 px-6 flex flex-col items-center justify-center text-center bg-white/[0.01] border border-dashed border-white/5 rounded-3xl backdrop-blur-sm max-w-lg mx-auto w-full transition-all duration-300 hover:border-white/10">
              <div className="p-3.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-3 shadow-lg shadow-rose-500/5">
                <FiTrash2 className="text-2xl" />
              </div>
              <h4 className="text-md font-bold text-white mb-1">Trash is Clear</h4>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                Deleted notes are sent here first. Restoring or permanently deleting notes is supported.
              </p>
            </div>
          )}
        </div>

      </main>

    </div>
  )
}

export default App