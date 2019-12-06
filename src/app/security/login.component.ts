import { SecurityService } from './security.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Login';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private securityService: SecurityService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]]
    });
  }

  authenticateUser(): void {
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.securityService.authenticate(userLogin)
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
