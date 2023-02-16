import type {PageServerLoad} from "./$types";
import type {Actions} from "@sveltejs/kit";
import {userRepository} from "$lib/repository/UserRepository";
import {dataTypes, formDataToJSON, FormDataValidator} from "$lib/utils";
import {setSessionCookie} from "$lib/utils";
import {getSessionCookie} from "$lib/utils";
import {sessionRepository} from "$lib/repository/SessionRepository";
import {SESSION_TOKEN_NAME} from "$lib/config";

export const load: PageServerLoad = ({locals}) => {

    return {
        user: locals.user
    }
}


type UserForm = {
    username: string,
    password: string
};

const userFormValidator: FormDataValidator<UserForm> = new FormDataValidator<UserForm>({
    username: {
        optional: false,
        type: dataTypes.String
    },
    password: {
        optional: false,
        type: dataTypes.String
    }
});


export const actions: Actions = {
    login: async ({request, cookies}) => {
        const formData = await request.formData();

        const user = formDataToJSON(formData);

        try {
            const userForm = userFormValidator.convert(user);
            const session = await userRepository.login(userForm.username, userForm.password);

            setSessionCookie(cookies, session);
            return {
                success: true,
                result: "Login successful",
                code: "LOGIN"
            }
        } catch (e) {
            return {
                success: false,
                error: e + ""
            }
        }
    },
    logout: async ({locals, cookies}) => {
        const sessionToken = getSessionCookie(cookies);

        if (sessionToken != null) {
            await sessionRepository.logout(sessionToken);

            cookies.set(SESSION_TOKEN_NAME, "", {
                expires: new Date(Date.now() - 100000)
            });
            return {
                success: true,
                result: "Logout successful",
                code: "LOGOUT"
            }
        }

        return {
            success: false,
            error: "No session token found"
        }

    }
}