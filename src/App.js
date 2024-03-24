import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [waLink, setWaLink] = useState("");
  const [noticeMessage, setNoticeMessage] = useState(""); // Add state for message
  // const [inputError, setInputError] = useState(false);
  // const [linkCopied, setLinkCopied] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false); // Add state to control visibility of notice

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const generateLink = () => {
    if (phoneNumber) {
      setWaLink(`https://wa.me/${phoneNumber}`);
      setNoticeMessage("Link generated successfully!");
      setNoticeVisible(true);
      setTimeout(() => {
        setNoticeVisible(false);
      }, 3000);
    } else {
      setWaLink("");
      setNoticeVisible(true);
      setNoticeMessage("Please enter a phone number");
      setTimeout(() => {
        setNoticeVisible(false);
      }, 3000);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(waLink);
    setNoticeVisible(true);
    setNoticeMessage("Link Copied");
    setTimeout(() => {
      setNoticeVisible(false);
    }, 3000);
  };

  return (
    <div>
      <h1>Send WhatsApp Without Saving The Number</h1>
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
        {noticeVisible && (
          <div
            className={`floating-notice 
                    ${noticeVisible ? "animate-in" : "animate-out"}`}
          >
            {noticeMessage}
          </div>
        )}
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
