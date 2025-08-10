import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ReactTyped } from "react-typed";
import QRCode from "qrcode.react";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [waLink, setWaLink] = useState("");
  const [message, setMessage] = useState(""); // State for message text
  const [showMessage, setShowMessage] = useState(false); // State for toggling message box

  const [noticeMessageGenerate, setNoticeMessageGenerate] = useState("");
  const [noticeVisibleGenerate, setNoticeVisibleGenerate] = useState(false);

  const [noticeMessageCopy, setNoticeMessageCopy] = useState("");
  const [noticeVisibleCopy, setNoticeVisibleCopy] = useState(false);

  const [noticeMessageError, setNoticeMessageError] = useState("");
  const [noticeVisibleError, setNoticeVisibleError] = useState(false);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setWaLink("");
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value); // Update message state
    setWaLink("");
  };

  const toggleMessage = () => {
    if (!showMessage) {
      setMessage(""); // Clear message content if showing message box
    }
    setShowMessage(!showMessage); // Toggle message box visibility
  };

  useEffect(() => {
    setNoticeVisibleGenerate(false);
  }, []);

  const generateLink = () => {
    if (phoneNumber) {
      let link = `https://wa.me/${phoneNumber}`;
      if (showMessage && message.trim() !== "") {
        const encodedMessage = encodeURIComponent(message);
        link += `?text=${encodedMessage}`;
      }
      setWaLink(link);
      setNoticeMessageGenerate("Link generated successfully!");
      setNoticeVisibleGenerate(true);
      setNoticeVisibleCopy(false); // Reset copy notice visibility
      setNoticeVisibleError(false);
      setTimeout(() => {
        setNoticeVisibleGenerate(false);
      }, 3000);
    } else {
      setWaLink("");
      setNoticeVisibleError(true);
      setNoticeVisibleCopy(false);
      setNoticeVisibleGenerate(false);
      setNoticeMessageError("Please enter a phone number");
      setTimeout(() => {
        setNoticeVisibleError(false);
      }, 3000);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(waLink);
    setNoticeVisibleCopy(true);
    setNoticeVisibleError(false);
    setNoticeVisibleGenerate(false);
    setNoticeMessageCopy("Link Copied");
    setTimeout(() => {
      setNoticeVisibleCopy(false);
    }, 3000);
  };

  const clearAll = () => {
    setPhoneNumber("");
    setMessage("");
    setWaLink("");
    setShowMessage(false);
  };

  return (
    <div>
      <h1>
        <ReactTyped
          strings={["Send WhatsApp Message Without Saving the Number"]}
          typeSpeed={100}
          loop
          backSpeed={20}
          cursorChar="|"
          showCursor={true}
        />
      </h1>
      <div className="converter">
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          defaultCountry="ID"
        />
        {showMessage && (
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={handleMessageChange}
          />
        )}
        <button className="add-message-btn" onClick={toggleMessage}>
          {showMessage ? "Hide Message" : "Add Message"}{" "}
          <i
            className={`fas ${
              showMessage ? "fa-circle-minus" : "fa-circle-plus"
            }`}
          ></i>
        </button>
        <button className="genBtn btn" onClick={generateLink}>
          Generate WhatsApp Link
        </button>
        <div
          className={`floating-notice ${
            noticeVisibleGenerate ? "animate-in" : ""
          } ${!noticeVisibleGenerate ? "animate-out" : ""}`}
        >
          {noticeMessageGenerate}
        </div>
        <div
          className={`floating-notice ${
            noticeVisibleCopy ? "animate-in" : ""
          } ${!noticeVisibleCopy ? "animate-out" : ""}`}
        >
          {noticeMessageCopy}
        </div>
        <div
          className={`floating-notice ${
            noticeVisibleError ? "animate-in" : ""
          } ${!noticeVisibleError ? "animate-out" : ""}`}
        >
          {noticeMessageError}
        </div>
        {waLink && (
          <>
            <div className="buttons">
              <a
                className="btn"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Link
              </a>
              <button className="btn" onClick={copyLink}>
                Copy Link
              </button>
            </div>
            <div className="qr-wrapper">
              <QRCode value={waLink} size={128} />
            </div>
            <button className="btn clearBtn" onClick={clearAll}>
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
