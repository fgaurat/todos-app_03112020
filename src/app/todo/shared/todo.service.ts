import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../core/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.url_todos);
  }

  delete(todo: Todo): Observable<any> {
    const url_delete = `${environment.url_todos}/${todo.id}`
    return this.httpClient.delete<any>(url_delete)
  }

  save(todo: Todo):Observable<Todo> {
    return this.httpClient.post<Todo>(environment.url_todos,todo,this.httpOptions);
  }
}
