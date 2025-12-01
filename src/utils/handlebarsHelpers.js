import Handlebars from "handlebars";


Handlebars.registerHelper("get", (obj, key) => obj?.[key] ?? "");


Handlebars.registerHelper("formatCurrency", (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(amount)
);


Handlebars.registerHelper("multiply", (a, b) => a * b);


export default Handlebars;
