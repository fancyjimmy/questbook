type LevelSideEffect = (level: number) => void;
export type Attribute = {
    name: string;
    description: string;
    icon: string;
    levelProgression: (level: number) => number;
    maxLevel: number;
    sideEffect: LevelSideEffect[];
}

export type Level<T> = {
    type: T;
    level: number;
    experience: number;
}

export type Skill = {
    name: string;
    description: string;
    icon: string;
levelProgression: (level: number) => number;
    maxLevel: number;
}

export class User{
    constructor(private id: number, private name: string, private avatar: string) {}



}