import { createContext } from "react";

const noteContext = createContext({
  name: "Kumar",
  class: "backend",
});
//noteContext will hold all the states related to note.

export default noteContext;
