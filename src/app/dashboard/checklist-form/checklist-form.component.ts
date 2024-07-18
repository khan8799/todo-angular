import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IChecklist, ITask } from 'src/app/models/task.model';
import { randomString } from 'src/app/utilities/randomString';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.scss']
})
export class ChecklistFormComponent implements OnInit {
  @Input() task!: ITask;
  @Output() onSaveTask = new EventEmitter<{taskName: string, task: ITask, checklists: IChecklist[]}>()

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      taskName: ['', Validators.required],
      checklists: this.fb.array([this.getChecklistFormGroup()])
    });
  }

  get checklists(): FormArray {
    return this.form.get('checklists') as FormArray;
  }

  getChecklistFormGroup(): FormGroup {
    return this.fb.group({
      checklist: ['', Validators.required]
    });
  }

  addChecklist(): void {
    this.checklists.push(this.getChecklistFormGroup());
  }

  removeChecklist(index: number): void {
    this.checklists.removeAt(index);
  }

  onSubmit(): void {
    const {taskName, checklists} = this.form.value

    this.onSaveTask.emit({
      taskName,
      checklists: checklists.map((v: any) => {
        return {
          _id: randomString(),
          name: v.checklist,
          isCompleted: false
        }
      }),
      task: this.task
    })
  }

}
