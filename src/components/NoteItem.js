import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote, showAlert } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          {/* here we have 1 div for title edit and delete buttons */}
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="far fa-trash-alt mx-3"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Note deleted successfully", "success");
                }}
              />
              <i
                className="fa-regular fa-pen-to-square mx-1"
                onClick={() => updateNote(note)}
              />
            </div>
          </div>
          {/* here we have 2nd div with additional scroll classname to make our second div scrollable */}
          <div className="row mx-1">
            <p className="card-text my-2 scroll">{note.description}</p>
            {/* ask rahul >>> how to give newine here  */}
            {/* ask rahul how to make this srollable for long inputs */}
          </div>
          {/* here we have 3rd div for our tag */}
          <div className="d-flex align-items-center justify-content-center my-2">
            <p className="card-text me-5">
              <strong>{note.tag}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
