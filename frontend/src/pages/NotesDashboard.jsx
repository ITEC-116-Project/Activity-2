import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote, updateNote } from "../api/api";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // ✅ import icon
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

  const handleAddOrEdit = async () => {
    if (editNote) {
      await updateNote(editNote.id, { title, content });
      setEditNote(null);
    } else {
      await addNote({ userId: user.id, title, content });
    }
    setTitle("");
    setContent("");
    setTimeout(loadNotes, 200);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
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
          </li>
        ))}
      </ul>

      {/* ✅ Logout icon button in bottom-right */}
      <button className="logout-icon-btn" onClick={handleLogout}>
        <LogOut size={22} />
      </button>
    </div>
  );
}

export default NotesDashboard;
