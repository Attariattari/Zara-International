import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./css.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import { userContext } from "../../../Context/UserContext";

// Validation Schema
const category_Schema = z.object({
  MainCategoryName: z.string().min(4, "Category name is required."),
});
const Sub_category_Schema = z.object({
  MainCategory_id: z.string().min(1, "Category id is required"),
  SubMainCategory: z.string().min(1, "Sub-Category id is required"),
});
const Child_category_Schema = z.object({
  SubMainCategory_id: z.string().min(1, "Sub-Category id is required"),
  ChildSubCategory: z.string().min(1, "Child-Category id is required"),
});

const Add = ({ closePopup, type }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(category_Schema),
  });

  const { token } = useContext(userContext);
  const [loading, setLoading] = useState(false); // Loading state

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      switch (type) {
        case "category":
          response = await axios.post(
            "http://localhost:1122/MainCategory/Create",
            data,
            {
              withCredentials: true,
              headers: { Authenticate: `Bearer ${token}` },
            }
          );
          break;

        case "subcategory":
          response = await axios.post(
            "http://localhost:1122/SubMainCategory/Create",
            { SubMainCategory: data.MainCategoryName }, // Adjust payload for subcategory
            {
              withCredentials: true,
              headers: { Authenticate: `Bearer ${token}` },
            }
          );
          break;

        case "childcategory":
          response = await axios.post(
            "http://localhost:1122/ChildSubCategory/Create",
            { ChildSubCategory: data.MainCategoryName }, // Adjust payload for child category
            {
              withCredentials: true,
              headers: { Authenticate: `Bearer ${token}` },
            }
          );
          break;

        default:
          throw new Error("Invalid type");
      }

      Swal.fire({
        icon: "success",
        title: `${
          type === "category"
            ? "Category"
            : type === "subcategory"
            ? "Sub Category"
            : "Child Category"
        } Added Successfully!`,
        text: `Name: ${data.MainCategoryName}`,
      });

      reset(); // Clear form
      closePopup(); // Close popup
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get Content for Popup
  const getPopupContent = () => {
    const title =
      type === "category"
        ? "Add Main Category"
        : type === "subcategory"
        ? "Add Sub Category"
        : "Add Child Category";

    return (
      <div className="category-area">
        <div className="category-topbar">{title}</div>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="category-body">
            <div>
              <label>
                {type === "category"
                  ? "Category Name"
                  : type === "subcategory"
                  ? "Sub Category Name"
                  : "Child Category Name"}
              </label>
              <Controller
                name="MainCategoryName"
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Enter Name" />
                )}
              />
              {errors.MainCategoryName && (
                <p className="error">{errors.MainCategoryName.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="Add-now-button"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="add">
      <Popup
        open={!!type} // Show popup if type is truthy
        onClose={closePopup}
        modal
        lockScroll
        overlayClassName="popup-overlay"
        contentStyle={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          width: "400px",
          minWidth: "auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          height: "450px",
          borderRadius: "0px",
          overflowY: "auto",
          padding: "0px",
        }}
      >
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          getPopupContent()
        )}
      </Popup>
    </div>
  );
};

export default Add;

// import React, { useContext, useState } from "react";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import "./css.css";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { userContext } from "../../../Context/UserContext";

// const category_Schema = z.object({
//   MainCategoryName: z.string().min(4, "Category name is required."),
// });

// const Add = ({ closePopup, type }) => {
//   const {
//     control,
//     handlesubmit,
//     formState: { error },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(category_Schema),
//   });

//   const { token } = useContext(userContext);

//   const [state, setState] = useState({
//     category: "",
//   });

//   const onSubmit = async (data, e) => {
//     e.preventDefault();
//   };

//   const getPopupContent = () => {
//     switch (type) {
//       case "category":
//         return (
//           <div className="category-area">
//             <div className="category-topbar">Add Main Category</div>
//             <form className="user-form">
//               <div className="category-body">
//                 <div>
//                   <label>Category Name</label>
//                   <Controller
//                     name="MainCategoryName"
//                     control={control}
//                     render={({ field }) => (
//                       <input {...field} placeholder="First Name" />
//                     )}
//                   />
//                   {error.MainCategoryName && (
//                     <p className="error">{error.MainCategoryName.message}</p>
//                   )}
//                 </div>
//                 <button
//                   className="Add-now-button"
//                   onClick={handlesubmit(onSubmit)}
//                 >
//                   Add Category
//                 </button>
//               </div>
//             </form>
//           </div>
//         );
//       case "subcategory":
//         return (
//           <div className="category-area">
//             <div className="category-topbar">Add Sub Category</div>
//             <div className="category-body">Add Sub Category Content</div>
//           </div>
//         );
//       case "childcategory":
//         return (
//           <div className="category-area">
//             <div className="category-topbar">Add Child Category</div>
//             <div className="category-body">Add Child Category Content</div>
//           </div>
//         );
//       default:
//         return <div>No Content Available</div>;
//     }
//   };

//   return (
//     <div className="add">
//       <Popup
//         open={!!type} // Check if type is truthy
//         onClose={closePopup}
//         modal
//         lockScroll
//         overlayClassName="popup-overlay"
//         contentStyle={{
//           backgroundColor: "var(--bg-color)",
//           color: "var(--text-color)",
//           width: "400px",
//           minWidth: "auto",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
//           height: "450px",
//           borderRadius: "0px",
//           overflowY: "auto",
//           padding: "0px",
//         }}
//       >
//         {getPopupContent()}
//       </Popup>
//     </div>
//   );
// };

// export default Add;
