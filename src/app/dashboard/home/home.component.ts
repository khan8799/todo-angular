import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { IUser } from 'src/app/models/auth.model';
import { ITaskType, ITask, TaskType, IChecklist } from 'src/app/models/task.model';
import { SharedService } from 'src/app/services/shared.service';
import {randomColor, randomNumber, randomString} from 'src/app/utilities/randomString';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];
  userInfo!: IUser;
  userInfoSubscription!: Subscription;
  view$!: Observable<'list' | 'grid'>;

  constructor(
    private _sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    const tasks = localStorage.getItem('tasks')
    if (tasks) this.tasks = JSON.parse(tasks)
    this.userInfoSubscription = this._sharedService.user.subscribe(user => this.userInfo = user);
    this.view$ = this._sharedService.view
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
  }

  onAddTask(taskType: ITaskType) {
    const isTaskInProgress = () => this.tasks.some(task => task.isCreated === false);

    if (!this.tasks.length || !isTaskInProgress()) this.tasks.unshift(this.createNewTask(taskType.type));
  }

  createNewTask(type: TaskType) {
    return {
      _id: randomString(),
      type,
      name: '',
      checklists: [],
      isCreated: false,
      color: randomColor(),
      progressPercent: randomNumber(),
    }
  }

  saveNewTask(newTask: {taskName: string, task: ITask, checklists: IChecklist[]}) {
    this._sharedService.toggleLoading(true);

    const index = this.tasks.findIndex(task => task._id === newTask.task._id)
    this.tasks[index].name = newTask.taskName;
    this.tasks[index].checklists = newTask.checklists;
    this.tasks[index].isCreated = true;
    this.tasks[index].createdBy = this.userInfo;
    this.tasks[index].createdAt = new Date();
    this.storeTasksInBrowser();
    timer(500).subscribe({next: () => this._sharedService.toggleLoading(false)})
  }

  storeTasksInBrowser() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1)
    this.storeTasksInBrowser();
  }

  removeChecklist(event: {task: ITask, checklist: IChecklist}): void {
    const index = this.tasks.findIndex(task => task._id === event.task._id)

    const checklistIndex = this.tasks[index].checklists.findIndex(v => v._id === event.checklist._id)
    this.tasks[index].checklists.splice(checklistIndex, 1)
  }

  completeChecklist(event: {task: ITask, checklist: IChecklist}): void {
    const index = this.tasks.findIndex(task => task._id === event.task._id)

    const checklistIndex = this.tasks[index].checklists.findIndex(v => v._id === event.checklist._id)
    this.tasks[index].checklists[checklistIndex].isCompleted = true
  }
}
