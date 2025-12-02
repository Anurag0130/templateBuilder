import TemplateBuilder from "./pages/TemplateBuilder.jsx";
import TemplatePreview from "./pages/TemplatePreview.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (

    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            color: "blue",
          }
        }} />
      <Routes>

        <Route path="/" element={<TemplatePreview />} />
        <Route path="/main" element={<TemplateBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;

