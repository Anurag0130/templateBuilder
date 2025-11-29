// import { Type, Table, ImageIcon, Square, Minus, Link, AlignLeft, PenTool, QrCodeIcon } from "lucide-react";


import {
  Type,
  Table,
  Image as ImageIcon,
  Square,
  Minus,
  Link,
  AlignLeft,
  Circle,
  CheckSquare,
  Calendar,  Hash,  DollarSign, User,  Mail, Phone,  MapPin, FileText, Code, List, Clipboard,} from "lucide-react";


export const studentData = {
    ApplicantAutoId: "APP/26-27/0163",
    AcademicYear: "2026-27",
    Class: "GRADE 3",
    udf_curriculum: "IB",
    udf_current_school: "",
    udf_current_class: "Grade 2",
    udf_is_transport: "YES",
    udf_Name_of_the_Applicant: "Ryaan Seth",
    udf_Name_of_the_Sibling: "",
    SiblingClass: "",
    FatherName: "Nimish Seth",
    MotherName: "Aishwarya Rawat",
    udf_DpCfIrEQNbqLNwhaPIlbZEMIhSLXcP: "03-11-1978",
    udf_EJZUtgLlNisqlIiZwjFoJWTaRyOLxK: "05-08-1985",
    udf_trhHSqcsooLHlBephDKdGQRaBhLarf: "Indian",
    udf_QMWkLmQUlcqaVivfzYwkuwnpOnZGpK: "Australian",
    FatherMobileNo: "468332435",
    MotherMobileNo: "490948709",
    FatherEmailId: "nimishseth@hotmail.com",
    MotherEmailId: "aishxlnc@gmail.com",
    FatherQualification: "",
    MotherQualification: "",
    FatherOccupation: "Consultant",
    MotherOccupation: "Service",
    FatherOrganisation: "",
    MotherOrganisation: "",
    FatherAnnualIncome: "200000.0",
    MotherAnnualIncome: "100000.0",
    udf_All_the_communication_from_the_school_is_to_be_sent_to: "Both",

    addressDetails: {

        Permanent: {
            Address: "9 Old hall drive",
            City: "Caroline Springs",
            State: "Victoria",
            Pincode: "3023",
            Country: "Australia",
        }
    },
    extraLanguages: ["English", "Hindi", "French"],
    previousSchools: [
        { school: "Kids Global School", year: "2023-24", grade: "2" },
        { school: "Sunshine Academy", year: "2022-23", grade: "1" }
    ],
    schoolName: "GENESIS GLOBAL SCHOOL",
    schoolAddress: "SEC-132, EXPRESSWAY, NOIDA ; 201304"

};


export const groupedFields = {
    "Basic Info": ["ApplicantAutoId", "AcademicYear", "Class", "udf_curriculum"],
    "Student": ["udf_current_school", "udf_current_class", "udf_is_transport", "udf_Name_of_the_Applicant"],
    "Sibling": ["udf_Name_of_the_Sibling", "SiblingClass"],
    "Father": ["FatherName", "udf_DpCfIrEQNbqLNwhaPIlbZEMIhSLXcP", "udf_trhHSqcsooLHlBephDKdGQRaBhLarf", "FatherMobileNo", "FatherEmailId", "FatherQualification", "FatherOccupation", "FatherOrganisation", "FatherAnnualIncome"],
    "Mother": ["MotherName", "udf_EJZUtgLlNisqlIiZwjFoJWTaRyOLxK", "udf_QMWkLmQUlcqaVivfzYwkuwnpOnZGpK", "MotherMobileNo", "MotherEmailId", "MotherQualification", "MotherOccupation", "MotherOrganisation", "MotherAnnualIncome"],
    "Address": ["CorrAddress", "CorrCity", "CorrState", "CorrPincode", "CorrCountry", "PerAddress", "PerCity", "PerState", "PerPincode", "PerCountry"],
};




