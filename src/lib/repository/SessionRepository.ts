import type {PrismaClient, Session} from "@prisma/client";
import db from "../db";
import type {UserWithoutSecrets} from "./UserRepository";
import {removeSecretsFromUser} from "./repositoryUtils";

export type SessionWithUserWithoutSecrets = Session & { user: UserWithoutSecrets };

export interface SessionRepository {
    getSession(session: string): Promise<SessionWithUserWithoutSecrets | null>;

    isSessionValid(session: string): Promise<boolean>;

    getUserBySession(session: string): Promise<UserWithoutSecrets | null>;

    logout(session: string): Promise<void>;

    logoutFromAll(username: string, session: string): Promise<void>;
}

class SessionRepositoryImpl implements SessionRepository {

    constructor(private db: PrismaClient) {
    }

    async getSession(session: string): Promise<SessionWithUserWithoutSecrets | null> {
        const sessionWithUser = await this.db.session.findUnique({
            where: {
                sessionToken: session
            },
            include: {
                user: true
            }
        });
        if (sessionWithUser === null) return null;

        (sessionWithUser as SessionWithUserWithoutSecrets).user = removeSecretsFromUser(sessionWithUser.user)!;
        return sessionWithUser;
    }

    async isSessionValid(session: string): Promise<boolean> {
        const sessionData = await this.getSession(session)
        if (sessionData === null) return false;
        const expired = sessionData.expired;
        const expireDate = sessionData.expiresAt

        if (expireDate === null) {
            return !expired;
        }
        if (expireDate.getTime() < Date.now()) {
            console.log(expireDate.getTime())
            console.log(Date.now());
            // await this.logout(session);
            return false;
        }
        return !expired;
    }

    async getUserBySession(session: string): Promise<UserWithoutSecrets | null> {
        if (!await this.isSessionValid(session)) {
            return null;
        }
        const sessionData = await this.getSession(session);
        if (sessionData === null) return null;

        return sessionData.user;
    }

    async logout(session: string): Promise<void> {
        const sesh = await this.db.session.update({
            where: {
                sessionToken: session
            },
            data: {
                expired: true
            }
        });
    }

    async logoutFromAll(username: string, session: string): Promise<void> {
        if (await this.isSessionValid(session)) {
            await this.logout(session);
        }
        await this.db.session.updateMany({
            where: {
                user: {name: username},
            },
            data: {
                expired: true
            }
        });
    }
}

const sessionRepository: SessionRepository = new SessionRepositoryImpl(db);
export {sessionRepository};