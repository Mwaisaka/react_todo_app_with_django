import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ToDoApp1 from "../Images/ToDoApp1.png";
// import "./Login.css";

export default function Registration({ onLogin, user }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [error, setError] = useState(null);
  const [setSuccess, setSetSuccess] = useState(false);
  const [showErrors, setShowErrors] = useState(false); // State to control when to show errors

  // useEffect(() => {
  //   console.log("FETCH!");
  //   fetch("/users")
  //     .then((res) => res.json())
  //     .then((users) => {
  //       setUsers(users);
  //       console.log(users);
  //     });
  // }, [refreshPage]);

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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setShowErrors(true); // Set showErrors to true when the register button is clicked
  //   const formHasErrors = Object.keys(formik.errors).length > 0;
  //   if (formHasErrors) {
  //     // If there are form errors, prevent form submission
  //     return;
  //   }

  //   fetch("http://127.0.0.1:5555/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: formik.values.username,
  //       fullname: formik.values.fullname,
  //       email: formik.values.email,
  //       id_number: formik.values.id_number,
  //       gender: formik.values.gender,
  //       phone_number: formik.values.phone_number,
  //       password: formik.values.password,
  //       confirm_password: formik.values.confirm_password,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status === 500) {
  //         throw new Error("User already exists.");
  //       }
  //       if (!response.ok) {
  //         throw new Error("Failed to register user.");
  //       }
  //       return response.json();
  //     })
  //     .then((user) => {
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       if (error.message === "User already exists.") {
  //         // Display specific message for existing user
  //         setError("User already exists. Please choose a different username.");
  //       }
  //     });
  // }

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     fullname: "",
  //     email: "",
  //     id_number: "",
  //     gender: "",
  //     phone_number: "",
  //     password: "",
  //     confirm_password: "",
  //   },
  //   validationSchema: formSchema,
  //   onSubmit: handleSubmit,
  // });

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
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5555/user-registration", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
            setError(
              "User already exists. Please choose a different username."
            );
          }
        });
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
              <label htmlFor="id_number" className="form-label mb-2 text-left">
                ID Number:
              </label>
              <input
                id="id_number"
                name="id_number"
                type="text"
                value={formik.values.id_number}
                onChange={formik.handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
               {formik.touched.id_number && formik.errors.id_number && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.id_number}
                </div>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label htmlFor="gender" className="form-label mb-2 text-left">
                Gender:
              </label>
              <input
                id="gender"
                name="gender"
                type="text"
                placeholder="male/female"
                value={formik.values.gender}
                onChange={formik.handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.gender && formik.errors.gender && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.gender}
                </div>
              )}
            </div>
            <div className="form-group flex flex-col mb-4">
              <label
                htmlFor="phone_number"
                className="form-label mb-2 text-left"
              >
                Phone Number:
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                placeholder="+254*********"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.phone_number}
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
              {formik.touched.confirm_password && formik.errors.confirm_password && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.confirm_password}
                </div>
              )}
            </div>
            {error && <p className="error-message">{error}</p>} <br />
            {setSuccess && <div>User has been set up successfully!</div>}
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
      </div>
    </div>
  );
}
