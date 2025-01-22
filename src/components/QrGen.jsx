import { useState } from "react";
import "./QrGen.css";

function QrGen() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [size, setSize] = useState(150);

  const qrGen = () => {
    if (qrData.trim() === "" || size <= 0) {
      alert("Please enter valid data and size.");
      return;
    }
    try {
      setLoading(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        qrData
      )}&size=${size}x${size}`;
      setImg(url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!img) {
      alert("Please generate a QR code first.");
      return;
    }
    const link = document.createElement("a");
    link.href = img;
    link.download = "qr-code.png";
    document.body.appendChild(link); // Fixed typo here
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="QrGen-container">
      <h1>QR Code Generator</h1>
      {loading && <div className="spinner"></div>}

      {!loading && img && (
        <>
          <img className="qr-image" src={img} alt="qr-code" />
          <button className="gen-btn download" onClick={downloadQRCode}>
            Download QR Code
          </button>
        </>
      )}

      <label htmlFor="dataInput" className="input-label">
        Data for QR Code
        <input
          type="text"
          id="dataInput"
          placeholder="Enter data for QR Code"
          onChange={(e) => setQrData(e.target.value)}
        />
      </label>

      <label htmlFor="sizeInput" className="input-label">
        Image Size (e.g., 150px)
        <input
          type="number"
          id="sizeInput"
          placeholder="Enter Image Size"
          onChange={(e) => setSize(parseInt(e.target.value))}
        />
      </label>

      <button className="gen-btn" onClick={qrGen}>
        Generate QR Code
      </button>
    </div>
  );
}

export default QrGen;
