import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  pageTitle = 'Rejestracja';
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
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

  registerUser(): void {
    if (this.registerForm.valid) {
      const userRegister = this.registerForm.value;
      this.registerService.register(userRegister)
        .subscribe({
          next: response => {
            this.toastr.success('Utworzono konto!', '', {
              positionClass: 'toast-top-center'
            });
            this.router.navigate(['/authenticate']);
          },
          error: error => {
            console.error(error);
          }
        });
    }
  }

}
