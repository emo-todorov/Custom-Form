import { z } from 'zod';

interface Field {
    name: string;
    label: string;
    required?: boolean;
    pattern?: RegExp;
    errorMessage?: string;
    minLength?: number;
    maxLength?: number;
}

export const createSchema = (fields: Field[]) => {
    let schemaObject: Record<string, z.ZodString> = {};

    fields.forEach(field => {
        let validator: z.ZodString | z.ZodOptional<z.ZodString> = z.string();
        if (field.required) {
            validator = validator.nonempty(`${field.label} is required`);
        }
        if (field.pattern) {
            validator = validator.regex(field.pattern, field.errorMessage || `Invalid ${field.label}`);
        }
        if (field.minLength) {
            validator = validator.min(field.minLength);
        }
        if (field.maxLength) {
            validator = validator.max(field.maxLength);
        }
        if (!field.required) {
            validator = validator.optional();
        }

        schemaObject[field.name] = validator as z.ZodString;
    });

    return z.object(schemaObject)
        .refine((data) => {
            if (data.address?.includes("Sofia") && data.postcode !== "1000") {
                return false;
            }
            return true;
        }, {
            message: "If the address contains 'Sofia', the postcode must be 1000.",
            path: ["postcode"],
        })
        .refine(data => data.phoneNumber || data.emailAddress, {
            message: "Either phone number or email is required",
            path: ["phoneNumber"],
        });
};