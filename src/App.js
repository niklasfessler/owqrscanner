import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import QrReader from "react-qr-scanner";
import InputCode from "./InputCode";

const URL = "https://labscan.iws24.com";

function App() {
  let scanned = false;
  const requestQR = async (code) => {
    if (!scanned) {
      scanned = true;
      try {
        const resp = await axios.get(URL + "/codes/" + code, {
          auth: {
            username: "labor",
            password: "D0rnbirn!23",
          },
        });
        console.log(resp);
        if (resp.status === 200) {
          toast.success("Erfolgreich hochgeladen");
        }
      } catch (err) {
        if (err.response.status == 409) {
          toast.error("Der Code ist bereits vorhanden.");
        }
        if (err.response.status == 404) {
          toast.error("Der Code wurde nicht gefunden.");
        }
      }
      setTimeout(() => {
        scanned = false;
      }, 3000);
    }
  };

  const handleError = () => {};
  const handleScan = async (result) => {
    if (result) {
      requestQR(result);
    }
  };

  const width = window.innerWidth > 600 ? 600 : window.innerWidth;
  return (
    <div className="App">
      <QrReader
        delay={1500}
        style={{ width, height: width, objectFit: "cover" }}
        onError={handleError}
        onScan={handleScan}
      />
      <h2 style={{ marginLeft: 15 }}>Code manuell eingeben</h2>
      <InputCode requestQR={requestQR} />
      <ToastContainer />
    </div>
  );
}

export default App;
