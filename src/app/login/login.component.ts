import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; // used for reactive forms
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user = this.fb.group({ // for reactive groups, we are creating form builder groups which is where we create
      // one group and add multiple properties
    managerId: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { } // using router
  // to reroute valid logged in user to some other page

  login() {
    this.loginService.login(this.user.value)
    .subscribe(res => {
      console.log('Res: ', res);
      if (res.message === 'User successfully logged in') {
        this.router.navigate([`/home`]);
        this.loginService.setCookie('token', res.token, 1);
        // this.loginService.setCookie('message', res.message, 1);
        // let token = this.loginService.getCookie('token');
      } else {
        window.alert('Credentials you entered are incorrect');
      }
    });
  }
}
