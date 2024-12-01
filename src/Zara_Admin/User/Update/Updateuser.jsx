import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuPlus } from "react-icons/lu";
import { MdClose } from "react-icons/md"; // import the MdClose icon
import Swal from "sweetalert2";
import GallerySelect from "../../Add Products/Gallery-Select/GallerySelect";
import axios from "axios";
import { userContext } from "../../../Context/UserContext";
import Spinner from "../../../Spinner";

// Define Zod schema with profileImage validation
const userUpdateSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name must have at least 1 character.")
    .optional(),
  lastname: z
    .string()
    .min(1, "Last name must have at least 1 character.")
    .optional(),
  email: z.string().email("Enter a valid email address.").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .optional(),
  phoneno: z
    .string()
    .regex(/^\d{10,15}$/, "Phone number must be 10 to 15 digits.")
    .optional(),
  profileImage: z
    .string()
    .url("Enter a valid URL for the profile image.")
    .optional(),
  pageRoll: z
    .number()
    .int("Page roll must be a whole number.")
    .min(0, "Page roll must be at least 0.")
    .max(1, "Page roll must be 0 (user) or 1 (admin).")
    .optional(),
  verify: z.boolean().optional(),
});

function Updateuser({
  Update,
  closePopup,
  UserData,
  firstname: existingfirstname,
  lastname: existinglastname,
  email: existingemail,
  phoneno: existingphoneno,
  pageRoll: existingpageRoll,
  verify: existingverify,
  profileImage: existingprofileImage,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      firstname: existingfirstname || "",
      lastname: existinglastname || "",
      email: existingemail || "",
      phoneno: existingphoneno || "",
      profileImage: existingprofileImage || "",
      pageRoll: existingpageRoll || 0,
      verify: existingverify || false,
    },
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
      const response = await axios.put(
        `http://localhost:1122/User/Update/${UserData._id}`,
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
          text: response.data.message || "User Update Successfully!",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message || "Update failed.",
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
  useEffect(() => {
    if (existingprofileImage) {
      setState((prevState) => ({
        ...prevState,
        selectuserimage: existingprofileImage, // Set the initial selected image
      }));
    }
  }, [existingprofileImage]); // Runs when existingprofileImage changes

  return (
    <div className="Updateuser">
      {state.loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <Popup
          open={Update}
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
              <p>Update User</p>
              <div className="flex gap-1">
                <button
                  className="Add-now-button"
                  onClick={handleSubmit(onSubmit)}
                >
                  Update User
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
                <label>Page Roll.</label>
                <Controller
                  name="pageRoll"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      } // Convert string to number
                    >
                      <option value={0}>User</option>
                      <option value={1}>Admin</option>
                    </select>
                  )}
                />
                {errors.pageRoll && (
                  <p className="error">{errors.pageRoll.message}</p>
                )}
              </div>

              <div>
                <label>Verified.</label>
                <Controller
                  name="verify"
                  control={control}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <select
                      {...rest}
                      value={value}
                      onChange={(e) => onChange(e.target.value === "true")}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
                {errors.verify && (
                  <p className="error">{errors.verify.message}</p>
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
                          objectFit: "cover",
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
      )}{" "}
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

export default Updateuser;
