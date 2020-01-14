import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from './../user.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  pageTitle = 'Zarządzaj kontem';
  accountForm: FormGroup;

  defaultImage = 'assets/blank_portrait.png';
  imageURL: string;

  @ViewChild('avatar', {static: false})
  avatar: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      avatar: ['', []]
    });
    const userId = JSON.parse(localStorage.getItem('id'));
    this.userService.getUser(userId)
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error(error);
        }
      });
  }

  selectPicture(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      this.showPreview(file);
    }
  }

  showPreview(file: any): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  removeAvatar(): void {
    this.avatar.nativeElement.value = null;
    this.imageURL = '';
  }

  saveAccount(): void {
    if (this.imageURL) {
      const avatarData = new FormData();
      avatarData.append('file', this.imageURL);

      this.userService.updateAvatar(avatarData)
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

}
