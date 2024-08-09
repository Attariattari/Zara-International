import React, { useState, useEffect, useContext } from "react";
import { IoMailOutline } from "react-icons/io5";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import "./css.css";
import { userContext } from "../../../../Context/UserContext";
import axios from "axios";

function NewCoustmer() {
  const { token } = useContext(userContext); // Updated: Get token from context
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error("Token is not set");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:1122/user/getallusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const data = response.data;
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error(
            "Expected an array of users in data.users, but got:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="MainArea_Data_Table">
      <div className="New_Customers">
        <div className="New_Customers_Header">
          <p>New Customers</p>
        </div>
        <div className="New_Customers_Main_Data">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="Main_Data_Container">
                <div className="Main_Data_Fisrt">
                  <div className="Main_User_Image">
                    <img src={user.profileImage} alt="Profile" />
                  </div>
                  <div className="Main_Name_Email">
                    <p className="name">{user.firstname}</p>
                    <p className="email">
                      {user.email.length > 16
                        ? `${user.email.substring(0, 16)}...`
                        : user.email}
                    </p>
                  </div>
                </div>
                <div className="Main_Data_Second">
                  <div className="Icons">
                    <IoMailOutline />
                  </div>
                  <div className="Icons">
                    <TiEyeOutline />
                  </div>
                  <div className="Icons">
                    <CiEdit />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewCoustmer;
