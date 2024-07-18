import { IUser } from "./auth.model";

export interface ITaskType {
    type: TaskType;
    name: string;
}

export interface ITask {
    _id: string;
    type: string;
    name: string;
    progressPercent: number;
    checklists: IChecklist[];
    isCreated: boolean;
    color: string;
    createdAt?: Date;
    createdBy?: IUser
}

export enum TaskType {
    Text = 'text',
    Checklist = "checklist",
};

export interface IChecklist {
    _id: string;
    name: string;
    isCompleted: boolean;
}