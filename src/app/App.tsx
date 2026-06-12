import { HashRouter, Routes, Route } from "react-router";
import MainSite from "./MainSite";
import AdminApp from "./admin/AdminApp";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </HashRouter>
  );
}
