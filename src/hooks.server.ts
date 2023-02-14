import type { Handle } from '@sveltejs/kit';
import {sessionRepository} from "./lib/repository/SessionRepository";
import {SESSION_TOKEN_NAME} from "./lib/config";

export const handle = (async ({ event, resolve}) => {

    const sessionToken = event.cookies.get(SESSION_TOKEN_NAME);
    if (sessionToken) {
        const user = await sessionRepository.getUserBySession(sessionToken);
        if (user) {
            event.locals.user = user;
        }
    }
    const response = await resolve(event);
    return response;
}) satisfies Handle;