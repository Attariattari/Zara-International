import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./css.css";
import { LuPlus } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // import the MdClose icon
import Swal from "sweetalert2";
import GallerySelect from "../../Add Products/Gallery-Select/GallerySelect";
import axios from "axios";
import { userContext, UserContextProvider } from "../../../Context/UserContext";
import Spinner from "../../../Spinner";

// Define Zod schema with profileImage validation
const userSchema = z.object({
  firstname: z.string().min(1, "First name is required."),
  lastname: z.string().min(1, "Last name is required."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phoneno: z.string().regex(/^\d{10,15}$/, "Enter a valid phone number."),
  profileImage: z
    .string()
    .url("Enter a valid URL for the profile image.")
    .optional(),
});

function AddNewUser({ addnew, closePopup }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const { token } = useContext(userContext);

  const [state, setState] = useState({
    selectuserimage: null,
    ProfileGallery: false,
    loading: false,
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true })); // Set loading to true

    try {
      const response = await axios.post(
        "http://localhost:1122/User/registerUser",
        data,
        {
          withCredentials: true,
          headers: {
            Authenticate: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message || "User Created Successfully!",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message || "Registration failed.",
          confirmButtonText: "OK",
        });
      }

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonText: "OK",
      });
    } finally {
      setState((prevState) => ({ ...prevState, loading: false })); // Set loading to false after request completes
      closePopup();
    }
  };
  const handleGallery = () => {
    if (!state.selectuserimage) {
      setState((prevState) => ({
        ...prevState,
        ProfileGallery: true, // Open the gallery
      }));
    }
  };

  const handleProfileImage = (imageURL) => {
    setValue("profileImage", imageURL); // Set profile image URL
    setState((prevState) => ({
      ...prevState,
      selectuserimage: imageURL, // Update selected image state
      ProfileGallery: false, // Close the gallery after selection
    }));
  };

  const handleImageUnSelect = () => {
    setValue("profileImage", ""); // Clear the profile image URL
    setState((prevState) => ({
      ...prevState,
      selectuserimage: null, // Unselect the image
      ProfileGallery: true, // Reopen gallery for re-selection
    }));
  };

  return (
    <div className="addnewuser">
      {state.loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <Popup
          open={addnew}
          onClose={closePopup}
          closeOnDocumentClick={false}
          modal
          lockScroll
          overlayClassName="popup-overlay"
          contentStyle={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            width: "900px",
            minWidth: "auto",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            height: "500px",
            borderRadius: "0px",
            overflowY: "auto",
            padding: "0px",
          }}
        >
          <div className="user-form-area">
            <div className="user-form-area-topbar">
              <p>Add New User.</p>
              <div className="flex gap-1">
                <button
                  className="Add-now-button"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add User.
                </button>
                <button
                  className="Add-now-button w-10 hover:text-red-900"
                  onClick={closePopup}
                >
                  X
                </button>
              </div>
            </div>
            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>First Name.</label>
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="First Name" />
                  )}
                />
                {errors.firstname && (
                  <p className="error">{errors.firstname.message}</p>
                )}
              </div>

              <div>
                <label>Last Name.</label>
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="Last Name" />
                  )}
                />
                {errors.lastname && (
                  <p className="error">{errors.lastname.message}</p>
                )}
              </div>

              <div>
                <label>Email.</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="Email" type="email" />
                  )}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label>Password.</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="Password" type="password" />
                  )}
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label>Phone Number.</label>
                <Controller
                  name="phoneno"
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="Phone Number" />
                  )}
                />
                {errors.phoneno && (
                  <p className="error">{errors.phoneno.message}</p>
                )}
              </div>

              <div>
                <label>Select Profile Image.</label>
                <div
                  className="user-form-area-image"
                  onClick={handleGallery} // Open gallery when clicked
                >
                  {state.selectuserimage ? (
                    <>
                      <img
                        className="user-form-area-Image-Slected"
                        src={state.selectuserimage}
                        alt="Selected Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fit",
                          objectposition: "top",
                        }}
                      />
                      <div className="user-form-area-Image-unSlected-parent">
                        <p
                          className="user-form-area-Image-unSlected"
                          title="Remove"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering gallery
                            handleImageUnSelect();
                          }}
                        >
                          <MdClose />
                        </p>
                      </div>
                    </>
                  ) : (
                    <LuPlus
                      title="Add Profile Image"
                      className="user-form-area-main-Plus"
                    />
                  )}
                </div>
                {errors.profileImage && (
                  <span>{errors.profileImage.message}</span>
                )}
              </div>
            </form>
          </div>
        </Popup>
      )}
      {state.ProfileGallery && (
        <GallerySelect
          handleGalleryfalse={() =>
            setState((prevState) => ({ ...prevState, ProfileGallery: false }))
          }
          onSelectProfileImage={handleProfileImage}
          isprofileimage={true}
        />
      )}
    </div>
  );
}

export default AddNewUser;
