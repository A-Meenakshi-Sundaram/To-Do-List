import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  taskObj : Task = new Task();
  taskArr : Task[] = [];
  task_name : string = "";

  addTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void{
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    },err => {
      alert("Unable to get list of tasks");
    })
  }

  addTask() 
  {
    this.taskObj.task = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.addTaskValue = '';
    },err => {
      alert("Unable to add the task");
    })
  }

  editTask() {
    this.crudService.editTask(this.taskObj).subscribe(res=> {
      this.ngOnInit();
    }, err => {
      alert("Failed to update the task");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert("Failed to delete the task");
    })
  }

}
