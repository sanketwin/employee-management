import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {
  Employee,
  IApiResponse,
  IChildDept,
  IParentDept,
} from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, NgIcon],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employeeService = inject(EmployeeService);
  deptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  employeeList: Employee[] = [];
  filteredEmployee: Employee[] = [];

  deptId: number = 0;

  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getParentDeptList();
    this.getEmplyees();
  }

  getParentDeptList() {
    this.employeeService.getParentDept().subscribe((res: IApiResponse) => {
      this.deptList = res.data;
    });
  }

  onDeptChange() {
    this.employeeService
      .getChildDeptByParentId(this.deptId)
      .subscribe((res: IApiResponse) => {
        this.childDeptList = res.data;
      });
  }

  createEmployee() {
    this.employeeService
      .createNewEmployee(this.employeeObj)
      .subscribe((res: IApiResponse) => {
        if (res.result) {
          Swal.fire({
            title: 'Success',
            text: 'Employee Created Successfully',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          });
        }
      });
  }

  getEmplyees() {
    this.employeeService.getEmployee().subscribe((res: Employee[]) => {
      this.employeeList = res;
      this.filteredEmployee = res;
    });
  }

  debounce(func: Function, delay: number) {
    let timeout: any;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), delay);
    };
  }

  search(event: any) {
    if (this.employeeList) {
      const debouncedSearch = this.debounce(() => {
        let value = event.target.value;
        this.filteredEmployee = this.employeeList.filter(
          (employee: Employee) => {
            return employee.employeeName
              .toLowerCase()
              .includes(value.toLowerCase());
          }
        );
      }, 300); // Adjust delay as needed

      debouncedSearch();
    }
  }
}
