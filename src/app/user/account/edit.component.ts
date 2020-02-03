import { PasswordChange, InfoChange, User } from './../../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.buildInfoForm();

    this.buildPasswordForm();

    this.route.data.subscribe(data => {
      const resolvedData: User = data['resolvedData'];
      this.onUserRetrieved(resolvedData);
    });

    // this.dataService.getUser()
    //   .subscribe({
    //     next: response => {
    //       this.imageURL = response.avatar;
    //       this.infoForm.patchValue({
    //         firstName: response.firstName,
    //         lastName: response.lastName
    //       });
    //       this.username = response.username;
    //       this.email = response.email;
    //     },
    //     error: error => {
    //       console.error(error);
    //     }
      // });
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
            console.log(response);
          },
          error: error => {
            console.error(error);
          }
        });
    }
    if (!this.imageURL) {
      this.dataService.removeAvatar()
        .subscribe({
          next: response => {
            console.log(response);
          },
          error: error => {
            console.error(error);
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
          console.log(response);
        },
        error: error => {
          console.error(error);
        }
      });
    } else {
      console.error('hasła się różnią')
    }
  }

  private buildInfoForm(): void {
    this.infoForm = this.formBuilder.group({
      firstName: ['', [
        Validators.minLength(6),
        Validators.maxLength(24)
      ]],
      lastName: ['', [
        Validators.minLength(6),
        Validators.maxLength(24)
      ]]
    });
  }

  saveInfo(): void {
    const info: InfoChange = this.infoForm.value;
    this.dataService.updateInfo(info)
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
