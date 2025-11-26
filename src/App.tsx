import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainTemplateBuilder from "./components/TemplateBuilder";
import DocumentPreview from "./components/DocumentPreview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentPreview />} />
        <Route path="/main" element={<MainTemplateBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;

