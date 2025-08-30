import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from './pages/Dashdoard.jsx';
import ProblemSolutionsPage from './pages/ProblemSolutionsPage.jsx';


function App() {
  
    return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/problems/:id" element={<ProblemSolutionsPage />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
