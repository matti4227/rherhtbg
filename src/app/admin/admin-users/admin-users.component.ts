import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { UserPage, User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  page = 0;
  userPage: UserPage;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.dataService.getAllUsers(this.page)
    .subscribe({
      next: response => {
        console.log(response);
        this.userPage = { ...response };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  deleteUser(user: User): void {
    this.dataService.deleteUser(user.username)
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  changePage(page: number): void {
    this.page = page;
    this.getAllUsers();
  }

  pageNav(): boolean {
    return typeof this.userPage === 'undefined' || this.userPage.totalPages < 2;
  }

}
