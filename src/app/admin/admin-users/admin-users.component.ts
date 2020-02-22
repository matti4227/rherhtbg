import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { UserPage, User } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  page = 0;
  userPage: UserPage;

  constructor(private dataService: DataService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: UserPage = data['resolvedData'];
      this.onUserPageRetrieved(resolvedData);
    });
  }

  onUserPageRetrieved(resolvedData: UserPage): void {
    this.userPage = { ...resolvedData };
  }

  getAllUsers(): void {
    this.dataService.getAllUsers(this.page)
    .subscribe({
      next: response => {
        this.userPage = { ...response };
      }
    });
  }

  deleteUser(user: User): void {
    this.dataService.deleteUser(user.username)
    .subscribe({
      next: response => {
        this.toastr.success('Pomyślnie usunięto użytkownika.', '', {
          positionClass: 'toast-top-center'
        });
      },
      error: error => {
        this.toastr.error('Wystąpił problem z usunięciem użytkownika kategorii!', '', {
          positionClass: 'toast-top-center'
        });
      },
      complete: () => {
        setTimeout(() => window.location.reload(), 1000);
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

  openConfirmation(user: User): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.message = 'Czy jesteś pewien, aby usunąć użytkownika: ' + user.username + ' ?';

    modalRef.result.then((result) => {
      if (result === 'Confirm') {
        this.deleteUser(user);
      }
    });
  }
}
