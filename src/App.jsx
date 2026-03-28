import { BrowserRouter, Routes, Route } from "react-router-dom";
import VersePage from "./pages/VersePage";
import CharacterPage from "./pages/CharacterPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verse" element={<VersePage />} />
        <Route path="/character" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
