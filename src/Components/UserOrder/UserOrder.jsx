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
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
       <div className="sticky top-0 z-10"
      style={{
        marginTop:'-9px'
      }}
      >
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