export const elementTypes = {
  // ========== TEXT ELEMENTS ==========
  text: {
    name: "Text",
    icon: Type,
    defaultProps: {
      type: "text",
      value: "Static Text",
      fontSize: 14,
      fontWeight: "normal",
      color: "#000000",
      backgroundColor: "transparent",
      textAlign: "left",
      fontFamily: "Arial",
      lineHeight: 1.5,
      letterSpacing: 0,
      x: 50,
      y: 50,
      width: 500,
    },
  },
  header: {
    name: "Header",
    icon: Type,
    defaultProps: {
      type: "header",
      value: "Section Header",
      fontSize: 18,
      fontWeight: "bold",
      color: "#000000",
      backgroundColor: "transparent",
      textAlign: "left",
      fontFamily: "Arial",
      underline: false,
      x: 50,
      y: 50,
      width: 500,
    },
  },
  textarea: {
    name: "Textarea",
    icon: AlignLeft,
    defaultProps: {
      type: "textarea",
      value: "Multi-line text content...",
      width: 400,
      height: 100,
      rows: 3,
      fontSize: 12,
      fontWeight: "normal",
      color: "#000000",
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#d1d5db",
      fontFamily: "Arial",
      x: 50,
      y: 50,
    },
  },

  // ========== NEW: DYNAMIC FIELD (with placeholder) ==========
  dynamicField: {
    name: "Dynamic Field",
    icon: Code,
    defaultProps: {
      type: "dynamicField",
      placeholder: "{{FieldName}}",
      fontSize: 14,
      fontWeight: "normal",
      color: "#2563eb",
      backgroundColor: "#eff6ff",
      borderWidth: 1,
      borderColor: "#93c5fd",
      textAlign: "left",
      fontFamily: "Arial",
      x: 50,
      y: 50,
      width: 200,
    },
  },

  // ========== STRUCTURAL ELEMENTS ==========
  table: {
    name: "Table",
    icon: Table,
    defaultProps: {
      type: "table",
      rows: 3,
      cols: 3,
      width: 500,
      height: 150,
      borderWidth: 1,
      borderColor: "#000000",
      headerRow: true,
      headerBackgroundColor: "#f3f4f6",
      alternateRows: false,
      alternateColor: "#f9fafb",
      cellData: {},
      mergedCells: {},
      cellStyles: {},
      x: 50,
      y: 50,
    },
  },

  // ========== NEW: LIST ELEMENT ==========
  list: {
    name: "List",
    icon: List,
    defaultProps: {
      type: "list",
      items: ["Item 1", "Item 2", "Item 3"],
      listStyle: "bullet", // bullet, number, none
      fontSize: 14,
      fontWeight: "normal",
      color: "#000000",
      lineHeight: 1.8,
      indentation: 20,
      x: 50,
      y: 50,
      width: 400,
    },
  },

  // ========== SHAPE ELEMENTS ==========
  rectangle: {
    name: "Rectangle",
    icon: Square,
    defaultProps: {
      type: "rectangle",
      width: 400,
      height: 100,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 0,
      opacity: 1,
      x: 50,
      y: 50,
    },
  },

  // ========== NEW: CIRCLE ==========
  circle: {
    name: "Circle",
    icon: Circle,
    defaultProps: {
      type: "circle",
      radius: 50,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#d1d5db",
      opacity: 1,
      x: 50,
      y: 50,
    },
  },

  line: {
    name: "Line",
    icon: Minus,
    defaultProps: {
      type: "line",
      width: 400,
      height: 2,
      color: "#000000",
      lineWidth: 1,
      lineStyle: "solid", // solid, dashed, dotted
      x: 50,
      y: 50,
    },
  },

  // ========== MEDIA ELEMENTS ==========
  image: {
    name: "Image",
    icon: ImageIcon,
    defaultProps: {
      type: "image",
      width: 400,
      height: 150,
      alt: "Uploaded Image",
      src: "",
      borderRadius: 0,
      borderWidth: 0,
      borderColor: "#000000",
      opacity: 1,
      x: 50,
      y: 50,
    },
  },

  // ========== NEW: QR CODE ==========
  qrCode: {
    name: "QR Code",
    icon: Square,
    defaultProps: {
      type: "qrCode",
      data: "https://example.com",
      size: 100,
      backgroundColor: "#ffffff",
      foregroundColor: "#000000",
      x: 50,
      y: 50,
    },
  },

  // ========== NEW: BARCODE ==========
  barcode: {
    name: "Barcode",
    icon: Clipboard,
    defaultProps: {
      type: "barcode",
      data: "123456789012",
      width: 200,
      height: 60,
      format: "CODE128", // CODE128, EAN13, UPC
      displayValue: true,
      x: 50,
      y: 50,
    },
  },

  // ========== INTERACTIVE ELEMENTS ==========
  link: {
    name: "Link",
    icon: Link,
    defaultProps: {
      type: "link",
      text: "Click Here",
      href: "https://example.com",
      color: "#2563eb",
      fontSize: 14,
      fontWeight: "normal",
      underline: true,
      openInNewTab: true,
      x: 50,
      y: 50,
      width: 400,
    },
  },

  // ========== NEW: CHECKBOX ==========
  checkbox: {
    name: "Checkbox",
    icon: CheckSquare,
    defaultProps: {
      type: "checkbox",
      label: "Checkbox Label",
      checked: false,
      size: 16,
      color: "#2563eb",
      labelFontSize: 14,
      x: 50,
      y: 50,
      width: 200,
    },
  },

  // ========== NEW: SIGNATURE BOX ==========
  signature: {
    name: "Signature",
    icon: FileText,
    defaultProps: {
      type: "signature",
      label: "Signature:",
      width: 200,
      height: 60,
      borderWidth: 1,
      borderColor: "#000000",
      borderStyle: "solid", // solid, dashed
      backgroundColor: "transparent",
      labelFontSize: 12,
      x: 50,
      y: 50,
    },
  },

  // ========== FORM FIELD ELEMENTS ==========
  dateField: {
    name: "Date Field",
    icon: Calendar,
    defaultProps: {
      type: "dateField",
      label: "Date:",
      format: "DD/MM/YYYY",
      fontSize: 14,
      fontWeight: "normal",
      color: "#000000",
      x: 50,
      y: 50,
      width: 200,
    },
  },

  numberField: {
    name: "Number Field",
    icon: Hash,
    defaultProps: {
      type: "numberField",
      label: "Amount:",
      prefix: "",
      suffix: "",
      fontSize: 14,
      fontWeight: "normal",
      color: "#000000",
      x: 50,
      y: 50,
      width: 200,
    },
  },

  currencyField: {
    name: "Currency",
    icon: DollarSign,
    defaultProps: {
      type: "currencyField",
      label: "Total:",
      currency: "₹",
      fontSize: 14,
      fontWeight: "bold",
      color: "#000000",
      x: 50,
      y: 50,
      width: 200,
    },
  },

  // ========== CONTACT FIELDS ==========
  emailField: {
    name: "Email",
    icon: Mail,
    defaultProps: {
      type: "emailField",
      label: "Email:",
      placeholder: "email@example.com",
      fontSize: 14,
      color: "#000000",
      x: 50,
      y: 50,
      width: 300,
    },
  },

  phoneField: {
    name: "Phone",
    icon: Phone,
    defaultProps: {
      type: "phoneField",
      label: "Phone:",
      placeholder: "+91 XXXXX XXXXX",
      fontSize: 14,
      color: "#000000",
      x: 50,
      y: 50,
      width: 250,
    },
  },

  addressField: {
    name: "Address",
    icon: MapPin,
    defaultProps: {
      type: "addressField",
      label: "Address:",
      rows: 3,
      fontSize: 14,
      color: "#000000",
      width: 400,
      height: 80,
      x: 50,
      y: 50,
    },
  },

  // ========== NEW: SECTION DIVIDER ==========
  divider: {
    name: "Divider",
    icon: Minus,
    defaultProps: {
      type: "divider",
      width: 700,
      style: "solid", // solid, dashed, dotted, double
      thickness: 1,
      color: "#d1d5db",
      spacing: 20, // spacing above and below
      x: 50,
      y: 50,
    },
  },
};

