import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ReactTyped } from "react-typed";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [waLink, setWaLink] = useState("");

  const [noticeMessageGenerate, setNoticeMessageGenerate] = useState("");
  const [noticeVisibleGenerate, setNoticeVisibleGenerate] = useState(false);

  const [noticeMessageCopy, setNoticeMessageCopy] = useState("");
  const [noticeVisibleCopy, setNoticeVisibleCopy] = useState(false);

  const [noticeMessageError, setNoticeMessageError] = useState("");
  const [noticeVisibleError, setNoticeVisibleError] = useState(false);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const generateLink = () => {
    if (phoneNumber) {
      setWaLink(`https://wa.me/${phoneNumber}`);
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

        <button className="genBtn" onClick={generateLink}>
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
          <div className="buttons">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <span>Open Link</span>
            </a>
            <button onClick={copyLink}>Copy Link</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
