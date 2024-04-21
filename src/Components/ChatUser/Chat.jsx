import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
function Chat({ toggleChatUnVisibility }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [openUploader, setOpenUploader] = useState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const UploadImage = () => {
    setOpenUploader(true); // Set openUploader to true when upload icon is clicked
  };
  const UploadUnImage = () => {
    setOpenUploader(false); // Set openUploader to true when upload icon is clicked
  };

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
      <div className="Chat_Message">
        <div className="Chat_Date">
          <span>Today</span>
        </div>
        <div className="Chat_MainSms">
          {" "}
          {messages.map((msg, index) => (
            <div key={index} className="Chat_Message_Text">
              {msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="Chat_Policy_Cokkies">
          By joining the Zara.com chat, you confirm that you have read and
          understand our <span>Privacy and Cookies Policy</span>
        </div>
      </div>
      <div className="Chat_Input">
        <div>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
            class="chat-writer__icon"
            alt="More options"
            onClick={UploadImage}
          >
            <path d="M12.5 11.5V5h-1v6.5H5v1h6.5V19h1v-6.5H19v-1h-6.5Z"></path>
          </svg>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message"
        />
        <div>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
            class="chat-writer__icon"
            alt="Send"
            onClick={handleSendMessage}
          >
            <path d="M20 11.487 12 4l-8 7.487.646.605 6.897-6.455V20h.914V5.637l6.897 6.455.646-.605Z"></path>
          </svg>
        </div>
      </div>
      {openUploader && (
        <div>
          <svg
            class="shop-cart-item-actions__action-icon cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
            onClick={UploadUnImage}
          >
            <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
          </svg>
          <input type="file" name="Image video" id="" />
        </div>
      )}
    </div>
  );
}

export default Chat;
