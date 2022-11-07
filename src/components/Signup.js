import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = credentials;
    console.log(name + " " + email + " " + password + " " + confirmPassword);
    //write the logic to check password and confirmPassword here

    const values = {
      name,
      email,
      password,
    };
    //here we create an async function to signup the user
    async function signUpUser(values) {
      console.log("hi from Signup function");
      try {
        //this is the axios api call to create-signUp a user
        const { data } = await axios.post(
          "http://localhost:8080/api/auth/createUser",
          //this is request body {key: value}
          { ...values },

          // this is config object, here you can put your config values.
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        //this is the fetch api call to create-signUp a user
        // const response = await fetch(
        //   "http://localhost:8080/api/auth/createUser",
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(values),
        //   }
        // );
        // const data = await response.json();

        console.log(data);
        if (data.success) {
          //if we get success response then we save the authToken and redirect to login screen
          //save the authToken
          localStorage.setItem("token", data.authToken);
          // window.location.href = "/";
          navigate("/login");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    //here we call the signUpUser function
    signUpUser(values);
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
            // minLength={5}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            minLength={3}
            required
          />
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
            value={credentials.confirmPassword}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
