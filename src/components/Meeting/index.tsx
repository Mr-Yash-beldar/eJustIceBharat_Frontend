import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the type for props passed to the App component
interface AppProps {
  name: string;
  meetingCode: string;
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    <ToastContainer
      toastClassName={() =>
        "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
      }
      bodyClassName={() => "text-black text-base font-normal"}
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <App name={"Rushikesh"} meetingCode={"f4ux-yckf-ud5h"} />
  </>
);
