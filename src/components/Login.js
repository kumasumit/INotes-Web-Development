import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    console.log(email + " " + password);
    const values = {
      email,
      password,
    };
    //here we create an async function to send axios post request to login a user
    async function loginUser(values) {
      console.log("hi from Login function");
      try {
        //this is the fetch api call for same endpoint
        // const response = await fetch("http://localhost:8080/api/auth/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(values),
        // });
        // const data = await response.json();

        //this is the axios api call for same endpoint
        const { data } = await axios.post(
          "http://localhost:8080/api/auth/login",
          //this is request body {key: value}
          { ...values },

          // this is config object
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data);
        if (data.success) {
          //if we get success response then we save the authToken and redirect
          //save the authToken
          localStorage.setItem("token", data.authToken);
          // window.location.href = "/"; ask rahul >> to explain this code
          navigate("/");
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    //here we call the loginUser function
    loginUser(values);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    //as we type it will change the name and value of the different fields
    //this is like a generic function
    //ask rahul >> ??? to explain this function
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
