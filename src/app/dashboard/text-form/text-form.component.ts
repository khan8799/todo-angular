import { Component, EventEmitter, Output, Input } from '@angular/core';
import { IChecklist, ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent {
  @Input() task!: ITask;
  @Output() onSaveTask = new EventEmitter<{taskName: string, task: ITask, checklists: IChecklist[]}>()
  taskName = '';

  onSave(): void {
    this.onSaveTask.emit({
      taskName: this.taskName,
      task: this.task,
      checklists: []
    });
    this.taskName = '';
  }
}
