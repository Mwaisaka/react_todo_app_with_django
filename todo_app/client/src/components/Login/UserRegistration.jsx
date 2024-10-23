import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Registration({ onLogin, user }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [error, setError] = useState(null);
  const [showErrors, setShowErrors] = useState(false); // State to control when to show errors

  useEffect(() => {
    console.log("FETCH!");
    fetch("/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
        console.log(users);
      });
  }, [refreshPage]);

  function handleSubmit(e) {
    e.preventDefault();
    setShowErrors(true); // Set showErrors to true when the register button is clicked
    const formHasErrors = Object.keys(formik.errors).length > 0;
    if (formHasErrors) {
      // If there are form errors, prevent form submission
      return;
    }

    fetch("http://127.0.0.1:5555/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formik.values.username,
        fullname: formik.values.fullname,
        email: formik.values.email,
        id_number: formik.values.id_number,
        gender: formik.values.gender,
        phone_number: formik.values.phone_number,
        password: formik.values.password,
        confirm_password: formik.values.confirm_password,
      }),
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("User already exists.");
        }
        if (!response.ok) {
          throw new Error("Failed to register user.");
        }
        return response.json();
      })
      .then((user) => {
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
        if (error.message === "User already exists.") {
          // Display specific message for existing user
          setError("User already exists. Please choose a different username.");
        }
      });
  }

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    fullname: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .test("valid-email", "Email must contain @ character", function (value) {
        return value && value.includes("@");
      }),
    id_number: yup.string().required("Id Number is required"),
    gender: yup.string().required("Gender is required"),
    phone_number: yup.string().required("Phone Number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      id_number: "",
      gender: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="login-form-container" style={{ margin: "180px" }}>
      <h2>
        <strong>
          <u>User Sign Up Form</u>
        </strong>
      </h2>
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.username}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Full Name:
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="As per national ID"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.fullname}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="example@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="form-input"
          />
          {showErrors && <p className="error-message">{formik.errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="id_number" className="form-label">
            ID Number:
          </label>
          <input
            id="id_number"
            name="id_number"
            type="text"
            value={formik.values.id_number}
            onChange={formik.handleChange}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.id_number}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <input
            id="gender"
            name="gender"
            type="text"
            placeholder="male/female"
            value={formik.values.gender}
            onChange={formik.handleChange}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.gender}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone_number" className="form-label">
            Phone Number:
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="text"
            placeholder="+254*********"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.phone_number}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password:
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            className="form-input"
          />
          {showErrors && (
            <p className="error-message">{formik.errors.confirm_password}</p>
          )}
        </div>
        {error && <p className="error-message">{error}</p>} <br />
        <div>
          <button
            type="submit"
            // className="submit-button"
            className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Register
          </button>
        </div>
        <br />
      </form>
    </div>
  );
}