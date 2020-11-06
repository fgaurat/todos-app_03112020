import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable,merge } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Action } from 'src/app/core/action';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Todo } from '../core/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {

  todoList$: Observable<Todo[]>
  displayedColumns: string[] = ['id', 'title', 'dueDate', 'completed','actions'];

  constructor(private todoService:TodoService,private _snackBar: MatSnackBar, private eventBus:EventBusService) { }

  ngOnInit(): void {
    
    const loadTodos$ = this.eventBus.bus$.pipe(filter(action => action.type=="LOAD_TODOS"))
    const newTodo$ = this.eventBus.bus$.pipe(filter(action => action.type=="NEW_TODO"))
    const deleteTodo$ = this.eventBus.bus$.pipe(
        filter(action => action.type=="DELETE_TODO"),
        switchMap( (action) =>  this.todoService.delete(action.payload as Todo))
        )
    
    const all$ = merge(loadTodos$,newTodo$,deleteTodo$)

    
    all$.subscribe( () => {
      this.todoList$ = this.todoService.findAll()
    })

  }
  
  ngAfterViewInit(){
    this.eventBus.dispatch({type:"LOAD_TODOS"})
  }

  doDelete(todo:Todo){
    const action:Action = {
      type:'DELETE_TODO',
      payload:todo
    }

    this.eventBus.dispatch(action)

  }
}



