import { FormData } from "../components/RegisterForm";

export const postCustomer = async (data: FormData): Promise<void> => {
    const payload = {
        type: "INDIVIDUAL",
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName,
        egn: data.egn || "",
        phoneNumber: data.phoneNumber || "",
        emailAddress: data.emailAddress || "",
        address: data.address,
        postcode: data.postcode,
    };

    const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to submit form");
    }

    return response.json();
};