import { Type, Table, ImageIcon, Square, Minus, Link, AlignLeft } from "lucide-react";

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
    }
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
            x: 50,
            y: 50,
            width: 100
        }
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
            underline: false,
            x: 50,
            y: 50,
            width: 150
        }
    },
    table: {
        name: "Table",
        icon: Table,
        defaultProps: {
            type: "table",
            rows: 2,
            cols: 2,
            width: 400,
            height: 100,
            borderWidth: 1,
            borderColor: "#000000",
            headerRow: false,
            cellData: {},
            mergedCells: {},
            cellStyles: {},
            x: 50,
            y: 50
        }
    },
    image: {
        name: "Image",
        icon: ImageIcon,
        defaultProps: {
            type: "image",
            width: 200,
            height: 150,
            alt: "Uploaded Image",
            src: "",
            x: 50,
            y: 50
        }
    },
    rectangle: {
        name: "Rectangle",
        icon: Square,
        defaultProps: {
            type: "rectangle",
            width: 200,
            height: 100,
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#d1d5db",
            x: 50,
            y: 50
        }
    },
    line: {
        name: "Line",
        icon: Minus,
        defaultProps: {
            type: "line",
            width: 200,
            height: 2,
            color: "#000000",
            lineWidth: 1,
            x: 50,
            y: 50
        }
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
            openInNewTab: false,
            x: 50,
            y: 50,
            width: 100
        }
    },
    textarea: {
        name: "Textarea",
        icon: AlignLeft,
        defaultProps: {
            type: "textarea",
            value: "Multi-line text content...",
            width: 200,
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
            y: 50
        }
    }
};

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
                width: 700
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
                width: 700
            },
            {
                type: "line",
                x: 50,
                y: 130,
                width: 700,
                color: "#000000",
                lineWidth: 2
            },
            {
                type: "header",
                value: "Admission Form",
                x: 50,
                y: 150,
                fontSize: 18,
                fontWeight: "bold",
                backgroundColor: "transparent"
            }
        ]
    }
};

export const defaultCellStyle = {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Arial",
    color: "#000000",
    backgroundColor: "transparent",
    textAlign: "left",
    verticalAlign: "middle",
    padding: 4,
    borderWidth: 1,
    borderColor: "#000000"
};
