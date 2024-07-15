import React, { useState } from "react";
import "./Authanticate.css";

const VerificationInput = ({ onComplete }) => {
  const length = 6;
  const [code, setCode] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }

    if (newCode.join("").length === length) {
      const verificationCode = newCode.join("");
      onComplete(verificationCode); // Pass the verification code to the parent component
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "10px" }}
      className="verificationinputs"
    >
      {code.map((_, index) => (
        <input
          key={index}
          id={`input-${index}`}
          type="text"
          maxLength="1"
          value={code[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) =>
            e.key === "Backspace" && handleBackspace(e.target, index)
          }
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "20px",
            borderRadius: "5px",
            border: "1px solid white",
            backgroundColor: "black",
            color: "white",
            caretColor: "white",
          }}
        />
      ))}
    </div>
  );
};

export default VerificationInput;
