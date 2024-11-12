import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ToDoApp1 from "../Images/ToDoApp1.png";

export default function Registration({ onLogin, user }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

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
      password: "",
      confirm_password: "",
    },
    validationSchema: formSchema,
    onSubmit: () => {
      fetch(`${API_URL}/add_subscriber/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formik.values),
        // body: JSON.stringify({
        //           username: formik.values.username,
        //           fullname: formik.values.fullname,
        //           email: formik.values.email,
        //           password: formik.values.password,
        //           confirm_password: formik.values.confirm_password,
        //         }),
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
          // setSuccess(true);
          // navigate("/login");
          setSuccess(true); // Display success message
          setTimeout(() => navigate("/login"), 2000); // Delay navigation by 1.5 seconds
        })
        .catch((error) => {
          setError(error.message);
          if (error.message === "User already exists.") {
            setError(
              "User already exists. Please choose a different username."
            );
          }
        });
    },
  });

  return (
    <div
      className="pt-1 px-16 py-6 mt-4 mb-4"
      style={{
        backgroundImage: `url(${ToDoApp1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="rounded overflow-hidden shadow-none px-6 py-2"
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          width: "100%",
        }}
      >
        <div className="bg-gray-100 py-3 px-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            User Sign Up Form
            <hr
              className="border-t-2 border-red-700 mb-1 py-1"
              style={{ width: "20%", margin: "15px auto" }}
            />
          </h2>
        </div>
        <div
          className="bg-gray-100 py-6 mt-8"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{ margin: "20px", width: "100%", height: "auto" }}
          >
            <div className="form-group flex flex-col mb-4">
              <label htmlFor="username" className="form-label mb-2 text-left">
                Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label htmlFor="fullname" className="form-label mb-2 text-left">
                Full Name:
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="As per national ID"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.fullname}
                </div>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label htmlFor="email" className="form-label mb-2 text-left">
                Email Address:
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="example@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label htmlFor="password" className="form-label mb-2 text-left">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label
                htmlFor="confirm_password"
                className="form-label mb-2 text-left"
              >
                Confirm Password:
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <div className="error-message text-red-500 mt-2">
                    {formik.errors.confirm_password}
                  </div>
                )}
            </div>
            {error && <p className="error-message">{error}</p>} <br />
            {success && (
              <div className="success-message text-green-500 mb-1">
                User has been set up successfully!
              </div>
            )}
            <div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                Register
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}