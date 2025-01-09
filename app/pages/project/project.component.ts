import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee, Project } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor, AsyncPipe, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  //In Project Form I Reactive-Forms For Crud Opration
  @ViewChild("myModal") empModal : ElementRef | undefined; 
  currentview: string = "List";
  projectList: Project[] = [];
  empsevice = inject(EmployeeService);
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  projectform: FormGroup = new FormGroup({});

  constructor() {
    this.initializeForm();
    this.employeeData$ = this.empsevice.getallEmployee();
  }
  ngOnInit(): void {
    this.FillProjectData();
  }

  initializeForm(prj?: Project) {
    this.projectform = new FormGroup({
      projectId: new FormControl(prj ? prj.projectId : 0),
      projectName: new FormControl(prj ? prj.projectName : ""),
      clientName: new FormControl(prj ? prj.clientName : ""),
      startDate: new FormControl(prj ? prj.startDate : ""),
      leadByEmpId: new FormControl(prj ? prj.leadByEmpId : ""),
      contactPerson: new FormControl(prj ? prj.contactPerson : ""),
      contactNo: new FormControl(prj ? prj.contactNo : ""),
      emailId: new FormControl(prj ? prj.emailId : ""),
    });
    this.currentview = "List";
  };

  OnSaveProject() {
    debugger;
    const formvalue = this.projectform.value;
    if (formvalue.projectId == 0) {
      this.empsevice.creatNewproject(formvalue).subscribe((res: Project) => {
        debugger;
        alert("Project Create Successfully..");
        this.FillProjectData();
        this.currentview = "List";
      }, error => {
      });
    }
    else {
      this.empsevice.UpdateNewproject(formvalue).subscribe((res: Project) => {
        debugger;
        alert("Project Update Successfully..");
        this.FillProjectData();
        this.currentview = "List";
      }, error => {
      })
    }

  }

  FillProjectData() {
    this.empsevice.getallProjects().subscribe((res: Project[]) => {
      this.projectList = res;
    })
  }

  OnEdit(Prj: Project) {
    this.initializeForm(Prj);
    this.currentview = "Create";
  }

  OnDelete(prj:number){
    debugger;
    this.empsevice.deleteproject(prj).subscribe((res: Project) => {
      debugger;
      alert("Project Delete Succefully..");
      this.FillProjectData();
    }, error => {
      alert("Error From API")
    })
  }

  OnAddEmployee(id:number){
    //this.empModal?.nativeElement
  }
}
