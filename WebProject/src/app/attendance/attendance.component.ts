import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  schedulerFlag: boolean;
  code: string;
  studentCode: string;
  i: number;
  loggedUserObj: any;


  constructor(private router: Router , private authenticationService: AuthenticationService) { }
  ngOnInit() {
    this.authenticationService.currentUser().subscribe(res => {
      this.loggedUserObj = res;
          console.log('logged user' , this.loggedUserObj);
          },
        (err) => {console.log(err);
        });
    this.schedulerFlag = false;
  }
  markAttendance() {
    if (this.studentCode.length === 6) {
      Swal.fire({
        type: 'success',
        title: 'Attendance marked successfully',
        timer: 2000
      });
      this.router.navigate(['/']);
    } else {
      Swal.fire({
        type: 'error',
        title: 'Please check your code',
        timer: 2000
      });
    }
  }

}
