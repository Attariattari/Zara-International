import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../Context/UserContext';
import axios from 'axios';

const ProtectedRoutes = () => {
  const { user, setUser, Admin, setAdmin } = useContext(userContext);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post(
          'http://localhost:1122/user/checkToken',
          {},
          { withCredentials: true }
        );

        if (response.data.status !== 'success') {
          throw new Error('Token is invalid or expired');
        }
      } catch (error) {
        console.error('Token check failed:', error.message);
        handleLogout();
      }
    };

    const handleLogout = () => {
      setUser({ firstname: '' });
      setAdmin(null);
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      document.cookie = 'token=; Max-Age=0; path=/;';
    };

    checkTokenValidity();
  }, [setUser, setAdmin]);

  if (!Admin) {
    return <Navigate to="/Admin/Autanticate" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
