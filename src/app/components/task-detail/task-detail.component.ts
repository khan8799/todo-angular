import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChecklist, ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  @Input() task!: ITask;
  @Output() onCompleteChecklist = new EventEmitter<{task: ITask, checklist: IChecklist}>()
  @Output() onRemoveChecklist = new EventEmitter<{task: ITask, checklist: IChecklist}>()

  completeChecklistClick(task: ITask, checklist: IChecklist) {
    this.onCompleteChecklist.emit({
      task,
      checklist
    })
  }

  removeChecklistClick(task: ITask, checklist: IChecklist) {
    this.onRemoveChecklist.emit({
      task,
      checklist
    })
  }
}
