import type {PrismaClient, Session, User} from '@prisma/client';
import {MILLISECONDS_IN_SECOND, MINUTES_IN_HOUR, SECONDS_IN_MINUTE} from "../config";
import bcrypt from "bcrypt";
import db from "../db";
import {SESSION_EXPIRATION_TIME, SESSION_TOKEN_NAME} from "../config";
import {removeSecretsFromUser} from "./repositoryUtils";

export type UserWithoutSecrets = Omit<User, "passwordHash">;


export interface PasswordHasher {
    hash(password: string): Promise<string>;

    compare(password: string, hash: string): Promise<boolean>;
}

class BcryptPasswordHasher implements PasswordHasher {
    static SALT_ROUNDS = 12;
    constructor(private saltrounds: number = BcryptPasswordHasher.SALT_ROUNDS) {
    }

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltrounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}

export interface UserRepository {
    getUser(username: string): Promise<UserWithoutSecrets | null>;

    login(username: string, password: string): Promise<Session>;

    canLogin(username: string, password: string): Promise<boolean>;

    register(username: string, password: string): Promise<UserWithoutSecrets>;

    userExists(username: string): Promise<boolean>;
}


class UserRepositoryImpl implements UserRepository {

    constructor(private db: PrismaClient, private passwordHasher: PasswordHasher, private sessionExpiration: number = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR) {
    }


    async getUser(username: string): Promise<UserWithoutSecrets | null> {
        const user = await this.db.user.findUnique({
            where: {name: username},
        });
        return removeSecretsFromUser(user);
    }

    async login(username: string, password: string): Promise<Session> {
        if (!await this.canLogin(username, password)) {
            throw new Error("Invalid credentials");
        }

        const session = await this.db.session.create({
                data: {
                    user: {
                        connect: {name: username}
                    },
                    expiresAt: new Date(Date.now() + this.sessionExpiration)
                }
            }
        );
        return session;
    }

    async canLogin(username: string, password: string): Promise<boolean> {
        const user = await this.db.user.findUnique({
            where: {name: username},
        });
        if (user === null) return false;
        return await this.passwordHasher.compare(password, user.passwordHash);
    }

    async userExists(username: string): Promise<boolean> {
        const user = await this.db.user.findUnique({
            where: {name: username},
        });
        return user !== null;
    }

    async register(username: string, password:string): Promise<UserWithoutSecrets> {
        if (await this.userExists(username)) throw new Error("User already exists");
        const passwordHash = await this.passwordHasher.hash(password);
        const newUser = await this.db.user.create({
            data: {
                name: username,
                passwordHash
            }
        });
        return removeSecretsFromUser(newUser)!;
    }

}

const userRepository: UserRepository = new UserRepositoryImpl(db, new BcryptPasswordHasher(12), SESSION_EXPIRATION_TIME);

export {userRepository};
