import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  todoArray = [];
  todo;
  /* append item */
  addTodo(value) {
    if (value !== '') {
      this.todoArray.push(value);
      console.log(this.todo);
    } else {
      alert('Field required **');
    }}
  /*delete item*/
  deleteItem(todo) {
    for (let i = 0; i <= this.todoArray.length ; i++) {
      if (todo === this.todoArray[i]) {
        this.todoArray.splice(i, 1);
      }}
  }
  /* submit Form */
  todoSubmit(value: any) {
    if (value !== '') {
      this.todoArray.push(value.todo);
    } else {
      alert('Field required **');
    }
  }
}


