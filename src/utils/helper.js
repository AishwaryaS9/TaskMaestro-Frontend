import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const getGreetingMessage = () => {
    try {
        const currentHour = moment().hour();

        if (currentHour < 12) return "Good Morning";
        if (currentHour < 18) return "Good Afternoon";
        return "Good Evening";
    } catch (error) {
        console.error("Error determining the current time:", error);
        return "Welcome";
    }
};