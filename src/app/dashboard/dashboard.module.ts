import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';
import { TextFormComponent } from './text-form/text-form.component';
import { CreateTaskButtonComponent } from '../components/create-task-button/create-task-button.component';
import { TaskDetailComponent } from '../components/task-detail/task-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChecklistFormComponent,
    TextFormComponent,
    CreateTaskButtonComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
