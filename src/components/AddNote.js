import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const initialNoteState = {
    title: "",
    description: "",
    tag: "",
  };
  const [note, setNote] = useState(initialNoteState);
  const handleSubmit = (e) => {
    e.preventDefault();
    //this will prevent the reload of the form o submission
    addNote(note.title, note.description, note.tag);
    //here we are doing setNote to clear the fields once the function is called.
    setNote(initialNoteState);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    //as we type it will change the name and value of the different fields
    //this is like a generic function
    //ask rahul >> ??? to explain this function
  };
  return (
    <div className="container my-3">
      <h2>Add a Note </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            placeholder="Title"
            onChange={onChange}
            minLength={5}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            minLength={5}
            required
            placeholder="Description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="enter Tag"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={note.title.length < 5 || note.description.length < 5}
          onClick={handleSubmit}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
