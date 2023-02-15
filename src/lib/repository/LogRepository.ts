import db from "$lib/db";
import type { Log, PrismaClient } from "@prisma/client";

export interface LogRepository{
    createLog(username: string, message: string): Promise<Log>;
    createQuestStartedLog(username: string, questId: number): Promise<Log>;
    createQuestCompletedLog(username: string, questId: number): Promise<Log>;
    createQuestFailedLog(username: string, questId: number): Promise<Log>;
    createQuestGivenUpLog(username: string, questId: number): Promise<Log>;

    createTaskCompletedLog(username: string, taskId: number): Promise<Log>;
    getLogById(id: number): Promise<Log | null>
    getAllLogsByUser(username: string): Promise<Log[]>
    getPaginatedLogs(username: string, skip:number, take:number): Promise<Log[]>
}

class LogRepositoryImpl implements LogRepository{
    constructor(private db: PrismaClient) {
    }
    async createLog(username: string, message: string): Promise<Log> {
        const log = await this.db.log.create({
            data:{
                userName: username,
                text: message
            }
        })
        return log;
    }
    async createQuestStartedLog(username: string, questId: number): Promise<Log>{
        const message = ">Quest " + questId + " started";
        return await this.createLog(username, message);
    }

    async createQuestFailedLog(username: string, questId: number): Promise<Log> {
        const message = ">Quest " + questId + " failed";
        return await this.createLog(username, message);
    }

    async createQuestCompletedLog(username: string, questId: number): Promise<Log> {
        const message = ">Quest " + questId + " completed";
        return await this.createLog(username, message);    }

    async createQuestGivenUpLog(username: string, questId: number): Promise<Log> {
        const message = ">Quest " + questId + " given up";
        return await this.createLog(username, message);
    }

    async createTaskCompletedLog(username: string, taskId: number): Promise<Log> {
        const message = ">Task " + taskId + " completed";
        return await this.createLog(username, message);
    }


    async getLogById(id: number): Promise<Log| null> {
        const log = this.db.log.findUnique({
            where: {
                id: id
            }
        })
        return log;
    }
    async getAllLogsByUser(username: string): Promise<Log[]> {
        const logs = this.db.log.findMany({
            where: {
                userName: username
            }
        })
        return logs;
    }

    async getPaginatedLogs(username: string, skip: number, take: number): Promise<Log[]> {
        const logs = this.db.log.findMany({
            where: {
                userName: username
            },
            skip: skip,
            take: take
        })
        return logs;
    }

}

const logRepository: LogRepository = new LogRepositoryImpl(db);
export {logRepository};