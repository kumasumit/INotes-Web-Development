import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios";
const NoteState = (props) => {
  const host = "http://localhost:8080";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //Get all notes
  const getNotes = async () => {
    const response = await axios.get(host + "/api/notes/fetchallnotes", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": "",
      },
    });
    const data = response.data;
    console.log(data);
    setNotes(data);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //Todo: make api calls here
    const response = await axios.post(`{host}/api/notes/addnote`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": "",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response.data);
    const data = response.data;
    const note = data;
    //ask rahul how to make a deep copy of the note
    const newNotes = [...notes];
    newNotes.push(note);
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log("Editing the note with id " + id);
    //Todo: make api calls here
    const response = await axios.put(`{host}/api/notes/updatenote/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": "",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response.data);
    const data = response.data;
    //logic to edit in client
    //first we make a deep copy of the notes, because if React we cant update the notes directly
    let newNotes = JSON.parse(JSON.stringify(notes));
    //this function will make newNotes a deep copy of the notes

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes.tag = tag;
        newNotes.title = title;
        newNotes.description = description;
        break;
        // ask rahul >>> ye break kis loop se nikalega
      }
    }
    setNotes(newNotes);
  };

  //Delete a note
  const deleteNote = async (id) => {
    //Todo: make api calls here
    console.log("deleting the note with id " + id);
    const headers = {
      "Content-Type": "application/json",
      "auth-token": "",
    };
    const response = await axios.delete(`{host}/api/notes/deletenote/${id}`, {
      headers,
    });
    const data = response.data;
    console.log(data);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
