import type {Actions} from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {logRepository} from "$lib/repository/LogRepository";
import {formDataToJSON, FormDataValidator } from "$lib/utils";
import {dataTypes} from "../../../lib/utils";

export const load: PageServerLoad = async ({locals, parent}) => {
    const user = locals.user;

    const logs = await logRepository.getAllLogsByUser(user.name!);


    return{
        user: locals.user,
        logs: logs
    }
}

type LogForm = {
    message: string
}

const userFormValidator: FormDataValidator<LogForm> = new FormDataValidator<LogForm>({
    message: {
        optional: false,
        type: dataTypes.String
    }
});


export const actions: Actions = {
    createLog: async ({request, locals}) => {
        const formData = await request.formData();

        const user = formDataToJSON(formData);

        try {
            const logForm = userFormValidator.convert(user);
            const result = await logRepository.createLog(locals.user.name!, logForm.message);

            return {
                success: true,
                result,
                code: "CREATED"
            }
        } catch (e) {
            return {
                success: false,
                error: e + ""
            }
        }
    }
}