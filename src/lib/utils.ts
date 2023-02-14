import type {Session} from "@prisma/client";
import type {Cookies, RequestHandler} from "@sveltejs/kit";
import {SESSION_TOKEN_NAME} from "./config";

export function normalizeDateForPrisma(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function normalizeDateTimeForPrisma(date: Date): string {
    return date.toISOString();
}

export function formDataToJSON(formData: FormData): any {
    const form = {} as any;
    for (const entry of formData.entries()) {
        if (entry.length == 2) {
            form[entry[0]] = entry[1];
        } else {
            form[entry[0]] = entry.slice(1);
        }
    }
    return form;
}

export function setSessionCookie(cookies: Cookies ,session: Session){
    cookies.set(`${SESSION_TOKEN_NAME}`, `${session.sessionToken}`, {
        expires: session.expiresAt || undefined,
        httpOnly: true,
        sameSite: "strict"
    })
}

export function getSessionCookie(cookie: Cookies): string | undefined {
    return cookie.get(SESSION_TOKEN_NAME);
}

export function hasAttributes(object: any, attributes: string[]): boolean {
    for (const attribute of attributes) {
        if (!object.hasProperty(attribute)) {
            return false;
        }
    }
    return true;
}

export type FormDataType<Type> = {
    inputType?: string
    validate: (value: string) => boolean;
    convert: (value: string) => Type;
};

export type FormDataAttribute<Type> = {
    optional: boolean;
    type: FormDataType<Type>;
};

export type FormDataAttributes<Type> = {
    [key in keyof Type]: FormDataAttribute<Type[key]>;
};

export class FormDataValidator<T> {
    constructor(private formDataAttributes: FormDataAttributes<T>) {
    }

    validate(obj: any): boolean {
        for (const formDataName in this.formDataAttributes) {
            const formDataAttribute = this.formDataAttributes[formDataName];
            if (!formDataAttribute.optional && !(formDataName in obj)) {
                return false;
            }

            const value = obj[formDataName];

            if (!value) continue;
            if (!formDataAttribute.type.validate(obj[value])) {
                return false;
            }
        }

        return true;
    }

    convert(obj: any): T {
        if (!this.validate(obj)) throw new Error('Object not valid');
        const object = {} as T;
        for (const formDataName in this.formDataAttributes) {
            const formDataAttribute = this.formDataAttributes[formDataName];
            const value = obj[formDataName];
            if (!value) {
                continue;
            }

            object[formDataName] = formDataAttribute.type.convert(value);
        }
        return object;
    }
}

export const dataTypes = {
    Integer: {
        inputType: "number",
        convert: function (value): number {
            return Number.parseInt(value);
        },
        validate: function (value): boolean {
            return Number.isSafeInteger(value);
        }
    } as FormDataType<number>,

    String: {
        inputType: "text",
        convert: function (value): string {
            return value;
        },
        validate: function (value): boolean {
            return true;
        }
    } as FormDataType<string>,
    Boolean: {
        inputType: "checkbox",
        convert: function (value): boolean {
            return value === 'on' ? true : false;
        },
        validate: function (value): boolean {
            return true;
        }
    } as FormDataType<boolean>,
    Date: {
        inputType: "date",
        convert: function (value): Date {
            return new Date(value);
        },
        validate: function (value): boolean {
            try {
                new Date(value)
                return true;
            } catch (e){
                return false;
            }
        }
    } as FormDataType<Date>,
};




