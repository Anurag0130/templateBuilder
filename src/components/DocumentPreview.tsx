import Handlebars from "handlebars";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { templates, templateStyles } from "../templateStore";
import { FileText, Download, RefreshCw, Eye } from "lucide-react";


export default function DocumentPreview() {
  const navigate: any = useNavigate();
  const containerRef: any = useRef(null);

  const [selectedTemplate, setSelectedTemplate] = useState<any>("template1");


  const backendData: any = {
    ApplicantAutoId: "REG-2025-001",
    AcademicYear: "2025-26",
    FirstName: "Aarav",
    LastName: "Sharma",
    Gender: "Male",
    SiblingName: "Riya Sharma",
    SiblingClass: "Grade 4",
    MedicalCondition: "",
    father: {
      name: "Rajesh Sharma",
      mobile: "9876543210",
      email: "rajesh@example.com",
      occupation: "Engineer",
      income: "12 LPA",
    },
    mother: {
      name: "Neha Sharma",
      mobile: "9876500000",
      email: "neha@example.com",
      occupation: "Teacher",
      income: "8 LPA",
    },
    parents: {
      fields: [
        { key: "name", label: "Name" },
        { key: "mobile", label: "Mobile Number" },
        { key: "email", label: "Email" },
        { key: "occupation", label: "Occupation" },
        { key: "income", label: "Annual Income" },
      ],
    },
    previousSchools: [
      { school: "Kids Global School", year: "2023-24", grade: "2" },
      { school: "Sunshine Academy", year: "2022-23", grade: "1" }
    ],
    schoolName: "GENESIS GLOBAL SCHOOL",
    schoolAddress: "SEC-132, EXPRESSWAY, NOIDA ; 201304"
  };

  const feeReceiptData: any = {
    receiptNo: "FEE/2025/001234",
    receiptDate: "15 January 2025",
    studentName: "Priya Verma",
    studentId: "STU-2024-5678",
    class: "Grade 8-A",
    fatherName: "Mr. Amit Verma",
    academicYear: "2024-25",
    paymentMode: "Online Transfer",
    transactionId: "TXN98765432",
    feeComponents: [
      { description: "Tuition Fee (Quarter 3)", amount: 25000, paid: true },
      { description: "Transportation Fee", amount: 3500, paid: true },
      { description: "Library Fee", amount: 1200, paid: false },
      { description: "Activity Fee", amount: 2000, paid: true },
      { description: "Exam Fee", amount: 1500, paid: true },
    ],
    hasDiscount: true,
    discountReason: "Sibling Discount (10%)",
    discountAmount: 3320,
    remarksAvailable: true,
    remarks:
      "Payment received in full for Quarter 3. Next payment due: 15 April 2025",
  };

  // Handlebars helpers with any
  Handlebars.registerHelper("get", (obj: any, key: any) => obj?.[key] ?? "");
  Handlebars.registerHelper("formatCurrency", (amount: any) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  );
  Handlebars.registerHelper("multiply", (a: any, b: any) => a * b);

  const loadTemplate = () => {
    if (!containerRef.current) return;

    const currentTemplate: any = (templates as any[]).find((t: any) => t.id === selectedTemplate);

    if (!currentTemplate) return;

    containerRef.current.innerHTML = currentTemplate.content;
  };

  const fillData = () => {
    if (!containerRef.current) return;

    const currentTemplate: any = (templates as any[]).find((t: any) => t.id === selectedTemplate);

    if (!currentTemplate) return;

    const data = selectedTemplate === "admissionForm" ? backendData : selectedTemplate === "feeReceipt" ? feeReceiptData : backendData;
    const compiled: any = Handlebars.compile(currentTemplate.content);
    containerRef.current.innerHTML = compiled(data);
  };

  const downloadPDF = () => {
    alert("Integrate html2pdf.js here.");
  };

  const gotoCustomTemplate = () => navigate("/main");

  useEffect(() => {
    loadTemplate();
  }, [selectedTemplate]);

  return (
    <>
      <style>{templateStyles as any}</style>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
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
              onChange={(e: any) => setSelectedTemplate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-400 rounded text-sm text-gray-800 bg-white cursor-pointer focus:outline-none focus:border-blue-600"
            >
              {(templates as any[]).map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
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
