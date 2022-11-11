import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios";

const NoteState = (props) => {
  //define a variable host and initialNotes.
  const host = "http://localhost:8080";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //Get all notes
  const getNotes = async () => {
    try {
      //axios api call to get all notes
      const response = await axios.get(host + "/api/notes/fetchallnotes", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = response.data;
      // console.log(data);
      setNotes(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    // console.log("Adding a note");
    //we declare a const variable values with the req.body
    const values = {
      title: title,
      description: description,
      tag: tag,
    };
    try {
      //axios api call to create a note
      const response = await axios.post(
        `${host}/api/notes/addnote`,
        //this is request body {key: value}
        { ...values },
        // this is config object
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data);
      const data = response.data;
      const note = data;
      //ask rahul how to make a deep copy of the note
      const newNotes = [...notes];
      newNotes.push(note);
      setNotes(newNotes);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // console.log(
    //   "Editing the note with id " +
    //     id +
    //     " " +
    //     title +
    //     " " +
    //     " " +
    //     description +
    //     " " +
    //     tag
    // );
    const values = {
      id: id,
      title: title,
      description: description,
      tag: tag,
    };
    try {
      await axios.put(
        `${host}/api/notes/updatenote/${id}`,
        //this is request body {key: value}
        { ...values },
        //this is config object
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data);
      //logic to edit in client
      //first we make a deep copy of the notes, because in React we cant update the notes directly
      let newNotes = JSON.parse(JSON.stringify(notes));
      //this function will make newNotes a deep copy of the notes
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
          // ask rahul >>> ye break kis loop se nikalega
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    //Todo: make api calls here
    // console.log("deleting the note with id " + id);
    try {
      await axios.delete(`${host}/api/notes/deletenote/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      // const data = response.data;
      // console.log(data);
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.log("error: ", error);
    }
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
