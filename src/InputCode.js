import React, { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

const InputCode = ({ requestQR }) => {
  const [code, setCode] = useState("");
  return (
    <div style={{width: '100%', maxWidth: 600}}>
      <input
        className="input"
        placeholder="Code manuell eingeben"
        onChange={(ev) => {
          setCode(ev.target.value);
        }}
      />
      <button
        className="send"
        onClick={() => {
          if (code.length > 3) {
            requestQR(code);
          } else {
            toast.info("Der Code ist zu kurz");
          }
        }}
      >
        Senden
      </button>
    </div>
  );
};

export default InputCode;
