import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageTitle = 'Profil użytkownika';
  user: User;

  username = this.route.snapshot.paramMap.get('username');

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getUserByName(this.username)
    .subscribe({
      next: response => {
        console.log(response);
        this.user = { ...response };
        this.username = response.username;
      },
      error: error => {
        console.error(error);
      }
    });
    console.log(this.username)
  }
}
