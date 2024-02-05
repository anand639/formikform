import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./UserProfileForm.css";

// UserProfileForm Component Definition
const UserProfileForm = () => {
  // State to hold the uploaded image URL if any
  const [uploadedImage, setUploadedImage] = useState(null);

  // Function to handle the image file selection and set it for preview
  const handleImageUpload = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file); // Update Formik state with the file object
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Set the uploadedImage State variable
      };
      reader.readAsDataURL(file); // Read the file as data URL for preview
    }
  };

  // The form structure using Formik for state management and validation
  return (
    <Formik
      initialValues={{ name: "", email: "", image: null }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"), // Validation for name
        email: Yup.string()
          .email("Enter a valid email address")
          .required("Email is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission, typically involving API calls
        // For demo, I will log the values and reset the submission state
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form className="form-container">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <Field name="name" type="text" placeholder="Enter your name" />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" placeholder="Enter your email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Profile Picture:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(event) =>
                handleImageUpload(event, formik.setFieldValue)
              }
            />

            {/* Image preview section */}
            {uploadedImage && (
              <div className="circular-image-container">
                <img
                  src={uploadedImage}
                  alt="Profile Preview"
                  style={{ width: "50%", height: "auto" }}
                />
              </div>
            )}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
