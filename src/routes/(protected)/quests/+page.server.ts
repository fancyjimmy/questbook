import {error, redirect} from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals, parent}) => {
    const parentData = await parent();

    return{
        user: parentData.user
    }
}