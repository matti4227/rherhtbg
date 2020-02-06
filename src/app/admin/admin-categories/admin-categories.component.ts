import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { Category } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categoryText: string;

  categories: Category[];

  constructor(private dataService: DataService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: Category[] = data['resolvedData'];
      this.onCategoriesRetrieved(resolvedData);
    });
  }

  onCategoriesRetrieved(resolvedData: Category[]): void {
    this.categories = resolvedData;
  }

  getCategories(): void {
    this.dataService.getCategories()
    .subscribe({
      next: response => {
        console.log(response);
        this.categories = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  addCategory(): void {
    const category: Category = { name: this.categoryText };

    this.dataService.addCategory(category)
    .subscribe({
      next: response => {
        this.toastr.success('Dodano nową kategorię!', '', {
          positionClass: 'toast-top-center'
        });
        this.categoryText = null;
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  }

  deleteCategory(category: Category): void {
    this.dataService.deleteCategory(category.name)
    .subscribe({
      next: response => {
        this.toastr.success('Pomyślnie usunięto kategorię.', '', {
          positionClass: 'toast-top-center'
        });
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  }

  openConfirmation(category: Category): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.message = 'Czy jesteś pewien, aby usunąć kategorię: ' + category.name;

    modalRef.result.then((result) => {
      if (result === 'Confirm') {
        this.deleteCategory(category);
      }
    });
  }
}
