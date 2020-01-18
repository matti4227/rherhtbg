import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  pageTitle = 'Zarządzaj kontem';
  accountForm: FormGroup;

  defaultImage = 'assets/blank_portrait.png';
  imageURL: string;

  @ViewChild('avatar', {static: false})
  avatar: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      avatar: ['', []]
    });

    this.dataService.getUser()
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

      this.dataService.updateAvatar(avatarData)
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
