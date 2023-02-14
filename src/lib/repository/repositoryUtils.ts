import type {User} from "@prisma/client";
import type {UserWithoutSecrets} from "./UserRepository";

export function removeSecretsFromUser(user: User | null): UserWithoutSecrets | null {
    if (user === null) return null;
    delete (user as any).passwordHash;
    return user as UserWithoutSecrets;
}