import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
      console.log('Form Submitted', this.loginForm.value);
      if(this.loginForm.value.username == 'admin' && this.loginForm.value.password == 'Admin@123'){
        this.router.navigate(['/update-card-label']);
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
