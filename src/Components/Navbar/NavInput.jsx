import React from "react";
import "./Navbar.css";

function NavInput() {
  // Set this state to true if you want the input to be initially disabled
  const isInputDisabled = true;

  return (
    <div className={`navsearch ${isInputDisabled ? 'disabled' : ''}`}>
      <input
        className="input"
        type="text"
        placeholder="Search"
        disabled={isInputDisabled}
      />
    </div>
  );
}

export default NavInput;
