
export const templateStyles = `
  .header-section { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #333; margin-bottom: 30px; }
  .school-name { font-size: 26px; font-weight: 700; color: #1a1a1a; margin: 0 0 10px 0; letter-spacing: 0.5px; }
  .school-address { font-size: 13px; color: #666; margin: 0 0 5px 0; }
  .school-contact { font-size: 13px; color: #2563eb; margin: 0; font-weight: 500; }
  .form-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
  .form-title h2 { font-size: 20px; color: #1a1a1a; font-weight: 600; margin: 0; }
  .registration-number { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #f0f0f0; border-radius: 4px; font-size: 14px; }
  .reg-label { color: #666; font-weight: 500; }
  .reg-value { color: #1a1a1a; font-weight: 600; }
  .info-section { margin-bottom: 25px; padding: 20px; background: #fafafa; border-left: 3px solid #2563eb; }
  .section-title { font-size: 16px; color: #1a1a1a; margin: 0 0 15px 0; font-weight: 600; }
  .info-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
  .info-field { display: flex; flex-direction: column; gap: 5px; }
  .field-label { font-size: 12px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .field-value { font-size: 14px; color: #1a1a1a; font-weight: 500; }
  .parent-table { width: 100%; border-collapse: collapse; margin-top: 10px; background: #fff; }
  .parent-table thead tr { background: #f0f0f0; border-bottom: 2px solid #d0d0d0; }
  .parent-table th { padding: 12px; text-align: left; font-weight: 600; font-size: 13px; color: #333; text-transform: uppercase; letter-spacing: 0.5px; }
  .parent-table tbody tr { border-bottom: 1px solid #e0e0e0; }
  .parent-table tbody tr:last-child { border-bottom: none; }
  .parent-table td { padding: 12px; font-size: 14px; color: #333; }
  .table-label { font-weight: 500; color: #555; }
  .medical-text { margin: 10px 0 0 0; padding: 15px; background: #fff; border-radius: 4px; color: #333; font-size: 14px; line-height: 1.6; }
  .footer-section { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; }
  .footer-note { font-size: 12px; color: #666; margin: 0 0 8px 0; font-style: italic; }
  .footer-date { font-size: 11px; color: #999; margin: 0; }
  .receipt-header { margin-bottom: 30px; }
  .receipt-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #333; }
  .receipt-title h2 { font-size: 24px; color: #1a1a1a; font-weight: 700; margin: 0; letter-spacing: 1px; }
  .receipt-badge { background: #10b981; color: white; padding: 8px 20px; border-radius: 4px; font-size: 14px; font-weight: 700; letter-spacing: 1px; }
  .receipt-meta { display: flex; gap: 30px; background: #f9f9f9; padding: 15px; border-radius: 4px; }
  .meta-item { display: flex; gap: 8px; }
  .meta-label { font-weight: 600; color: #555; font-size: 14px; }
  .meta-value { color: #1a1a1a; font-size: 14px; }
  .fee-table { width: 100%; border-collapse: collapse; margin-top: 10px; background: #fff; }
  .fee-table thead tr { background: #f0f0f0; border-bottom: 2px solid #d0d0d0; }
  .fee-table th { padding: 12px; font-weight: 600; font-size: 13px; color: #333; text-transform: uppercase; letter-spacing: 0.5px; }
  .fee-table tbody tr { border-bottom: 1px solid #e0e0e0; }
  .fee-table tbody tr:last-child { border-bottom: none; }
  .fee-table td { padding: 12px; font-size: 14px; color: #333; }
  .status-badge { display: inline-block; padding: 4px 12px; border-radius: 3px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .status-paid { background: #d1fae5; color: #065f46; }
  .status-pending { background: #fee2e2; color: #991b1b; }
  .fee-summary { margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 4px; border-left: 3px solid #2563eb; }
  .summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
  .summary-label { color: #555; font-weight: 500; }
  .summary-value { color: #1a1a1a; font-weight: 600; }
  .discount-row, .discount-row .summary-label, .discount-row .summary-value { color: #10b981; }
  .total-row { margin-top: 10px; padding-top: 10px; border-top: 2px solid #d0d0d0; font-size: 16px; }
  .total-row .summary-label, .total-row .summary-value { color: #1a1a1a; font-weight: 700; }
  .remarks-text { margin: 10px 0 0 0; padding: 15px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 4px; color: #78350f; font-size: 14px; line-height: 1.6; font-style: italic; }
`;

export const templates = [
  {
    id: "admissionForm",
    name: "Admission Form",
    content: `
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
    `
  },
  {
    id: "feeReceipt",
    name: "Fee Receipt",
    content: `
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
    `
  }
];


export const addTemplate = (template) => {
  templates.push(template);
};

export const updateTemplate = (updatedTemplate) => {
  const index = templates?.findIndex(temp => temp?.id === updatedTemplate?.id);
  if (index !== -1) {
    templates[index] = updatedTemplate;
  }
};