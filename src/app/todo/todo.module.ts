import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoReactiveFormComponent } from './todo-reactive-form/todo-reactive-form.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TodoListComponent, TodoFormComponent, TodoReactiveFormComponent],
  exports: [TodoListComponent, TodoFormComponent, TodoReactiveFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class TodoModule { }
