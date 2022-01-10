import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
    // Save the token and redirect to home page
    localStorage.setItem("token", json.token);
    history.push("/login");
    props.showAlert("Account Created Successfully", "success");
    }
    else{
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          //   value={credentials.email}
          onChange={onChange}
          id="name"
          required
          aria-describedby="nameHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          //   value={credentials.email}
          onChange={onChange}
          id="email"
          aria-describedby="emailHelp"
          required
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
          name="password"
          className="form-control"
          //   value={credentials.password}
          onChange={onChange}
          required
          minLength={5}
          id="password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="cpassword"
          className="form-control"
          //   value={credentials.password}
          onChange={onChange}
          required
          minLength={5}
          id="cpassword"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};

export default Signup;
