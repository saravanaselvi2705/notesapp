import { FiEdit3, FiTrash2, FiArchive, FiRotateCcw } from "react-icons/fi"

function NoteCard({ note, notes, setNotes, setEditNote }) {
  
  // MOVE TO TRASH / DELETE FOREVER
  const deleteNote = (id) => {
    if (note.trashed) {
      // Permanent deletion
      const updatedNotes = notes.filter((item) => item.id !== id)
      setNotes(updatedNotes)
    } else {
      // Move to trash
      const updatedNotes = notes.map((item) =>
        item.id === id ? { ...item, trashed: true } : item
      )
      setNotes(updatedNotes)
    }
  }

  // TOGGLE ARCHIVE STATE
  const archiveNote = (id) => {
    const updatedNotes = notes.map((item) =>
      item.id === id ? { ...item, archived: !item.archived } : item
    )
    setNotes(updatedNotes)
  }

  // RESTORE FROM TRASH
  const restoreNote = (id) => {
    const updatedNotes = notes.map((item) =>
      item.id === id ? { ...item, trashed: false } : item
    )
    setNotes(updatedNotes)
  }

  return (
    <div className="relative group flex flex-col justify-between overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 min-h-[220px]">
      
      {/* Decorative hover gradient corner glow */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300 -mr-4 -mt-4"></div>

      <div>
        {/* HEADER & TITLE */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors duration-200">
            {note.title}
          </h3>
          {note.archived && (
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              Archived
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm font-normal leading-relaxed mb-4 whitespace-pre-line line-clamp-4">
          {note.description}
        </p>
      </div>

      <div>
        {/* TAGS CONTAINER */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-4">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ACTIONS FOOTER */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/5">
          
          {/* EDIT BUTTON (Only when not trashed) */}
          {!note.trashed && (
            <button
              onClick={() => setEditNote(note)}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 hover:border-amber-500/30 rounded-xl text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-95"
              title="Edit Note"
            >
              <FiEdit3 className="text-xs" /> Edit
            </button>
          )}

          {/* ARCHIVE/UNARCHIVE BUTTON (Only when not trashed) */}
          {!note.trashed && (
            <button
              onClick={() => archiveNote(note.id)}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30 rounded-xl text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ml-auto sm:ml-0"
              title={note.archived ? "Unarchive Note" : "Archive Note"}
            >
              <FiArchive className="text-xs" /> {note.archived ? "Unarchive" : "Archive"}
            </button>
          )}

          {/* RESTORE BUTTON (Only when trashed) */}
          {note.trashed && (
            <button
              onClick={() => restoreNote(note.id)}
              className="flex items-center gap-1.5 px-3 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 hover:border-sky-500/30 rounded-xl text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-95"
              title="Restore to Workspace"
            >
              <FiRotateCcw className="text-xs animate-spin-hover" /> Restore
            </button>
          )}

          {/* DELETE BUTTON (Move to Trash OR Delete Permanently) */}
          <button
            onClick={() => deleteNote(note.id)}
            className={`flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30 rounded-xl text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ${note.trashed ? "ml-auto" : "ml-auto sm:ml-0"}`}
            title={note.trashed ? "Delete Forever" : "Move to Trash"}
          >
            <FiTrash2 className="text-xs" /> {note.trashed ? "Delete Forever" : "Delete"}
          </button>

        </div>
      </div>

    </div>
  )
}

export default NoteCard