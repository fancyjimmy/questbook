// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import {User} from "@prisma/client";

declare global {
	namespace App {
		interface Error {
            redirect?: boolean
            location?: string,
            display? : string
        }
		interface Locals {
            user: Partial<User>
        }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
