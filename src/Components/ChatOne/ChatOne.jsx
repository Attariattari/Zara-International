import React, { useEffect, useRef, useState } from "react";
import "./ChatOne.css";
import Swal from "sweetalert2";
function ChatOne({ toggleChatOneUnVisibility }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    return storedMessages || [];
  });
  const [Close, setClose] = useState();
  const [receivedMessages, setReceivedMessages] = useState(() => {
    const storedReceivedMessages = JSON.parse(
      localStorage.getItem("chatMessagesOne")
    );
    return storedReceivedMessages || [];
  });

  const [openUploader, setOpenUploader] = useState();
  const [Image, setImage] = useState();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const senderName = "Moon";
  const receiverName = "Muhyo Tech";

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (storedMessages) {
      setMessages(storedMessages);
    }
    scrollToBottom();
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const currentDate = new Date(); // Get current date and time
      const newMessage = { 
        text: message, 
        sender: senderName,
        date: currentDate.toISOString() // Convert date to ISO string for storage
      }; 
      setMessages([...messages, newMessage]);
      localStorage.setItem("chatMessages", JSON.stringify([...messages, newMessage])); // Save to localStorage
      setMessage("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const currentDate = new Date();
      reader.onload = () => {
        const newMessage = { 
          image: reader.result, 
          sender: senderName,
          date: currentDate.toLocaleString() // Include date in the message
        };
        setMessages([...messages, newMessage]);
        localStorage.setItem("chatMessages", JSON.stringify([...messages, newMessage])); // Save to localStorage
        setOpenUploader(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const currentDate = new Date();
      const reader = new FileReader();
      reader.onload = () => {
        const newMessage = { 
          image: reader.result, 
          sender: senderName,
          date: currentDate.toLocaleString() // Include date in the message
        };
        setMessages([...messages, newMessage]);
        localStorage.setItem("chatMessages", JSON.stringify([...messages, newMessage])); // Save to localStorage
        setOpenUploader(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const UploadImage = () => {
    setOpenUploader(true);
  };

  const UploadUnImage = () => {
    setOpenUploader(false);
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const showImageModal = (imageData) => {
    Swal.fire({
      imageUrl: imageData,
      imageAlt: "Selected Image",
      showConfirmButton: false,
      allowOutsideClick: true,
      customClass: {
        popup: "custom-size",
        image: "custom-image",
      },
    });
  };
  const handleConfirmClose = () => {
    setClose(true);
  };
  const handleConfirmFalse = () => {
    setClose(false);
  };
  const handleConfirmFalseAndDlete = () => {
    setClose(false); // Step 2: Hide confirmation dialog
    localStorage.removeItem("chatMessages"); // Remove chat messages from local storage
    toggleChatOneUnVisibility(); // Hide the chat
  };
  return (
    <div className="ChatOne">
      <div className="Chat_Child">
        <div className=" Chat_Header">
          <svg
            class="shop-cart-item-actions__action-icon cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
            onClick={handleConfirmClose}
          >
            <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
          </svg>
          <div>ChatOne</div>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
            class="chat-panel__minimize-svg cursor-pointer"
            aria-label="_minimize-icon_"
            alt="Minimise chat"
            onClick={toggleChatOneUnVisibility}
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`Chat_Message_Text ${
                  msg.sender === senderName ? "sent" : "received"
                }`}
              >
                <div className="message-sender">{msg.sender}</div>
                {msg.text ? (
                  <div>{msg.text}</div>
                ) : (
                  <>
                    <img
                      src={msg.image}
                      alt={msg.sender === senderName ? "Sent" : "Received"}
                      className="chat-image"
                    />
                    <div className="message-icons">
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="inherit"
                        stroke="inherit"
                        className="message-image-block__image-zoom-selector-icon cursor-pointer"
                        aria-hidden="true"
                        alt="zoom"
                        onClick={() => showImageModal(msg.image)}
                      >
                        <path d="M9.7 10.7h-3v-1h3v-3h1v3h3v1h-3v3h-1v-3Z"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.7 10.2a6.5 6.5 0 1 1 11.436 4.23l5.018 5.017-.708.707-5.017-5.018A6.5 6.5 0 0 1 3.7 10.2Zm6.5-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
                        ></path>
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
            {receivedMessages.map((msg, index) => (
              <div key={index} className={`Chat_Message_Text left`}>
                <div className="message-sender">{receiverName}</div>
                {msg.text ? (
                  <div>{msg.text}</div>
                ) : (
                  <>
                    <img
                      src={msg.image}
                      alt="Received"
                      className="chat-image"
                    />
                    <div className="message-icons">
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="inherit"
                        stroke="inherit"
                        className="message-image-block__image-zoom-selector-icon cursor-pointer"
                        aria-hidden="true"
                        alt="zoom"
                        onClick={() => showImageModal(msg.image)}
                      >
                        <path d="M9.7 10.7h-3v-1h3v-3h1v3h3v1h-3v3h-1v-3Z"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.7 10.2a6.5 6.5 0 1 1 11.436 4.23l5.018 5.017-.708.707-5.017-5.018A6.5 6.5 0 0 1 3.7 10.2Zm6.5-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
                        ></path>
                      </svg>
                    </div>
                  </>
                )}
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
            onKeyDown={handleKeyDown}
          />
          <div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
              className="chat-writer__icon"
              alt="Send"
              onClick={handleSendMessage}
              style={{
                cursor: message.trim() !== "" ? "pointer" : "not-allowed",
              }}
              disabled={message.trim() === ""}
            >
              <path d="M20 11.487 12 4l-8 7.487.646.605 6.897-6.455V20h.914V5.637l6.897 6.455.646-.605Z"></path>
            </svg>
          </div>
        </div>
        {openUploader && (
          <div className="imageuploader">
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
            <div
              className="inputArea"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <svg
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                stroke="inherit"
                alt="Drag and drop the file to upload it"
                class="chat-upload-picture-action-std__image"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.6 10.7a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm-1.1 2.1a1.1 1.1 0 1 1 2.2 0 1.1 1.1 0 0 1-2.2 0Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.5 6.7h25v18.6h-25V6.7Zm1 1v15.893l6.7-6.7 3.2 3.2 8-8 5.1 5.1V7.7h-23Zm23 16.6H5.207l5.993-5.993 3.2 3.2 8-8 5.1 5.1V24.3Z"
                ></path>
              </svg>
              <p>Drag and drop the file to upload it</p>
              <button onClick={openFileInput}>SELECT FILE</button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}
        {Image && (
          <div className="selected-image-container">
            <img src={Image} alt="Selected" className="selected-image" />
          </div>
        )}
        {Close && (
          <div className="ConformationClose">
            <div className="closepopup">
              <div className="Heading_title"> 
                <p>DO YOU WANT TO CLOSE THE CHAT?</p>
                <p>If you close it, you will lose this conversation</p>
              </div>
              <div className="CloseButtons">
                <button onClick={handleConfirmFalse}>Cancel</button>
                <button onClick={handleConfirmFalseAndDlete}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatOne;
