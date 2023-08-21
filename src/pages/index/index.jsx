import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import reactLogo from "@/assets/react.svg";
import './index.css';

function App() {
  
  return (
    <div className="container">
      <h1>Welcome to Lemon tools!</h1>
      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
