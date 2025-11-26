
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/usuario/auth.service';
import { HandleErrorMessage } from '../../../utils/handle.errors';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {

  public showPassword: boolean = false;
  public formAuth: FormGroup;
  private formSubscription: Subscription | undefined;
  public fecha: number = (new Date()).getFullYear();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formAuth = this.fb.group({});
  }

  ngOnInit(): void {
    this.formAuth = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

  public authLogin() {
    if (!this.formAuth.valid) {
      this.toastr.warning('Complete el formulario con los datos solicitados', 'Autenticación');
      return;
    }

    this.authService.logout();

    this.formSubscription = this.authService.loginUser(this.formAuth.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastr.error(HandleErrorMessage(err.message), 'Autenticación');
      }
    });
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }
}
