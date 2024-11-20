import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./css.css";
import Spinner from "../../Spinner";
import DataTable from "./DataTable/DataTable";
import { AiOutlineProduct } from "react-icons/ai";
import { userContext } from "../../Context/UserContext";
import AddNewUser from "./AddNewUser/AddNewUser";

function User() {
  const navigate = useNavigate();
  const { token } = useContext(userContext);

  // Combined state management, including filters
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    error: null,
    verifiedFilter: "all",
    roleFilter: "all",
    addnew: false, // Initial state set to false
  });
  const [pollingInterval] = useState(5000);

  // Table columns configuration
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "profileImage",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => (
        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "var(--avatar-bg-color)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
          }}
        >
          {params.row.profileImage ? (
            <img
              src={params.row.profileImage}
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "fallback_image_url";
              }}
            />
          ) : (
            <FaUserCircle
              style={{
                width: "80%",
                height: "80%",
                color: "var(--icon-color)",
              }}
            />
          )}
        </div>
      ),
    },
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 150,
    },
    { field: "email", type: "string", headerName: "Email", width: 200 },
    { field: "phoneno", type: "string", headerName: "Phone", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 90, type: "string" },
    {
      field: "verify",
      headerName: "Verified",
      width: 70,
      type: "boolean",
      renderCell: (params) => (
        <div
          className={`verification-status ${
            params.value ? "verified" : "unverified"
          }`}
        >
          {params.value ? "Yes" : "No"}
        </div>
      ),
    },
    {
      field: "pageRoll",
      headerName: "Role",
      width: 70,
      type: "number",
      renderCell: (params) => (
        <div>
          {params.row.pageRoll === 0
            ? "User"
            : params.row.pageRoll === 1
            ? "Admin"
            : "Unknown"}
        </div>
      ),
    },
  ];

  // Fetch user data with axios
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authenticate: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      const response = await axios.get(
        "http://localhost:1122/User/getallusers",
        config
      );
      setState((prev) => ({
        ...prev,
        data: response.data,
        isLoading: false,
      }));
    } catch (error) {
      if (error.response?.data.message === "jwt expired") {
        navigate("/Admin/Authenticate");
      } else {
        setState((prev) => ({
          ...prev,
          error: error.message,
          isLoading: false,
        }));
      }
    }
  };

  const handleDeleteUser = (userId) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        users: prev.data.users.filter((user) => user._id !== userId),
      },
    }));
  };
  useEffect(() => {
    fetchData();
    const pollingId = setInterval(fetchData, pollingInterval);
    return () => clearInterval(pollingId);
  }, [pollingInterval, token]);

  // Filtered user data based on verified and role filters
  const filteredUsers = state.data?.users.filter((user) => {
    const verifiedMatch =
      state.verifiedFilter === "all" ||
      (state.verifiedFilter === "verified" && user.verify) ||
      (state.verifiedFilter === "unverified" && !user.verify);

    const roleMatch =
      state.roleFilter === "all" ||
      (state.roleFilter === "admin" && user.pageRoll === 1) ||
      (state.roleFilter === "user" && user.pageRoll === 0);

    return verifiedMatch && roleMatch;
  });

  const handleAddNewUser = (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      addnew: true, // Set addnew to true on click
    }));
  };

  const closePopup = () => {
    setState((prev) => ({
      ...prev,
      addnew: false, // Set addnew to true on click
    }));
  };

  return (
    <div className="users -mt-3">
      <div className="info">
        <div className="users-area-topbar">
          <div className="users-area-topbar-title">
            <AiOutlineProduct className="users-area-topbar-title-icon" />
            <p>Manage Users</p>
          </div>
          <div className="user-filer-new">
            <div className="filter-container">
              <label htmlFor="">Filter Users</label>
              <select
                value={state.verifiedFilter}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    verifiedFilter: e.target.value,
                    roleFilter: "all", // Reset roleFilter to "all" when verifiedFilter is changed
                  }))
                }
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>

              <select
                value={state.roleFilter}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    roleFilter: e.target.value,
                    verifiedFilter: "all", // Reset verifiedFilter to "all" when roleFilter is changed
                  }))
                }
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="users-area-topbar-Button-parent">
              <p
                className="users-area-topbar-Button-button"
                onClick={handleAddNewUser} // Corrected the onClick typo
              >
                Add New User
              </p>
            </div>
          </div>
        </div>
      </div>

      {state.isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : state.error ? (
        <div>Error loading data: {state.error}</div>
      ) : (
        <DataTable
          slug="Product"
          columns={columns}
          rows={filteredUsers.map((user) => ({
            id: user._id,
            ...user,
            fullName: `${user.firstname || ""} ${user.lastname || ""}`,
          }))}
          onDeleteUser={handleDeleteUser}
        />
      )}
      {state.addnew && (
        <AddNewUser addnew={state.addnew} closePopup={closePopup} />
      )}
    </div>
  );
}

export default User;

// import React from "react";
// import './css.css'
// function User() {
//   return (
//     <div>
//       <ul className="menu cf">
//         <li>
//           <a href>Menu item</a>
//           <ul className="submenu">
//             <li>
//               <a href>Submenu item</a>
//             </li>
//             <li>
//               <a href>Submenu item</a>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <a href>Menu item</a>
//           <ul className="submenu">
//             <li>
//               <a href>Submenu item</a>
//             </li>
//             <li>
//               <a href>Submenu item</a>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default User;
