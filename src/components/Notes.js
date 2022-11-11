import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    // if there is token in the localStorage, token item means user is logged in , then call getNotes function to display all notes for logged in user
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      // if there is no token in the localStorage, token item means no user is logged in , then redirect to login page
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);
  //here we are using useEffect as componentDidMount
  const initialNoteState = {
    id: "",
    title: "",
    description: "",
    tag: "",
  };
  const [note, setNote] = useState(initialNoteState);
  //This is ref for showing Button modal dialog
  const ref = useRef(null);
  //this is a ref for closing modal dialog after update.
  const refClose = useRef(null);
  //this is a function to update a note which will be passed as a prop to the note-item
  const updateNote = (currentNote) => {
    //here currentNote is the note on which we have clicked to edit
    ref.current.click();
    //this setNote function will prepopulate the click note/currentNote fields.
    setNote(currentNote);
    //this setNote function will prepopulate the values of the clicked note.
  };

  const handleSubmit = (e) => {
    console.log("Updating the note ....", note);
    editNote(note._id, note.title, note.description, note.tag);
    showAlert("Note updated successfully", "success");
    refClose.current.click();
    //this will close modal dialog on click event
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    //as we type it will change the name and value of the different fields
    //this is like a generic function
    //ask rahul >> ??? to explain this function
  };
  return (
    <>
      <AddNote showAlert={showAlert} />
      <div>
        {/* Button trigger modal  */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
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
                      aria-describedby="emailHelp"
                      minLength={5}
                      required
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
                      placeholder="Description"
                      onChange={onChange}
                      minLength={5}
                      required
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={
                    note.title.length < 5 || note.description.length < 5
                  }
                  onClick={handleSubmit}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
