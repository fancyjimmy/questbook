import type {Actions} from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {logRepository} from "$lib/repository/LogRepository";
import {formDataToJSON, FormDataValidator } from "$lib/utils";
import {questRepository} from "../../../lib/repository/QuestRepository";
import { questFormValidator } from "$lib/domain/formDataAttributes/QuestFormData";
import type { Quest } from "@prisma/client";

export const load: PageServerLoad = async ({locals, parent}) => {
    const user = locals.user;


    return{
        user: locals.user,
        logs: "logs",
        availableQuests: await questRepository.getAllQuestsByUser(user.name!)
    }
}


export const actions: Actions = {
    createQuest: async ({request, locals}) => {
        const formData = await request.formData();

        const quest = formDataToJSON(formData);

        try {
            if (questFormValidator.validate(quest)){
                console.log(quest);
                const questForm = questFormValidator.convert(quest);
                console.log("hey");
                console.log(questForm);
                console.log("hi");

                return {
                    success: false,
                    error: "Form submitted is not valid"
                };
            }
            console.log(quest);
            const questForm = questFormValidator.convert(quest);
            console.log(questForm);
            const result = await questRepository.createQuest(questForm as Quest, locals.user.name!);

            return {
                success: true,
                result,
                code: "CREATED"
            }
        } catch (e) {
            console.error(e);
            return {
                success: false,
                error: e + ""
            }
        }
    }
}