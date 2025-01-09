import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IAPIresponse, Project } from '../model/Employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl:string="https://projectapi.gerasim.in/api/EmployeeManagement/";

  constructor(private http:HttpClient) { }
//#region Employee
  createemployee(empobj:Employee) {
    return this.http.post<Employee>(this.apiUrl + "CreateEmployee",empobj);
  }

  getallEmployee()  {
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }  

  deletemployee(id:number) {
    return this.http.delete<Employee>(this.apiUrl + "DeleteEmployee/"+id);
  }

  updateemployee(empobj:Employee) {
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee/"+empobj.employeeId,empobj);
  }

  //#endregion

  //#region Project
  creatNewproject(empobj:Project) {
    return this.http.post<Project>(`${this.apiUrl}CreateProject`,empobj);
  }

  getallProjects()  {
    return this.http.get<Project[]>(this.apiUrl + "GetAllProjects");
  } 

  UpdateNewproject(empobj:Project) {
    return this.http.put<Project>(this.apiUrl + "UpdateProject/"+empobj.projectId,empobj);
  }

  deleteproject(id:number) {
    return this.http.delete<Project>(this.apiUrl + "DeleteProject/"+id);
  }
  //#endregion
}
