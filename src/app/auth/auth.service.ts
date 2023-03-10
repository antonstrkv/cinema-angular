import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
	idToken: string,
	email: string,
	refreshToken: string,
	expiresIn: string,
	localId: string,
	registered?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
	private tokenTimer: any;

	constructor(private http: HttpClient, private router: Router) { }


	logout() {
		this.user.next(null);
		this.router.navigate(['/auth']);
		localStorage.removeItem("userData");
		if (this.tokenTimer) clearTimeout(this.tokenTimer);
		this.tokenTimer = null;
	}


	signup(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FirebaseAPIKey,
			{
				email,
				password,
				returnSecureToken: true,
			}
		).pipe(catchError(this.handleError), tap(resData => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));
	}


	login(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FirebaseAPIKey,
			{
				email,
				password,
				returnSecureToken: true,
			}
		).pipe(catchError(this.handleError), tap((resData: any) => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));
	}


	autoLogin() {
		const userData: {
			email: string,
			id: string,
			_token: string,
			_tokenExpirationDate: string
		} = JSON.parse(localStorage.getItem('userData')!);
		if (!userData) return;

		const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

		if (loadedUser.token) {
			this.user.next(loadedUser);
			const experationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(experationDuration);
		}
	}


	autoLogout(experationDuration: number) {
		this.tokenTimer = setTimeout(() => {
			this.logout();
		}, experationDuration)
	}


	handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number,) {
		const experationDate = new Date(new Date().getTime() + expiresIn * 1000)
		const user = new User(email, localId, idToken, experationDate);
		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(user));
	}


	private handleError(errorRes: HttpErrorResponse) {
		let error = 'An unknown error occured.';
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(() => new Error(error));
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				error = "The email address is already in use by another account.";
				break;
			case 'OPERATION_NOT_ALLOWED':
				error = 'Password sign-in is disabled for this project.';
				break;
			case 'TOO_MANY_ATTEMPTS_TRY_LATER':
				error = 'We have blocked all requests from this device due to unusual activity. Try again later.';
				break;
			case 'EMAIL_NOT_FOUND':
				error = 'There is no user record corresponding to this identifier. The user may have been deleted.';
				break;
			case 'INVALID_PASSWORD':
				error = 'The password is invalid or the user does not have a password.';
				break;
			case 'USER_DISABLED':
				error = 'The user account has been disabled by an administrator.';
				break;
		}
		return throwError(() => new Error(error));
	}
}
