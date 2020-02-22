import { PasswordChange, InfoChange, User } from './../../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  pageTitle = 'Zarządzaj kontem';

  defaultImage = 'assets/blank_portrait.png';
  selectedFile: any;
  imageURL: any;

  base64Data: any;

  @ViewChild('avatar', { static: false })
  avatar: ElementRef;

  passwordForm: FormGroup;

  infoForm: FormGroup;
  username: string;
  email: string;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.buildInfoForm();
    this.buildPasswordForm();

    this.route.data.subscribe(data => {
      const resolvedData: User = data['resolvedData'];
      this.onUserRetrieved(resolvedData);
    });
  }

  onUserRetrieved(user: User): void {
    this.imageURL = user.avatar;
    this.infoForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName
    });
    this.username = user.username;
    this.email = user.email;
  }

  selectPicture(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.showPreview(event);
    }
  }

  showPreview(event: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.imageURL = reader.result;
    };
  }

  removeAvatar(): void {
    this.avatar.nativeElement.value = null;
    this.imageURL = '';
    this.selectedFile = null;
  }

  saveAvatar(): void {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('avatar', this.selectedFile, this.selectedFile.name);
      this.dataService.updateAvatar(uploadData)
        .subscribe({
          next: response => {
            this.toastr.success('Zapisano avatar!', '', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
          },
          error: error => {
            this.toastr.error('Nie udało się zmienić avatara.', 'Wystąpił problem!', {
              positionClass: 'toast-top-center'
            });
          }
        });
    } else {
      this.toastr.success('Zapisano avatar!', '', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
    }
    if (!this.imageURL) {
      this.dataService.removeAvatar()
        .subscribe({
          next: response => {
            this.toastr.success('Zapisano avatar!', '', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
          },
          error: error => {
            this.toastr.error('Nie udało się usunąć avatara.', 'Wystąpił problem!', {
              positionClass: 'toast-top-center'
            });
          }
        });
    }
  }

  private buildPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]],
      newPasswordAgain: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]]
    });
  }

  savePassword(): void {
    const passwords: PasswordChange = this.passwordForm.value;
    if (passwords.newPassword === passwords.newPasswordAgain) {
      this.dataService.updatePassword(passwords.oldPassword, passwords.newPassword)
      .subscribe({
        next: response => {
          this.toastr.success('Poprawnie zmieniono hasło!', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.passwordForm.reset();
        },
        error: error => {
          this.toastr.error('Niepoprawne stare hasło!', '', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
        }
      });
    } else {
      this.toastr.error('Hasła się różnią!', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    }
  }

  private buildInfoForm(): void {
    this.infoForm = this.formBuilder.group({
      firstName: ['', [
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.maxLength(50)
      ]]
    });
  }

  saveInfo(): void {
    const info: InfoChange = this.infoForm.value;
    this.dataService.updateInfo(info)
    .subscribe({
      next: response => {
        this.toastr.success('Zapisano informacje!', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error: error => {
        this.toastr.error('Nie udało się zmienić informacji.', 'Wystąpił problem!', {
          positionClass: 'toast-top-center'
        });
      }
    });
  }

}
