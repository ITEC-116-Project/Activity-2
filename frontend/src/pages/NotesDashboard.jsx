import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote, updateNote } from "../api/api";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // ✅ import icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/NotesDashboard.css"; // make sure this line exists

function NotesDashboard() {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    if (!user) navigate("/login");
    else loadNotes();
  }, []);

  const loadNotes = async () => {
    const res = await getNotes(user.id);
    setNotes(res.data);
  };

  const formatNoteDate = (note) => {
    if (!note) return "";

    // First check common timestamp fields
    const candidates = [
      "createdAt",
      "updatedAt",
      "date",
      "timestamp",
      "created_at",
      "updated_at",
      "created",
      "updated",
    ];
    for (const k of candidates) {
      if (note[k]) {
        const d = new Date(note[k]);
        if (!isNaN(d)) return d.toLocaleString();
      }
    }

    // Fallback: scan all fields and try to parse any value to a Date
    for (const key of Object.keys(note)) {
      try {
        const val = note[key];
        // skip objects/arrays
        if (val === null) continue;
        if (typeof val === "string" || typeof val === "number") {
          const d = new Date(val);
          if (!isNaN(d)) return d.toLocaleString();
        }
      } catch (e) {
        // ignore parsing errors
      }
    }

    return "";
  };

  const getCreatedDate = (note) => {
    const keys = ["created_at", "createdAt", "created", "date"];
    for (const k of keys) if (note[k]) {
      const d = new Date(note[k]);
      if (!isNaN(d)) return d.toLocaleString();
    }
    return "";
  };

  const getUpdatedDate = (note) => {
    const keys = ["updated_at", "updatedAt", "updated", "timestamp"];
    for (const k of keys) if (note[k]) {
      const d = new Date(note[k]);
      if (!isNaN(d)) return d.toLocaleString();
    }
    return "";
  };

  const handleAddOrEdit = async () => {
    try {
      if (editNote) {
        const res = await updateNote(editNote.id, { title, content });
        const updated = res.data;
        toast.success("Note updated");
        // update local state immediately
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        setEditNote(null);
      } else {
        const res = await addNote({ userId: user.id, title, content });
        const created = res.data;
        toast.success("Note added");
        // prepend the newly created note so user sees it immediately
        setNotes((prev) => [created, ...prev]);
      }
      setTitle("");
      setContent("");
      // fallback: refresh from server after short delay to ensure consistency
      setTimeout(loadNotes, 400);
    } catch (err) {
      toast.error("Failed to save note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted");
      // remove from local state immediately
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2>Welcome, {user?.username} !</h2>
      </div>

      <div className="note-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="note-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="note-textarea"
        />
        <button onClick={handleAddOrEdit} className="note-submit-btn">
          {editNote ? "Update Note" : "Add Note"}
        </button>
      </div>

      <ul className="notes-list">
        {notes.map((n) => (
          <li key={n.id} className="note-card">
            <h4>{n.title}</h4>
            <p>{n.content}</p>
            <div className="note-actions">
              <button onClick={() => handleEdit(n)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(n.id)} className="delete-btn">Delete</button>
            </div>
            <div className="note-footer">
              <div>
                {(() => {
                  const created = getCreatedDate(n);
                  const updated = getUpdatedDate(n);

                  // Show "Updated" only if updated date is different from created date
                  if (updated && created && updated !== created)
                    return <div className="note-date">Updated: {updated}</div>;

                  // Otherwise, show "Created"
                  if (created)
                    return <div className="note-date">Created: {created}</div>;

                  return null;
                })()}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Logout icon button in bottom-right */}
      <button className="logout-icon-btn" onClick={handleLogout}>
        <LogOut size={22} />
      </button>
      <ToastContainer />
    </div>
  );
}

export default NotesDashboard;
