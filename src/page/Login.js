import { Form, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function handleOnChange(e) {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();

      localStorage.setItem("token", responseData.token);

      alert("Login successful");
      navigate("/Home");
    } catch (error) {
      console.error("Login Error:", error.message);
      // Handle login error
    }
  }

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-6">
          <div className="card p-3 bg-body-secondary shadow">
            <h3>Login</h3>
            <div className="card-body">
              <Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label d-flex flex-start">Email</label>
                  <input className="form-control" type="text" placeholder="Your Email" onChange={handleOnChange} name="email" value={data.email} />
                </div>
                <div className="mb-3">
                  <label className="form-label d-flex flex-start">Password</label>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <input className="form-control" type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleOnChange} placeholder="Your password" />
                    <div style={{ cursor: "pointer" }} onClick={toggleShowPassword}>
                      <span>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
              </Form>
              <p>Don't have an account? <span className="text-primary"><Link to="/Authan/Register">Sign Up</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
