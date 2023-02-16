import type { LayoutServerLoad } from "./$types";
import {error} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({locals}) => {
    if (!locals.user){
        throw error(401, {
            message: "Not Logged in",
            display: "You have to be logged in to view this page",
            redirect: true,
            location: "/login"
        })
    }

    return{
        user: locals.user
    }

}