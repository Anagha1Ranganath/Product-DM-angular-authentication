import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  user = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.login(this.user.value)
    .subscribe(res => {
      console.log('Res: ', res);
      if(res.message == 'success') {
        this.router.navigate([`/home`]);
        this.loginService.setCookie(res.message,1);
      } else {
        window.alert('Credentials you enterd are incorrect');
      }
    });
  }
}
