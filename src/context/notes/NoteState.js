import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Kumar",
    class: "backend",
  };
  const [state, setstate] = useState(s1);
  const update = () => {
    console.log("inside the updte function");
    setTimeout(() => {
      setstate({
        name: "Sumit",
        class: "frontend",
      });
    }, 1000);
    //here 1000 is in miliseconds, it means 1 second.
    //here in update after 1 second we are changing the state.
  };
  return (
    <noteContext.Provider value={{ state, update }}>
      {/* here we are passing two things state and update function */}
      {/* ask rahul >> ????
        what is the flow and use of this code     */}
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
