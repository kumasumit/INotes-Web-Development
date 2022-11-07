import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="far fa-trash-alt mx-3"
                onClick={() => {
                  deleteNote(note._id);
                }}
              />
              <i
                className="fa-regular fa-pen-to-square mx-1"
                onClick={() => updateNote(note)}
              />
            </div>
          </div>
          <div className="d-flex  justify-content-center">
            <p className="card-text mx-2">{note.description}</p>
            <p className="card-text">
              <strong>{note.tag}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
