import React from "react";
import "./Chat.css";
function Chat({ toggleChatUnVisibility }) {
  return (
    <div className="Chat">
      <div className=" Chat_Header">
        <svg
          class="shop-cart-item-actions__action-icon cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="inherit"
          stroke="inherit"
          onClick={toggleChatUnVisibility}
        >
          <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
        </svg>
        <div>Chat</div>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill="inherit"
          stroke="inherit"
          class="chat-panel__minimize-svg cursor-pointer"
          aria-label="_minimize-icon_"
          alt="Minimise chat"
          onClick={toggleChatUnVisibility}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.336 12 8.624 4.33l.752-.66L16.665 12l-7.289 8.33-.752-.66L15.336 12Z"
          ></path>
        </svg>
      </div>
      <div className="Chat_Message"> Message</div>
      <div className="Chat_Input">Enter SMS</div>
    </div>
  );
}

export default Chat;
