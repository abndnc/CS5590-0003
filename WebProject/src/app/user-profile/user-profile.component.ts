import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedUserObj: any;
  constructor(private router: Router, private formBuilder: FormBuilder , private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser().subscribe(res => {
      this.loggedUserObj = res;
      console.log('logged user' , this.loggedUserObj)
    }, (err) => {
      console.log(err);
    });
  }
  updateProfile() {
    console.log('update profile')
    this.authenticationService.updateUser(this.loggedUserObj).subscribe(res => {
      console.log(res);
      Swal.fire({
        type: 'success',
        title: 'User profile updated successfully',
        timer: 2000
      });

      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }
}
