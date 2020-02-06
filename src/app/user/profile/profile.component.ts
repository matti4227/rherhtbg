import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User, UserProfile, RecipePage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageTitle = 'Profil użytkownika';
  user: User;

  username = this.route.snapshot.paramMap.get('username');
  recipePage: RecipePage;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: UserProfile = data['resolvedData'];
      this.onUserProfileRetrieved(resolvedData);
    });
  }

  onUserProfileRetrieved(resolvedData: UserProfile): void {
    this.user = resolvedData.user;
    this.recipePage = resolvedData.recipePage;
  }
}
