import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

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
       <div className="sticky top-0 z-10">
        <div className="absolute w-full bg-white">
          <Navbar />
        </div>
      </div>
      <div className='pt-32'>
      UserOrder</div>
    </div>
  )
}

export default UserOrder
