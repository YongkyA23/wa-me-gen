import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css"; // Adjust the path if necessary

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [waLink, setWaLink] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const generateLink = () => {
    if (phoneNumber) {
      setWaLink(`https://wa.me/${phoneNumber}`);
      setShowNotice(true);
      setInputError(false);
    } else {
      setWaLink("");
      setShowNotice(false);
      setInputError(true);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(waLink);
    setLinkCopied(true);
  };

  return (
    <div>
      <h1>WhatsApp Contact Link Converter</h1>
      <div className="converter">
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          defaultCountry="ID"
        />
        {inputError && (
          <p className="error-notice">Please enter a phone number</p>
        )}
        <button onClick={generateLink}>Generate WhatsApp Link</button>
        {showNotice && (
          <p className="notice">
            {linkCopied ? "Link Copied!" : "Link generated successfully!"}
          </p>
        )}
        {waLink && (
          <div className="buttons">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Open Link
            </a>
            <button onClick={copyLink}>Copy Link</button> {/* Add the button */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
