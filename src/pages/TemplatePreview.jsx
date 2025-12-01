import { useNavigate } from "react-router-dom";
import Handlebars from "../utils/handlebarsHelpers";
import { useRef, useEffect, useState } from "react";
import { FileText, Download, RefreshCw, Eye } from "lucide-react";
import { backendData, feeReceiptData } from "../templates/constants";
import { templates, templateStyles } from "../templates/templateStore";


export default function TemplatePreview() {

  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");


  useEffect(() => {
    loadTemplate();
  }, [selectedTemplate]);


  const loadTemplate = () => {
    if (!containerRef.current) return;
    const currentTemplate = (templates)?.find((temp) => temp?.id === selectedTemplate);

    if (!currentTemplate) return;
    containerRef.current.innerHTML = currentTemplate.content;
  };


  const fillData = () => {
    if (!containerRef.current) return;

    const currentTemplate = (templates)?.find((temp) => temp?.id === selectedTemplate);

    if (!currentTemplate) return;

    const data = selectedTemplate === "admissionForm" ? backendData : selectedTemplate === "feeReceipt" ? feeReceiptData : backendData;
    const compiled = Handlebars.compile(currentTemplate.content);
    containerRef.current.innerHTML = compiled(data);

  };


  const downloadPDF = () => {
    alert("Integrate html2pdf.js here.");
  };


  // const gotoCustomTemplate = () => navigate("/main");
  const gotoCustomTemplate = () => {
    navigate("/main", { state: { templateId: selectedTemplate } });
  };




  return (
    <>
      <style>{templateStyles}</style>

      <div className="flex min-h-screen bg-gray-100">
        <div className="w-80 bg-white border-r border-gray-300 overflow-y-auto h-screen fixed left-0 top-0 p-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-300">
            <FileText size={24} className="text-gray-800" />
            <h2 className="text-xl font-semibold text-gray-800">
              Document Preview System
            </h2>
          </div>

          <div className="mb-5">
            <label
              htmlFor="template-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Template
            </label>

            <select
              id="template-select"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-400 rounded text-sm text-gray-800 bg-white cursor-pointer focus:outline-none focus:border-blue-600"
            >
              <option value="" disabled>Select Template</option>
              {(templates)?.map((temp) => (
                <option key={temp?.id} value={temp?.id}>  {temp?.name} </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={fillData}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-400 rounded text-sm font-medium bg-white text-gray-800 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <Eye size={16} />
              Fill Data
            </button>

            <button
              onClick={loadTemplate}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-400 rounded text-sm font-medium bg-white text-gray-800 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <RefreshCw size={16} />
              Load Template
            </button>

            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-400 rounded text-sm font-medium bg-white text-gray-800 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <Download size={16} />
              Download Your PDF
            </button>

            <button
              onClick={gotoCustomTemplate}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-400 rounded text-sm font-medium bg-white text-gray-800 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <FileText size={16} />
              Create Custom Template
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-80 flex-1 p-8 pb-24 overflow-y-auto">
          <div
            id="template-container"
            ref={containerRef}
            className="max-w-6xl mx-auto p-12 bg-white border border-gray-300 rounded min-h-[calc(100vh-10rem)]"
          >
            <div className="text-center text-gray-400 py-20">
              <FileText size={48} className="opacity-30 mx-auto mb-4" />
              <p className="text-sm">Preview will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
