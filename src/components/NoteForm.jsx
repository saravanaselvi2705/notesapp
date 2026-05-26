import { useState, useEffect } from "react"
import { FiType, FiAlignLeft, FiTag, FiPlus, FiCheck, FiX } from "react-icons/fi"

function NoteForm({
  notes,
  setNotes,
  editNote,
  setEditNote
}) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")

  // Auto fill inputs while editing
  useEffect(() => {
    if (editNote) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setTitle(editNote.title)
      setDescription(editNote.description)
      setTags(editNote.tags.join(","))
      /* eslint-enable react-hooks/set-state-in-effect */
    } else {
      setTitle("")
      setDescription("")
      setTags("")
    }
  }, [editNote])

  // Add or Update Note
  const addNote = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill all fields")
      return
    }

    // Process tags: trim spaces and filter empty items
    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "")

    // UPDATE NOTE
    if (editNote) {
      const updatedNotes = notes.map((note) =>
        note.id === editNote.id
          ? {
              ...note,
              title: title.trim(),
              description: description.trim(),
              tags: tagsArray
            }
          : note
      )

      setNotes(updatedNotes)
      setEditNote(null)
    }
    // ADD NEW NOTE
    else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        tags: tagsArray,
        archived: false,
        trashed: false,
      }

      setNotes([...notes, newNote])
    }

    // Clear Inputs
    setTitle("")
    setDescription("")
    setTags("")
  }

  const cancelEdit = () => {
    setEditNote(null)
    setTitle("")
    setDescription("")
    setTags("")
  }

  return (
    <div className="max-w-xl w-full mx-auto px-4 mt-8">
      <div className="bg-white/[0.02] border border-white/10 hover:border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
        
        {/* FORM HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>
            {editNote ? "Edit Note" : "Create New Note"}
          </h2>
          {editNote && (
            <button
              onClick={cancelEdit}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all duration-200"
            >
              <FiX className="text-sm" /> Cancel Edit
            </button>
          )}
        </div>

        {/* TITLE INPUT */}
        <div className="relative mb-4 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
            <FiType className="text-md" />
          </div>
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.02] text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500/50 outline-none transition-all duration-300 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {/* DESCRIPTION TEXTAREA */}
        <div className="relative mb-4 group">
          <div className="absolute top-3 left-4 pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
            <FiAlignLeft className="text-md" />
          </div>
          <textarea
            placeholder="Write down your thoughts..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.02] text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500/50 outline-none transition-all duration-300 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10 h-32 resize-none"
          ></textarea>
        </div>

        {/* TAGS INPUT */}
        <div className="relative mb-2 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
            <FiTag className="text-md" />
          </div>
          <input
            type="text"
            placeholder="Tags (e.g. Work, Ideas, Goals)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.02] text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500/50 outline-none transition-all duration-300 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
        <p className="text-[11px] text-gray-500 px-4 mb-6">
          Separate tags with commas
        </p>

        {/* SUBMIT BUTTON */}
        <button
          onClick={addNote}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-300 group"
        >
          {editNote ? (
            <>
              <FiCheck className="text-lg group-hover:scale-110 transition-transform" />
              Update Workspace Note
            </>
          ) : (
            <>
              <FiPlus className="text-lg group-hover:scale-110 transition-transform" />
              Add to Workspace
            </>
          )}
        </button>

      </div>
    </div>
  )
}

export default NoteForm