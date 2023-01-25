import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  Sub: Subscription;

  constructor(private authService: AuthService) { }

  logout() {
    if (this.isAuth) this.authService.logout();
  }


  ngOnInit(): void {
    this.Sub = this.authService.user.subscribe({
      next: (userData) => {
        this.isAuth = !!userData;
      }
    })
  }


  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }
}

