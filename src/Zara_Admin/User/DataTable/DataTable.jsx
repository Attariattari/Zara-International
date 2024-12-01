import React, { useContext, useState } from "react";
import "./css.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { userContext } from "../../../Context/UserContext";
import Spinner from "../../../Spinner";
import AddNewUser from "../AddNewUser/AddNewUser";
import Updateuser from "../Update/Updateuser";

function DataTable({ columns, rows, onDeleteUser }) {
  const navigate = useNavigate();
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    open: false,
    Update: false,
    selectedUser: null,
    loading: false, // Updated key to "loading"
  });
  const closePopup = () => {
    setState((prev) => ({
      ...prev,
      Update: false, // Set addnew to true on click
    }));
  };
  const deleteUser = async (user, e) => {
    if (e && e.preventDefault) e.preventDefault();

    try {
      setState((prev) => ({
        ...prev,
        loading: true,
      })); // Start loading

      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      };
      const res = await axios.delete(
        `http://localhost:1122/User/${user.id}`,
        config
      );

      if (res.data.message === "jwt expired") {
        navigate("/Admin/Authenticate");
      } else if (res.status === 200) {
        onDeleteUser(user.id); // Remove user locally upon successful deletion
        Swal.fire({
          title: "Deleted!",
          text: `${
            user.fullName
          } has been successfully deleted. \n\n Server Response: ${
            res.data.message || "No message."
          }`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        if (error.response.status === 401) {
          console.error("Unauthorized: Token may be invalid or expired.");
          navigate("/Admin/Authenticate");
        } else if (error.response.status === 403) {
          console.error(
            "Forbidden: You don’t have permission to delete this user."
          );
        } else {
          console.error("Error deleting user:", errorMessage);
        }
        // Show error in SweetAlert
        Swal.fire({
          title: "Error!",
          text: `Failed to delete user: ${errorMessage}\n\nServer Response: ${
            error.response.data.error || "No additional details."
          }`,
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Network error or server not responding:", error);
        Swal.fire({
          title: "Network Error",
          text: "Server not responding or a network issue occurred.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false,
      })); // Stop loading after request completion
    }
  };

  const showDeleteConfirmation = (fullName, user) => {
    Swal.fire({
      title: `Are you sure you want to delete ${fullName}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user);
      }
    });
  };

  const actionColumn = {
    field: "action",
    headerName: <div className="pl-6">Action</div>,
    width: 100,
    renderCell: (params) => {
      const fullName = `${params.row.firstname || ""} ${
        params.row.lastname || ""
      }`;
      return (
        <div className="action cursor-pointer pl-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              setState((Prev) => ({
                ...Prev,
                Update: true,
                selectedUser: params.row,
              }));
            }}
          >
            <MdOutlineEditNote className="text-2xl text-green-700 hover:border-b-2 border-y-yellow-600" />
          </button>
          <div
            className="delete"
            onClick={() => showDeleteConfirmation(fullName, params.row)}
          >
            <AiTwotoneDelete className="text-2xl text-red-700" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="datatable">
      {state.loading && (
        <div className="spinner-container-Data">
          <Spinner />
        </div>
      )}
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 30,
            },
            components: {
              ExportButton: {
                className: "custom-export-button",
              },
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 200,
              placeholder: "Search users by name, email, or role", // Add placeholder text here
            },
          },
        }}
        pageSizeOptions={[10, 20, 30, 50]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        sx={{
          // Styles for cells, rows, pagination, etc.
          "& .MuiInputBase-input::placeholder": {
            color: "var(--text-color)", // Ensure it matches your theme
            fontStyle: "italic", // Optional styling
          },
          "& .MuiInputBase-input": {
            color: "var(--bg-color)", // Normal input text color
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "var(--cell-bg-color)",
            color: "var(--text-color)",
            fontSize: "0.95rem",
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
            "&:hover": {
              backgroundColor: "var(--cell-hover-bg-color)",
            },
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "var(--hover-bg-color)",
              transition: "background-color 0.3s ease",
            },
            "&.low-stock": {
              backgroundColor: "var(--low-stock-bg-color)",
              color: "#fff",
              fontWeight: 600,
            },
          },
          "& .MuiTablePagination-root": {
            // Pagination styles
            backgroundColor: "var(--pagination-bg-color)",
            color: "var(--text-color)",
            borderTop: "1px solid #e0e0e0",
            overflowX: "hidden",
            padding: "0 10px",
            display: "flex",
            justifyContent: "end",
            paddingRight: "100px",
            "& .MuiTablePagination-toolbar": {
              display: "flex",
              justifyContent: "center",
              gap: "5px",
              flexWrap: "wrap",
            },
            "& .MuiTablePagination-actions": {
              display: "flex",
              alignItems: "center",
              gap: "5px",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
              fontSize: "0.9rem",
            },
            "& .MuiTablePagination-actions button": {
              backgroundColor: "var(--pagination-button-bg-color)",
              borderRadius: "8px",
              padding: "5px 10px",
              minWidth: "32px",
              minHeight: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "var(--text-color)",
              boxShadow: "0 1px 3px var(--shadow-color)",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "var(--pagination-button-hover-bg-color)",
                transform: "scale(1.05)",
              },
              "&:active": {
                transform: "scale(1)",
                boxShadow: "0 2px 5px var(--shadow-color-hover)",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
              },
            },
          },
          "& .MuiInputAdornment-root .MuiButtonBase-root": {
            color: "var(--icon-color)",
            width: "30px",
            borderRadius: "50%",
            transition: "background-color 0.3s, color 0.3s",
            "&:hover": {
              backgroundColor: "var(--icon-hover-bg-color)",
              color: "var(--icon-hover-color)",
              transform: "scale(1.1)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          },
          "& .MuiInputBase-input": {
            color: "var(--input-text-color)",
          },
        }}
        getRowClassName={(params) => (params.row.stock <= 5 ? "low-stock" : "")}
      />
      {state.open && (
        <AddNewUser
          closePopup={closePopup}
          addnew={state.open}
          isUpdate:true
          UserData={state.selectedUser}
          {...state.selectedUser}
        />
      )}
      {state.Update && (
        <Updateuser
          closePopup={closePopup}
          Update={state.Update}
          isUpdate:true
          UserData={state.selectedUser}
          {...state.selectedUser}
        />
      )}
    </div>
  );
}

export default DataTable;
