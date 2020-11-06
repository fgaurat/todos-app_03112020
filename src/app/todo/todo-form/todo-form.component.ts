import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Todo } from '../core/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm = {
    title: '',
    dueDate: '',
    completed: false,
  }

  constructor(private todoService: TodoService,private eventBus:EventBusService) { }

  ngOnInit(): void {
  }
  
  addTodo() {

    let todo:Todo = {...this.todoForm,dueDate:new Date(this.todoForm.dueDate).getTime()}
    console.log(this.todoForm)
    console.log(todo)
    this.todoService.save(todo).subscribe( () => this.eventBus.dispatch('NEW_TODO'))

  }



}