// ========== ENHANCED TEMPLATE PRESETS ==========
export const templatePresets = {
  admissionForm: {
    name: "Admission Form",
    elements: [
      {
        type: "header",
        value: "GENESIS GLOBAL SCHOOL",
        x: 50,
        y: 50,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "transparent",
        width: 700,
      },
      {
        type: "text",
        value: "SEC-132, EXPRESSWAY, NOIDA ; 201304",
        x: 50,
        y: 90,
        fontSize: 12,
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        width: 700,
      },
      {
        type: "line",
        x: 50,
        y: 130,
        width: 700,
        color: "#000000",
        lineWidth: 2,
      },
      {
        type: "header",
        value: "Admission Form (2025-26)",
        x: 50,
        y: 160,
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "transparent",
      },
      {
        type: "dynamicField",
        placeholder: "{{StudentName}}",
        x: 150,
        y: 220,
        width: 250,
      },
      {
        type: "signature",
        label: "Parent Signature:",
        x: 50,
        y: 800,
        width: 200,
        height: 60,
      },
    ],
  },

  invoice: {
    name: "Invoice Template",
    elements: [
      {
        type: "header",
        value: "INVOICE",
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
      },
      {
        type: "table",
        x: 50,
        y: 200,
        rows: 5,
        cols: 4,
        width: 700,
        height: 200,
        headerRow: true,
      },
      {
        type: "currencyField",
        label: "Total Amount:",
        x: 550,
        y: 450,
        fontSize: 16,
        fontWeight: "bold",
      },
    ],
  },

  certificate: {
    name: "Certificate",
    elements: [
      {
        type: "rectangle",
        x: 30,
        y: 30,
        width: 740,
        height: 1063,
        borderWidth: 8,
        borderColor: "#d4af37",
        backgroundColor: "#fffef7",
      },
      {
        type: "header",
        value: "CERTIFICATE OF ACHIEVEMENT",
        x: 50,
        y: 150,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        width: 700,
      },
      {
        type: "dynamicField",
        placeholder: "{{RecipientName}}",
        x: 250,
        y: 400,
        fontSize: 24,
        textAlign: "center",
        width: 300,
      },
      {
        type: "signature",
        label: "Authorized Signature",
        x: 500,
        y: 900,
        width: 200,
        height: 60,
      },
    ],
  },

  idCard: {
    name: "ID Card",
    elements: [
      {
        type: "rectangle",
        x: 0,
        y: 0,
        width: 350,
        height: 550,
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderColor: "#2563eb",
      },
      {
        type: "image",
        x: 125,
        y: 50,
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      {
        type: "dynamicField",
        placeholder: "{{EmployeeName}}",
        x: 50,
        y: 180,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        width: 250,
      },
      {
        type: "qrCode",
        data: "{{EmployeeID}}",
        x: 125,
        y: 400,
        size: 100,
      },
    ],
  },
};

export const defaultCellStyle = {
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: "Arial",
  color: "#000000",
  backgroundColor: "transparent",
  textAlign: "center",
  verticalAlign: "middle",
  padding: 8,
  borderWidth: 1,
  borderColor: "#000000",
};



// export const elementTypes = {
//   text: {
//     name: "Text",
//     icon: Type,
//     defaultProps: {
//       type: "text",
//       value: "Static Text",
//       fontSize: 14,
//       fontWeight: "normal",
//       color: "#000000",
//       backgroundColor: "transparent",
//       textAlign: "left",
//       x: 50,
//       y: 50,
//       width: 500,
//     },
//   },
//   header: {
//     name: "Header",
//     icon: Type,
//     defaultProps: {
//       type: "header",
//       value: "Section Header",
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "#000000",
//       backgroundColor: "transparent",
//       textAlign: "left",
//       underline: false,
//       x: 50,
//       y: 50,
//       width: 500,
//     },
//   },
//   table: {
//     name: "Table",
//     icon: Table,
//     defaultProps: {
//       type: "table",
//       rows: 2,
//       cols: 2,
//       width: 400,
//       height: 100,
//       borderWidth: 1,
//       borderColor: "#000000",
//       headerRow: false,
//       cellData: {},
//       mergedCells: {},
//       cellStyles: {},
//       x: 50,
//       y: 50,
//     },
//   },
//   image: {
//     name: "Image",
//     icon: ImageIcon,
//     defaultProps: {
//       type: "image",
//       width: 400,
//       height: 150,
//       alt: "Uploaded Image",
//       src: "",
//       x: 50,
//       y: 50,
//     },
//   },
//   rectangle: {
//     name: "Rectangle",
//     icon: Square,
//     defaultProps: {
//       type: "rectangle",
//       width: 400,
//       height: 100,
//       backgroundColor: "#ffffff",
//       borderWidth: 1,
//       borderColor: "#d1d5db",
//       x: 50,
//       y: 50,
//     },
//   },
//   line: {
//     name: "Line",
//     icon: Minus,
//     defaultProps: {
//       type: "line",
//       width: 400,
//       height: 2,
//       color: "#000000",
//       lineWidth: 1,
//       x: 50,
//       y: 50,
//     },
//   },
//   link: {
//     name: "Link",
//     icon: Link,
//     defaultProps: {
//       type: "link",
//       text: "Click Here",
//       href: "https://example.com",
//       color: "#2563eb",
//       fontSize: 14,
//       fontWeight: "normal",
//       underline: true,
//       openInNewTab: false,
//       x: 50,
//       y: 50,
//       width: 400,
//     },
//   },
//   textarea: {
//     name: "Textarea",
//     icon: AlignLeft,
//     defaultProps: {
//       type: "textarea",
//     //   value: "Multi-line text content...",
//       width: 400,
//       height: 100,
//       rows: 3,
//       fontSize: 12,
//       fontWeight: "normal",
//       color: "#000000",
//       backgroundColor: "#ffffff",
//       borderWidth: 1,
//       borderColor: "#d1d5db",
//       fontFamily: "Arial",
//       x: 50,
//       y: 50,
//     },
//   },
//   signature: {
//     name: "Signature",
//     icon: PenTool,
//     defaultProps: {
//       type: "signature",
//       src: "",
//       width: 200,
//       height: 80,
//       x: 50,
//       y: 50,
//     },
//   },
//   qr: {
//     name: "QR Code",
//     icon: QrCodeIcon,
//     defaultProps: {
//       type: "qr",
//     //   value: "https://example.com",
//       size: 100,
//       x: 50,
//       y: 50,
//     },
//   },
// };

// export const templatePresets = {
//     admissionForm: {
//         name: "Admission Form",
//         elements: [
//             {
//                 type: "header",
//                 value: "GENESIS GLOBAL SCHOOL",
//                 x: 50,
//                 y: 50,
//                 fontSize: 24,
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 backgroundColor: "transparent",
//                 width: 700
//             },
//             {
//                 type: "text",
//                 value: "SEC-132, EXPRESSWAY, NOIDA ; 201304",
//                 x: 50,
//                 y: 90,
//                 fontSize: 12,
//                 fontWeight: "normal",
//                 textAlign: "center",
//                 backgroundColor: "transparent",
//                 width: 700
//             },
//             {
//                 type: "line",
//                 x: 50,
//                 y: 130,
//                 width: 700,
//                 color: "#000000",
//                 lineWidth: 2
//             },
//             {
//                 type: "header",
//                 value: "Admission Form",
//                 x: 50,
//                 y: 150,
//                 fontSize: 18,
//                 fontWeight: "bold",
//                 backgroundColor: "transparent"
//             }
//         ]
//     }
// };

// export const defaultCellStyle = {
//     fontSize: 12,
//     fontWeight: "normal",
//     fontFamily: "Arial",
//     color: "#000000",
//     backgroundColor: "transparent",
//     textAlign:"center",
//     verticalAlign: "middle",
//     padding: 4,
//     borderWidth: 1,
//     borderColor: "#000000"
// };
