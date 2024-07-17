import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  today: number = Date.now();
  tasks: number[] = []

  addTask() {
    this.tasks.push(this.tasks.length + 1)
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1)
  }
}
