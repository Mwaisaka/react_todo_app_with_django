import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ToDoApp1 from "../Images/ToDoApp1.png";

export default function Login({ onLogin, user }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // const API_URL = process.env.REACT_APP_API_URL;
  const API_URL = "http://127.0.0.1:8000";

  // Validation Schema for form inputs
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: ({ username, password }, { setSubmitting }) => {
      fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error("Both username and password are required.");
            } else {
              throw new Error("Invalid username or password.");
            }
          }
          return response.json();
        })
        .then((user) => {
          const { token, subscriber } = user;
          localStorage.setItem("authToken", token); // Store the token in localStorage
          onLogin(subscriber); // Call onLogin with user data for state update
          console.log("Current user logged in is:", subscriber.fullname);
          console.log("Token after logging in is:", token);
          // onLogin(user); // Call the onLogin prop with the user data
          // console.log("Current user logged in is:", user.subscriber.fullname);
          navigate("/todo"); // Navigate to the ToDo page on success
          // setRefreshPage(!refreshPage); // Trigger a re-fetch if needed
        })
        .catch((err) => {
          setError(err.message); // Set error message if login fails
        })
        .finally(() => {
          setSubmitting(false); // Re-enable the form submission button
        });

      // setSubmitting(false); // Re-enable the form submission button
    },
  });

  return (
    <div
      className="pt-1 px-12 py-6 mt-4 mb-4"
      style={{
        backgroundImage: `url(${ToDoApp1})`,
        backgroundSize: "cover", // Cover the entire area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent tiling
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
        <div className="bg-gray-100 py-3">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Login Form
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
            onSubmit={formik.handleSubmit} // Use Formik's handleSubmit
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
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} // To show error after blur
                value={formik.values.username}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="error-message text-red-500 mt-2">
                  {formik.errors.username}
                </p>
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
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error-message text-red-500 mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {error && (
              <p className="error-message text-red-500 mt-4 text-center">
                {error}
              </p>
            )}

            <div className="button-group mt-6 text-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </button>
              <div className="button-group mt-6 text-center">
                <Link to="/reset-password" className="forgot-password">
                  Forgot your Password?
                </Link>
              </div>
            </div>
            <div className="button-group mt-6 text-center">
              <p>
                Don't have an account? Click
                <Link
                  to="/user-registration"
                  className="text-blue-500 hover:underline mr-1 ml-1"
                >
                  here{" "}
                </Link>
                to sign up...
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
