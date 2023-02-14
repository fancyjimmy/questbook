import type {PageServerLoad} from "./$types";
import type {Actions} from "@sveltejs/kit";
import {userRepository} from "$lib/repository/UserRepository";
import {dataTypes, formDataToJSON, FormDataValidator} from "$lib/utils";
import {setSessionCookie} from "$lib/utils";

export const load: PageServerLoad = ({locals}) => {

    return {
        user: locals.user
    }
}
