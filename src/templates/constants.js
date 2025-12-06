import { Type, Table, Image as ImageIcon, Minus, Link, } from "lucide-react";



export const elementTypes = {
  text: {
    name: "Text",
    icon: Type,
    defaultProps: {
      type: "text",
      value: "Static Text",
      fontSize: 18,
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
  table: {
    name: "Table",
    icon: Table,
    defaultProps: {
      type: "table",
      rows: 2,
      cols: 4,
      width: 600,
      height: 60,
      borderWidth: 2,
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
  line: {
    name: "Line",
    icon: Minus,
    defaultProps: {
      type: "line",
      width: 400,
      height: 2,
      color: "#000000",
      lineWidth: 1,
      lineStyle: "solid",
      x: 50,
      y: 50,
    },
  },

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
  borderColor: "red",
};

export const templatePresets = {
  admissionForm: {
    name: "Admission Form",
    category: "education",
    pageSize: "A4",
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
        color: "#1e40af"
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
        color: "#6b7280"
      },
      {
        type: "line",
        x: 50,
        y: 130,
        width: 700,
        color: "#1e40af",
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
        color: "#dc2626"
      },
      {
        type: "text",
        value: "Student Information",
        x: 50,
        y: 200,
        fontSize: 14,
        fontWeight: "bold",
        color: "#374151"
      },



      {
        type: "text",
        value: "Note: Please submit this form along with required documents",
        x: 50,
        y: 900,
        fontSize: 10,
        fontStyle: "italic",
        color: "#6b7280"
      }
    ],
  },

  invoice: {
    name: "Invoice Template",
    category: "business",
    pageSize: "A4",
    elements: [
      {
        type: "header",
        value: "INVOICE",
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
        color: "#1e40af"
      },

      {
        type: "text",
        value: "From:",
        x: 50,
        y: 140,
        fontSize: 14,
        fontWeight: "bold"
      },

      {
        type: "text",
        value: "Bill To:",
        x: 400,
        y: 140,
        fontSize: 14,
        fontWeight: "bold"
      },
      {
        type: "table",
        x: 50,
        y: 250,
        rows: 8,
        cols: 5,
        width: 700,
        height: 300,
        headerRow: true,
        headers: ["Item", "Description", "Quantity", "Unit Price", "Amount"],
        columnWidths: [50, 250, 80, 100, 100]
      },

      {
        type: "text",
        value: "Thank you for your business!",
        x: 50,
        y: 720,
        fontSize: 12,
        fontStyle: "italic",
        color: "#6b7280"
      }
    ],
  },

  certificate: {
    name: "Certificate of Achievement",
    category: "awards",
    pageSize: "A4",
    elements: [

      {
        type: "image",
        x: 325,
        y: 80,
        width: 150,
        height: 150,
        placeholder: "{{SchoolLogo}}",
        borderRadius: 0,
      },
      {
        type: "header",
        value: "CERTIFICATE OF ACHIEVEMENT",
        x: 50,
        y: 280,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        width: 700,
        color: "#1e40af"
      },
      {
        type: "text",
        value: "This is to certify that",
        x: 50,
        y: 350,
        fontSize: 18,
        textAlign: "center",
        width: 700,
        color: "#374151"
      },

      {
        type: "text",
        value: "has successfully completed the",
        x: 50,
        y: 460,
        fontSize: 18,
        textAlign: "center",
        width: 700,
        color: "#374151"
      },

      {
        type: "text",
        value: "with outstanding performance and dedication",
        x: 50,
        y: 550,
        fontSize: 16,
        textAlign: "center",
        width: 700,
        color: "#374151"
      },
    ],
  },

};



export const backendData = {
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
  "previousSchools": [
    {
      "school": "Kids Global School",
      "year": "2023-24",
      "grade": "2",
      "city": "New York",
      "teacher": "Ms. Taylor",
      "name": "Aarav"
    },
    {
      "school": "Sunshine Academy",
      "year": "2022-23",
      "grade": "1",
      "city": "Los Angeles",
      "teacher": "Mr. Lee",
      "name": "Vivaan"
    },
    {
      "school": "Greenfield International",
      "year": "2021-22",
      "grade": "3",
      "city": "Chicago",
      "teacher": "Mrs. Johnson",
      "name": "Reyansh"
    },
    {
      "school": "Maple Grove School",
      "year": "2020-21",
      "grade": "4",
      "city": "San Francisco",
      "teacher": "Mr. Smith",
      "name": "Darsh"
    },
    {
      "school": "Blue Ridge Academy",
      "year": "2022-23",
      "grade": "2",
      "city": "Miami",
      "teacher": "Ms. Davis",
      "name": "Atharv"
    },
    {
      "school": "Westview High School",
      "year": "2019-20",
      "grade": "5",
      "city": "Seattle",
      "teacher": "Mr. Williams",
      "name": "Advait"
    },
    {
      "school": "Lakeside Prep",
      "year": "2021-22",
      "grade": "1",
      "city": "Austin",
      "teacher": "Mrs. Green",
      "name": "Kabir"
    },
    {
      "school": "Silver Oak School",
      "year": "2023-24",
      "grade": "3",
      "city": "Denver",
      "teacher": "Mr. Harris",
      "name": "Shaurya"
    }
  ]

  ,
  schoolName: "GENESIS GLOBAL SCHOOL",
  schoolAddress: "SEC-132, EXPRESSWAY, NOIDA ; 201304",
};
