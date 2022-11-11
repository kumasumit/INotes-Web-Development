import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  //A function to show alerts
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    //after 2 seconds the alert will be set to null and the alert will disappear
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      {/* here we are giving access to our App to our entire Notestate. */}
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
