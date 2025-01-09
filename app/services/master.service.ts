import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIresponse, IChildDept } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {

  };

  getParentDept() {
    return this.http.get<IAPIresponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment")
  };

  getChildDeptByParentId(id: number): Observable<IAPIresponse> {
    return this.http.get<IAPIresponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId?deptId=" + id)
  };
  
}
