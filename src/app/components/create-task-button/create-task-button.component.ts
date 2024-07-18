import { Component, EventEmitter, Output } from '@angular/core';
import { ITaskType } from 'src/app/models/task.model';
import { TaskTypes } from 'src/app/utilities/taskTypes';

@Component({
  selector: 'app-create-task-button',
  templateUrl: './create-task-button.component.html',
  styleUrls: ['./create-task-button.component.scss']
})
export class CreateTaskButtonComponent {
  @Output() onAddTask = new EventEmitter<ITaskType>()
  taskTypes: ITaskType[] = TaskTypes

  onAddTaskClick(taskType: ITaskType) {
    this.onAddTask.emit(taskType)
  }
}
