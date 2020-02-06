import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from './security.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Logowanie';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private securityService: SecurityService,
              private router: Router,
              private toastr: ToastrService) { }

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
            if (this.securityService.redirectUrl) {
              this.router.navigateByUrl(this.securityService.redirectUrl);
            } else {
              this.router.navigate(['/recipes']);
            }
          },
          error: error => {
            this.toastr.error('Niepoprawne dane logowania.', '', {
              positionClass: 'toast-top-center'
            });
          }
        });
    } else {
      this.toastr.error('Niepoprawne dane logowania.', '', {
        positionClass: 'toast-top-center'
      });
    }
  }
}
