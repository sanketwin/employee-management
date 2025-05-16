import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getParentDept(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment'
    );
  }

  getChildDeptByParentId(deptId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId?deptId=' +
        deptId
    );
  }

  createNewEmployee(obj: Employee): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee',
      obj
    );
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees'
    );
  }
}
