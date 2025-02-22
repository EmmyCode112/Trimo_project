import React, { useState } from "react";

const MessageEditor = () => {
  const [message, setMessage] = useState("");
  const [formattedMessage, setFormattedMessage] = useState("");
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Formatting states
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const handleTextChange = (e) => {
    let newText = e.target.value;
    
    // Apply active formatting
    if (isBold) newText = `<b>${newText}</b>`;
    if (isItalic) newText = `<i>${newText}</i>`;
    if (isUnderline) newText = `<u>${newText}</u>`;
    if (isCode) newText = `<code style="background: #f4f4f4; padding: 2px 4px; border-radius: 4px;">${newText}</code>`;

    setMessage(e.target.value);
    setFormattedMessage(newText);
  };

  const handleInsertLink = () => {
    if (linkText && linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" style="color: blue; text-decoration: underline;">${linkText}</a>`;
      setFormattedMessage((prev) => prev + " " + linkHtml);
      setMessage((prev) => prev + " " + linkText);
      setShowLinkPopup(false);
      setLinkText("");
      setLinkUrl("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      {/* Textarea (Plain Text) */}
      <textarea
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message here"
        style={{
          width: "100%",
          height: "100px",
          padding: "8px",
          marginBottom: "10px",
        }}
      />

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <button
          onClick={() => setIsBold(!isBold)}
          style={{ color: isBold ? "blue" : "black" }}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => setIsItalic(!isItalic)}
          style={{ color: isItalic ? "blue" : "black" }}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => setIsUnderline(!isUnderline)}
          style={{ color: isUnderline ? "blue" : "black" }}
        >
          <u>U</u>
        </button>
        <button
          onClick={() => setIsCode(!isCode)}
          style={{ color: isCode ? "blue" : "black" }}
        >
          {"<>"}
        </button>
        <button onClick={() => setShowLinkPopup(true)}>🔗</button>
      </div>

      {/* Link Popup */}
      {showLinkPopup && (
        <div
          style={{
            position: "absolute",
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            marginTop: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Enter link text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <button onClick={handleInsertLink}>Attach</button>
        </div>
      )}

      {/* Preview Panel */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <strong>Preview:</strong>
        <p dangerouslySetInnerHTML={{ __html: formattedMessage }}></p>
      </div>
    </div>
  );
};

export default MessageEditor;
