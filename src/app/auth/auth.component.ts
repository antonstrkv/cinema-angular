import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

export interface Data {
  error: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  AuthForm: FormGroup;
  isLoginMode = true;
  isLoading = false;


  ngOnInit(): void {
    this.initForm();
  }

  constructor(private authService: AuthService, private router: Router, private ref: ChangeDetectorRef, public dialog: MatDialog) { }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  private initForm() {
    this.AuthForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  onSubmit() {

    const email = this.AuthForm.value.emailFormControl;
    const password = this.AuthForm.value.passwordFormControl;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    switch (this.isLoginMode) {
      case true:
        authObs = this.authService.login(email, password);
        break;
      case false:
        authObs = this.authService.signup(email, password);
        break;
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['./home']);
      },
      error: (errorMessage) => {
        this.dialog.open(AlertComponent, {
          data: { error: errorMessage }
        });
        this.isLoading = false;
        this.ref.detectChanges();
      }
    });
    this.AuthForm.reset();
  }
}

@Component({
  selector: 'alert',
  template: `
  <div mat-dialog-content>{{data.error}}</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>`,
})
export class AlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
  ) { }
}

