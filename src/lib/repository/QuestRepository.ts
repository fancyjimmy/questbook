import type {PrismaClient, Quest, Task} from '@prisma/client';
import db from '../db';

export type QuestWithDetails = Quest & {
    tasks: Task[];
};

export interface QuestRepository {
    getAllQuestsByUser(userName: string): Promise<Quest[]>;

    getAllAvailableQuestsForUser(userName: string): Promise<Quest[]>;

    createQuest(quest: Quest, userName: string): Promise<Quest>;

    getQuest(questId: number): Promise<QuestWithDetails | null>;

    isQuestVisibleForUser(userName: string, questId: number): Promise<boolean>;

    isQuestTakeAble(userName: string, questId: number): Promise<boolean>;
}

class QuestRepositoryImpl implements QuestRepository {
    constructor(private db: PrismaClient) {
    }

    async isQuestTakeAble(userName: string, questId: number): Promise<boolean> {
        if (!(await this.isQuestVisibleForUser(userName, questId))) {
            return false;
        }
        // has to exist because it is used in isQuestVisibleForUser
        const quest = (await this.getQuest(questId)) as Quest;

        const openParticipation = await this.db.userQuest.findFirst({
            where: {
                userName: userName,
                questId: questId,
                completed: false
            }
        });

        if (openParticipation) {
            return false;
        }

        if (!quest.retakeAble) {
            const userQuestExists = await this.db.userQuest.findFirst({
                where: {
                    userName: userName,
                    questId: questId
                }
            });

            if (userQuestExists) return false;
        }
        return true;
    }

    async isQuestVisibleForUser(userName: string, questId: number): Promise<boolean> {
        const quest = await this.getQuest(questId);

        if (!quest) throw new Error("Quest doesn't exist");
        if (quest.questVisibility === 'public') return true;
        if (quest.creatorName === userName) return true;
        if (quest.questVisibility === 'protected') {
            const questSharing = await this.db.questSharing.findUnique({
                where: {
                    userName_questId: {
                        userName,
                        questId
                    }
                }
            });
            if (questSharing) {
                return true;
            }
        }
        return false;
    }

    async createQuest(quest: Quest, userName: string): Promise<Quest> {
        const questCreated = await this.db.quest.create({
            data: {
                ...quest,
                creatorName: userName
            }
        });

        return questCreated;
    }

    async getQuest(questId: number): Promise<QuestWithDetails | null> {
        const quest = this.db.quest.findUnique({
            where: {
                id: questId
            },
            include: {
                tasks: true
            }
        });

        return quest;
    }

    async getAllQuestsByUser(userName: string): Promise<Quest[]> {
        const quests = await this.db.quest.findMany({
            where: {
                creatorName: userName
            }
        });

        return quests;
    }

    async getAllAvailableQuestsForUser(userName: string): Promise<Quest[]> {
        const sharedQuests = await this.db.user.findUnique({
            where: {
                name: userName
            },
            include: {
                QuestSharing: {
                    include: {
                        quest: true
                    }
                }
            }
        });
        if (sharedQuests == null) throw new Error('user not real');

        const publicQuests = await this.db.quest.findMany({
            where: {
                questVisibility: 'public'
            }
        });

        const ownQuests = await this.getAllQuestsByUser(userName);

        const participatedQuest = await this.db.userQuest.findMany({
            where: {
                userName: userName
            },
            select: {
                questId: true,
                ended: true
            }
        });

        const allQuests = [
            ...ownQuests,
            ...publicQuests,
            ...sharedQuests.QuestSharing.map((questSharing) => questSharing.quest)
        ];

        const availableQuests: Quest[] = [];
        for (let i = 0; i < allQuests.length; i++) {
            const quest = allQuests[i];
            if (participatedQuest.includes({questId: quest.id, ended: true})){ // if there is an open quest with
                continue;
            }
            if (!quest.retakeAble && participatedQuest.includes({questId: quest.id, ended: false})){
                continue
            }
            availableQuests.push(quest);
        }
        return availableQuests;
    }
}

const questRepository: QuestRepository = new QuestRepositoryImpl(db);

export {questRepository};
