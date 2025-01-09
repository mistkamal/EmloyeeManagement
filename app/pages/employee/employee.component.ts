import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IAPIresponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
// In Employee Form I Template-Forms For Crud Opration
  depatList: IParentDept[] = []
  childDepatList: IChildDept[] = []
  empList: Employee[] = []
  deptId: number = 0;
  isSidepanelOpen = signal<boolean>(false);
  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getParentDeptList();
    this.fillGetemployee();
  }

  masterservice = inject(MasterService);
  empservice = inject(EmployeeService);

  //#region Employee CRUd
  showAddMode(){
    this.isSidepanelOpen.set(true);
  }

  hideAddMode(){
    this.isSidepanelOpen.set(false);
  }

  OnEmpSave() {
    debugger
    this.empservice.createemployee(this.employeeObj).subscribe((res: Employee) => {
      debugger
      alert("Employee Save Succefully..");
      this.fillGetemployee();
    }, error => {
      alert("Error From API")
    })
  }

  fillGetemployee() {
    this.empservice.getallEmployee().subscribe((res: Employee[]) => {
      this.empList = res;
    })
  };

  empDelete(Id: number) {

    this.empservice.deletemployee(Id).subscribe((res: Employee) => {
      alert("Employee Delete Succefully..");
      this.fillGetemployee();
    }, error => {
      alert("Error From API")
    })

  };


  empEdit(emp: Employee) {
    this.employeeObj = emp;

  }

  OnEmpUpdate() {
    debugger
    this.empservice.updateemployee(this.employeeObj).subscribe((res: Employee) => {
      debugger
      alert("Employee Update Succefully..");
      this.fillGetemployee();
    }, error => {
      alert("Error From API")
    })
  }
  //#endregion

  //#region DepartMent & Child Department Binding
  getParentDeptList() {
    this.masterservice.getParentDept().subscribe((res: IAPIresponse) => {
      this.depatList = res.data;
    })
  };

  DeptIdChange() {
    this.masterservice.getChildDeptByParentId(this.deptId).subscribe((res: IAPIresponse) => {
      this.childDepatList = res.data;
    })
  };
  //#endregion



}
