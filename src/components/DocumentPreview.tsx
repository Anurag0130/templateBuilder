import React, { useRef, useEffect, useState } from "react";
import Handlebars from "handlebars";
import { FileText, Download, RefreshCw, Eye } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function DocumentPreview() {
  const containerRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const navigate = useNavigate();

  const backendData = {
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
      income: "12 LPA"
    },
    mother: {
      name: "Neha Sharma",
      mobile: "9876500000",
      email: "neha@example.com",
      occupation: "Teacher",
      income: "8 LPA"
    },
    parents: {
      fields: [
        { key: "name", label: "Name" },
        { key: "mobile", label: "Mobile Number" },
        { key: "email", label: "Email" },
        { key: "occupation", label: "Occupation" },
        { key: "income", label: "Annual Income" }
      ]
    }
  };

  const feeReceiptData = {
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
      { description: "Exam Fee", amount: 1500, paid: true }
    ],
    hasDiscount: true,
    discountReason: "Sibling Discount (10%)",
    discountAmount: 3320,
    remarksAvailable: true,
    remarks: "Payment received in full for Quarter 3. Next payment due: 15 April 2025"
  };

  Handlebars.registerHelper("get", function (obj, key) {
    return obj?.[key] ?? "";
  });

  Handlebars.registerHelper("formatCurrency", function (amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  });

  Handlebars.registerHelper("multiply", function (a, b) {
    return a * b;
  });

  const templateSrc = `
    <div class="header-section">
      <h1 class="school-name">GENESIS GLOBAL SCHOOL</h1>
      <p class="school-address">SEC-132, EXPRESSWAY, NOIDA ; 201304</p>
      <p class="school-contact">+91-9711000498 | admissions@genesisgs.edu.in</p>
    </div>

    <div class="form-title">
      <h2>Admission Form ({{AcademicYear}})</h2>
      <div class="registration-number">
        <span class="reg-label">Registration No:</span>
        <span class="reg-value">{{ApplicantAutoId}}</span>
      </div>
    </div>

    {{#if FirstName}}
    <div class="info-section">
      <h3 class="section-title">Student Information</h3>
      <div class="info-row">
        <div class="info-field">
          <span class="field-label">Full Name:</span>
          <span class="field-value">{{FirstName}} {{LastName}}</span>
        </div>
        <div class="info-field">
          <span class="field-label">Gender:</span>
          <span class="field-value">{{Gender}}</span>
        </div>
      </div>
    </div>
    {{/if}}

    {{#if SiblingName}}
    <div class="info-section">
      <h3 class="section-title">Sibling Information</h3>
      <div class="info-row">
        <div class="info-field">
          <span class="field-label">Sibling Name:</span>
          <span class="field-value">{{SiblingName}}</span>
        </div>
        <div class="info-field">
          <span class="field-label">Sibling Class:</span>
          <span class="field-value">{{SiblingClass}}</span>
        </div>
      </div>
    </div>
    {{/if}}

    <div class="info-section">
      <h3 class="section-title">Parent Information</h3>
      {{#if parents.fields}}
      <table class="parent-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Father</th>
            <th>Mother</th>
          </tr>
        </thead>
        <tbody>
          {{#each parents.fields}}
          <tr>
            <td class="table-label">{{label}}</td>
            <td>{{get ../father key}}</td>
            <td>{{get ../mother key}}</td>
          </tr>
          {{/each}}
        </tbody>
      </table>
      {{/if}}
    </div>

    {{#if MedicalCondition}}
    <div class="info-section">
      <h3 class="section-title">Medical Information</h3>
      <p class="medical-text">{{MedicalCondition}}</p>
    </div>
    {{/if}}

    <div class="footer-section">
      <p class="footer-note">This is an auto-generated admission form. Please verify all details before submission.</p>
      <p class="footer-date">Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  `;

  const feeReceiptTemplate = `
    <div class="header-section">
      <h1 class="school-name">GENESIS GLOBAL SCHOOL</h1>
      <p class="school-address">SEC-132, EXPRESSWAY, NOIDA ; 201304</p>
      <p class="school-contact">+91-9711000498 | accounts@genesisgs.edu.in</p>
    </div>

    <div class="receipt-header">
      <div class="receipt-title">
        <h2>FEE RECEIPT</h2>
        <div class="receipt-badge">PAID</div>
      </div>
      <div class="receipt-meta">
        <div class="meta-item">
          <span class="meta-label">Receipt No:</span>
          <span class="meta-value">{{receiptNo}}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Date:</span>
          <span class="meta-value">{{receiptDate}}</span>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3 class="section-title">Student Details</h3>
      <div class="info-row">
        <div class="info-field">
          <span class="field-label">Student Name:</span>
          <span class="field-value">{{studentName}}</span>
        </div>
        <div class="info-field">
          <span class="field-label">Student ID:</span>
          <span class="field-value">{{studentId}}</span>
        </div>
        <div class="info-field">
          <span class="field-label">Class:</span>
          <span class="field-value">{{class}}</span>
        </div>
        <div class="info-field">
          <span class="field-label">Father's Name:</span>
          <span class="field-value">{{fatherName}}</span>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3 class="section-title">Payment Details</h3>
      <div class="info-row">
        <div class="info-field">
          <span class="field-label">Academic Year:</span>
          <span class="field-value">{{academicYear}}</span>
        </div>
        <div class="info-field">
          <span class="field-label">Payment Mode:</span>
          <span class="field-value">{{paymentMode}}</span>
        </div>
        {{#if transactionId}}
        <div class="info-field">
          <span class="field-label">Transaction ID:</span>
          <span class="field-value">{{transactionId}}</span>
        </div>
        {{/if}}
      </div>
    </div>

    <div class="info-section">
      <h3 class="section-title">Fee Breakdown</h3>
      <table class="fee-table">
        <thead>
          <tr>
            <th style="text-align: left;">Description</th>
            <th style="text-align: center;">Status</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          {{#each feeComponents}}
          <tr>
            <td>{{description}}</td>
            <td style="text-align: center;">
              {{#if paid}}
                <span class="status-badge status-paid">Paid</span>
              {{else}}
                <span class="status-badge status-pending">Pending</span>
              {{/if}}
            </td>
            <td style="text-align: right;">{{formatCurrency amount}}</td>
          </tr>
          {{/each}}
        </tbody>
      </table>

      <div class="fee-summary">
        <div class="summary-row">
          <span class="summary-label">Subtotal:</span>
          <span class="summary-value">₹33,200</span>
        </div>
        
        {{#if hasDiscount}}
        <div class="summary-row discount-row">
          <span class="summary-label">
            Discount ({{discountReason}}):
          </span>
          <span class="summary-value">- ₹{{discountAmount}}</span>
        </div>
        {{/if}}
        
        <div class="summary-row total-row">
          <span class="summary-label">Total Paid:</span>
          <span class="summary-value">₹29,880</span>
        </div>
      </div>
    </div>

    {{#if remarksAvailable}}
    <div class="info-section">
      <h3 class="section-title">Remarks</h3>
      <p class="remarks-text">{{remarks}}</p>
    </div>
    {{/if}}

    <div class="footer-section">
      <p class="footer-note">This is a computer-generated receipt and does not require a signature.</p>
      <p class="footer-date">Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  `;

  const loadTemplate = () => {
    if (containerRef.current) {
      const template = selectedTemplate === 'template1' ? templateSrc : feeReceiptTemplate;
      containerRef.current.innerHTML = template;
    }
  };

  const fillData = () => {
    const template = selectedTemplate === 'template1' ? templateSrc : feeReceiptTemplate;
    const data = selectedTemplate === 'template1' ? backendData : feeReceiptData;
    const compiled = Handlebars.compile(template);
    const html = compiled(data);
    containerRef.current.innerHTML = html;
  };

  const downloadPDF = () => {
    alert("PDF download feature - integrate html2pdf.js library");
    navigate("/main");
  };
  const gotoCustomTemplate = () => {
    navigate("/main");
  };

  useEffect(() => {
    // fillData();
    loadTemplate();
  }, [selectedTemplate]);

  return (
    <div className="main-wrapper">
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }

        .main-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .controls-section {
          width: 320px;
          background: #ffffff;
          padding: 24px;
          border-right: 1px solid #e0e0e0;
          overflow-y: auto;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
        }

        .content-area {
          margin-left: 320px;
          flex: 1;
          padding: 30px 20px 100px 20px;
          overflow-y: auto;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e0e0e0;
        }

        .section-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #333333;
          margin: 0;
        }

        .template-select-wrapper {
          margin-bottom: 20px;
        }

        .template-select-wrapper label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #555555;
          margin-bottom: 8px;
        }

        .template-select-wrapper select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          font-size: 14px;
          color: #333333;
          background-color: #ffffff;
          cursor: pointer;
        }

        .template-select-wrapper select:focus {
          outline: none;
          border-color: #2563eb;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background-color: #ffffff;
          color: #333333;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background-color: #f9f9f9;
          border-color: #2563eb;
          color: #2563eb;
        }

        .action-btn-primary {
          background-color: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .action-btn-primary:hover {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
          color: #ffffff;
        }

        #template-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 45px;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          min-height: calc(100vh - 160px);
        }

        .header-section {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px solid #333333;
          margin-bottom: 30px;
        }

        .school-name {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          letter-spacing: 0.5px;
        }

        .school-address {
          font-size: 13px;
          color: #666666;
          margin: 0 0 5px 0;
        }

        .school-contact {
          font-size: 13px;
          color: #2563eb;
          margin: 0;
          font-weight: 500;
        }

        .form-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e0e0e0;
        }

        .form-title h2 {
          font-size: 20px;
          color: #1a1a1a;
          font-weight: 600;
          margin: 0;
        }

        .registration-number {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: #f0f0f0;
          border-radius: 4px;
          font-size: 14px;
        }

        .reg-label {
          color: #666666;
          font-weight: 500;
        }

        .reg-value {
          color: #1a1a1a;
          font-weight: 600;
        }

        .info-section {
          margin-bottom: 25px;
          padding: 20px;
          background-color: #fafafa;
          border-left: 3px solid #2563eb;
        }

        .section-title {
          font-size: 16px;
          color: #1a1a1a;
          margin: 0 0 15px 0;
          font-weight: 600;
        }

        .info-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .info-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .field-label {
          font-size: 12px;
          color: #666666;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .field-value {
          font-size: 14px;
          color: #1a1a1a;
          font-weight: 500;
        }

        .parent-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          background: #ffffff;
        }

        .parent-table thead tr {
          background-color: #f0f0f0;
          border-bottom: 2px solid #d0d0d0;
        }

        .parent-table th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          color: #333333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .parent-table tbody tr {
          border-bottom: 1px solid #e0e0e0;
        }

        .parent-table tbody tr:last-child {
          border-bottom: none;
        }

        .parent-table td {
          padding: 12px;
          font-size: 14px;
          color: #333333;
        }

        .table-label {
          font-weight: 500;
          color: #555555;
        }

        .medical-text {
          margin: 10px 0 0 0;
          padding: 15px;
          background-color: #ffffff;
          border-radius: 4px;
          color: #333333;
          font-size: 14px;
          line-height: 1.6;
        }

        .footer-section {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
        }

        .footer-note {
          font-size: 12px;
          color: #666666;
          margin: 0 0 8px 0;
          font-style: italic;
        }

        .footer-date {
          font-size: 11px;
          color: #999999;
          margin: 0;
        }

        .receipt-header {
          margin-bottom: 30px;
        }

        .receipt-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #333333;
        }

        .receipt-title h2 {
          font-size: 24px;
          color: #1a1a1a;
          font-weight: 700;
          margin: 0;
          letter-spacing: 1px;
        }

        .receipt-badge {
          background-color: #10b981;
          color: white;
          padding: 8px 20px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .receipt-meta {
          display: flex;
          gap: 30px;
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 4px;
        }

        .meta-item {
          display: flex;
          gap: 8px;
        }

        .meta-label {
          font-weight: 600;
          color: #555555;
          font-size: 14px;
        }

        .meta-value {
          color: #1a1a1a;
          font-size: 14px;
        }

        .fee-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          background: #ffffff;
        }

        .fee-table thead tr {
          background-color: #f0f0f0;
          border-bottom: 2px solid #d0d0d0;
        }

        .fee-table th {
          padding: 12px;
          font-weight: 600;
          font-size: 13px;
          color: #333333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .fee-table tbody tr {
          border-bottom: 1px solid #e0e0e0;
        }

        .fee-table tbody tr:last-child {
          border-bottom: none;
        }

        .fee-table td {
          padding: 12px;
          font-size: 14px;
          color: #333333;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-paid {
          background-color: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .fee-summary {
          margin-top: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 4px;
          border-left: 3px solid #2563eb;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }

        .summary-label {
          color: #555555;
          font-weight: 500;
        }

        .summary-value {
          color: #1a1a1a;
          font-weight: 600;
        }

        .discount-row {
          color: #10b981;
        }

        .discount-row .summary-label,
        .discount-row .summary-value {
          color: #10b981;
        }

        .total-row {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 2px solid #d0d0d0;
          font-size: 16px;
        }

        .total-row .summary-label,
        .total-row .summary-value {
          color: #1a1a1a;
          font-weight: 700;
        }

        .remarks-text {
          margin: 10px 0 0 0;
          padding: 15px;
          background-color: #fffbeb;
          border-left: 3px solid #f59e0b;
          border-radius: 4px;
          color: #78350f;
          font-size: 14px;
          line-height: 1.6;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .main-wrapper {
            flex-direction: column;
          }

          .controls-section {
            width: 100%;
            height: auto;
            position: relative;
            border-right: none;
            border-bottom: 1px solid #e0e0e0;
          }

          .content-area {
            margin-left: 0;
            padding: 20px 10px 80px 10px;
          }

          #template-container {
            padding: 30px 20px;
          }

          .form-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .school-name {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="controls-section">
        <div className="section-header">
          <FileText size={24} color="#333333" />
          <h2>Document Preview System</h2>
        </div>

        <div className="template-select-wrapper">
          <label htmlFor="template-select">Select Template</label>
          <select
            id="template-select"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="template1">Genesis Global School - Admission Form</option>
            <option value="template2">Fee Receipt (with Loops & Conditions)</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="action-btn" onClick={loadTemplate}>
            <RefreshCw size={16} />
            Load Template
          </button>
          <button className="action-btn" onClick={fillData}>
            <Eye size={16} />
            Fill Data
          </button>
          <button className="action-btn action-btn-primary" onClick={downloadPDF}>
            <Download size={16} />
            Download PDF
          </button>
          <button className="action-btn action-btn-primary" onClick={gotoCustomTemplate}>
            <Download size={16} />
            Create Custom Template
          </button>
        </div>
      </div>

      <div className="content-area">
        <div id="template-container" ref={containerRef}>
          <div style={{ textAlign: 'center', color: '#999999', padding: '80px 20px' }}>
            <FileText size={48} style={{ opacity: 0.3, margin: '0 auto 15px', display: 'block' }} />
            <p style={{ fontSize: '14px', margin: 0 }}>Preview will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}