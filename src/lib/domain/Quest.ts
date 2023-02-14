export type SkillSideEffect = (level: number) => void;
export type StatusSideEffect = (level: number) => void;



interface Skill {
	id: number;
	name: string;
	description: string;
	icon: string;
	maxLevel: number;
	progression: (level: number) => number;
	sideEffect: SkillSideEffect[];
}

interface SkillLevel {
	skill: Skill;
	level: number;
	experience: number;
}

interface Status {
	id: number;
	name: string;
	description: string;
	icon: string;
	maxLevel: number;
	progression: (level: number) => number;
	sideEffect: StatusSideEffect[];
}

interface StatusLevel {
	status: Status;
	level: number;
	experience: number;
}

class User {
	constructor(private id: number, private name: string, private avatar: string) {}
}

class SkillManager {
	constructor(private user: User) {}
}

class QuestManager {
	constructor(private user: User) {}
}