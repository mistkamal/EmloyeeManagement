import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee, Project, ProjectEmployee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor, AsyncPipe, DatePipe ,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  //In Project Form I Reactive-Forms For Crud Opration
  @ViewChild("myModal") empModal: ElementRef | undefined;
  currentview: string = "List";
  projectList: Project[] = [];
  projectEmpList: ProjectEmployee[] = [];
  empsevice = inject(EmployeeService);
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  projectform: FormGroup = new FormGroup({});
  projectwmployee:ProjectEmployee = new ProjectEmployee();

  //#region init cons oninit
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
  //#endregion

  //#region Add Project
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

  OnDelete(prj: number) {
    debugger;
    this.empsevice.deleteproject(prj).subscribe((res: Project) => {
      debugger;
      alert("Project Delete Succefully..");
      this.FillProjectData();
    }, error => {
      alert("Error From API")
    })
  }
  //#endregion

  //#region ModalUse
  OnAddEmployee(id: number) {
    if (this.empModal) {
      this.projectwmployee.projectId = id;
      this.getAllProjectEmployee(id);
      this.empModal.nativeElement.style.display = 'block';
    }
  };
  CLoseModal() {
    if (this.empModal) {
      this.empModal.nativeElement.style.display = 'none';
    }
  }

  OnProjectEmployeeSave(){
    debugger;
    this.empsevice.creatNewprojectEmployee(this.projectwmployee).subscribe((res:ProjectEmployee)=>{
      debugger;
      alert("Employee add to project successfully");
      this.getAllProjectEmployee(this.projectwmployee.projectId);
    },error=>{

    })
  };

  getAllProjectEmployee(id:number) {
    this.empsevice.getprojectemployee().subscribe((res: ProjectEmployee[]) => {
      const record= res.filter(m=>m.projectId == id);
      this.projectEmpList = record;
    })
  }
  //#endregion
}
