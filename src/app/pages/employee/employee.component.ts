import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employeeService = inject(EmployeeService);
  deptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];

  deptId: number = 0;

  ngOnInit(): void {
    this.getParentDeptList();
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
}
