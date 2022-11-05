import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const details = useContext(noteContext);
  console.log(details);
  useEffect(() => {
    console.log("hi from about");
    //here we are accessing the update function from the NoteContext.
    details.update();
    // eslint-disable-next-line
  }, []);
  //this useEffect will run only once when about component mounts

  return (
    <div>
      This is About {details.state.name} and he is in class{" "}
      {details.state.class}
    </div>
  );
};

export default About;
