import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router,) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log('Form Submitted', this.loginForm.value);
      if(this.loginForm.value.username == 'user' && this.loginForm.value.password == 'User@123'){
        this.router.navigate(['/add-new-card']);
        // app.controller('foo', function($scope, toastr) {
        //   toastr.success('Hello world!', 'Toastr fun!');
        // });
      }else{
        alert("Please check your username and password")
      }

    } else {
      console.log('Form Invalid');
    }
  }

  

}
