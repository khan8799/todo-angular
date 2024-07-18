import { ITaskType, TaskType } from "../models/task.model";

export const TaskTypes: ITaskType[] = [
    {
      type: TaskType.Text,
      name: 'Text'
    },
    {
      type: TaskType.Checklist,
      name: 'Checklist'
    }
  ]