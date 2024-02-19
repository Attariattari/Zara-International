import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UserOrder() {
  const navigation = useNavigate();
  function gettoken() {
    return localStorage.getItem("token");
  }
  useEffect(() => {
    const token = gettoken();
    if (!token) {
      navigation("/Login");
      return;
    }
  }, []);
  return (
    <div>
      UserOrder
    </div>
  )
}

export default UserOrder
