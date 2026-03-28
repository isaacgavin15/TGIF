import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VersePage from "./pages/VersePage";
import CharacterPage from "./pages/CharacterPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/verse" replace />} />
        <Route path="/verse" element={<VersePage />} />
        <Route path="/character" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
