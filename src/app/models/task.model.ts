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
    isCreated: boolean;
    color: string;
    createdAt?: Date;
    createdBy?: IUser
}

export enum TaskType {
    Text = 'text',
    Checklist = "checklist",
};