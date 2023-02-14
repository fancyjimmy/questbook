import {dataTypes, FormDataValidator} from "../../utils";
import type {FormDataAttributes} from "../../utils";

export type Enumerate<N extends number, Acc extends number [] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>
export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type PartHours = IntRange<0, 24>;
export type PartDays = IntRange<0, 7>;
export type PartWeeks = IntRange<0, 4>;
export type PartMonths = IntRange<0, 12>;

export type Duration = `${PartHours} ${PartDays} ${PartWeeks} ${PartMonths}`;
export type Days = `${IntRange<1, 366>}`;
export type QuestVisibility = "private" | "protected" | "public";
export type QuestType = "main" | "side" | "chore" | "weekly" | "daily";
export type QuestTimingDate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
export type QuestTimingList = `List:${string}`;
export type QuestTiming = "unlimited" | "custom" | QuestTimingDate | QuestTimingList | Duration | Days;

export function isDate(date: string){
    const dateIs = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/.test(date);
    return dateIs;
}

export function isDuration(duration: string){
    const durationIs = /\d \d \d \d/.test(duration);
    return durationIs;
}

export function isList(list: string){
    const listIs = /List:(((\d \d \d \d)|(^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]))),)*/.test(list);
    return listIs;
}

export type QuestForm = {
    name: string,
    description: string | null,
    questVisibility: QuestVisibility,
    questType: QuestType,
    questTiming: QuestTiming | null,
    retakeAble: boolean,
    strictTimeLimit: boolean
}

export const questFormDataAttributes : FormDataAttributes<QuestForm> = {
    name: {
        optional: false,
        type: dataTypes.String
    },
    description: {
        optional: true,
        type: dataTypes.String
    },
    questVisibility: {
        optional:false,
        type: {
            validate: (value) => {
                return ["public", "private", "protected"].includes(value);
            },
            convert : (value ) => {
                return value as QuestVisibility;
            }
        }
    },
    questType: {
        optional: false,
        type:{
            validate: (value) => {
                return ["main", "side", "chore", "weekly", "daily"].includes(value);

            },
            convert: (value) => {
                return value as QuestType;
            }
        }
    },
    questTiming: {
        optional: true,
        type: {
            validate: (value) => {
                return true;
            },
            convert: (value) => {
                return value as QuestTiming;
            }
        }
    },
    retakeAble: {
        optional: true,
        type: dataTypes.Boolean
    },
    strictTimeLimit: {
        optional: true,
        type: dataTypes.Boolean
    }
};

export const questFormValidator: FormDataValidator<QuestForm> = new FormDataValidator<QuestForm>(questFormDataAttributes);
