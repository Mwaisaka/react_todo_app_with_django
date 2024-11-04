import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoApp1 from "../Images/ToDoApp1.png";
// import "./ResetPassword.css";

export default function ResetPassword() {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .test("valid-email", "Email must contain @ character", function (value) {
        return value && value.includes("@");
      }),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(6, "New Password must be at least 6 characters"),
    confirmNewPassword: yup
      .string()
      .required("Confirm New Password is required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://127.0.0.1:8000/reset_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            setResetSuccess(true);
            setResetError(null);
            navigate("/login"); // Redirect to login page after successful reset
          } else {
            setResetSuccess(false);
            setResetError("Failed to reset password.");
          }
        })
        .catch((error) => {
          setResetSuccess(false);
          setResetError("An error occurred while resetting password.");
        });
    },
  });

  return (
    <div
      className="pt-1 px-16 py-6 mt-4 mb-4"
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
        <div className="bg-gray-100 py-3 px-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Reset Password
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
              <label htmlFor="email" className="form-label mb-2 text-left">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="form-group flex flex-col mb-4">
              <label
                htmlFor="newPassword"
                className="form-label mb-2 text-left"
              >
                New Password:
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="error-message text-red-500 mt-2">
                  {formik.errors.newPassword}
                </div>
              )}
            </div>

            <div className="form-group flex flex-col mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="form-label mb-2 text-left"
              >
                Confirm New Password:
              </label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmNewPassword}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword && (
                  <div className="error-message text-red-500 mt-2">
                    {formik.errors.confirmNewPassword}
                  </div>
                )}
            </div>

            {resetError && <div>{resetError}</div>}
            {resetSuccess && <div>Password reset successfully!</div>}

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
