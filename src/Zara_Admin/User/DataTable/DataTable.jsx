import React, { useState } from "react";
import "./css.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

function DataTable({ columns, rows, onDeleteUser }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  async function deleteUser(user) {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.delete(`/user/${user.id}`, config);
      if (res.data.message === "jwt expired") {
        return;
      }
      onDeleteUser(user.id);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  function showDeleteConfirmation(fullName, user) {
    Swal.fire({
      title: `Are you sure you want to delete this user ${fullName}?`,
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
  }

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
            onClick={() => {
              setSelectedUser(params.row);
              setOpen(true);
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
              placeholder: "Search here", // Adds placeholder text
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
    </div>
  );
}

export default DataTable;

{
  /* {open && selectedUser && (
        <Updateuser
          slug="user"
          setOpen={setOpen}
          userData={selectedUser} // Pass the selected user data
          {...selectedUser}
        />
      )} */
}
