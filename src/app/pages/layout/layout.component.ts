import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isSidebarOpen = true;
  isSubmenuOpen = true;
  isRotate = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isRotate = !this.isRotate;
  }
}
