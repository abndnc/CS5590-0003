import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {saveAs} from 'file-saver';
import Swal from 'sweetalert2';

const uri = 'http://localhost:3000/file/upload';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: []

})
export class CoursesComponent implements OnInit {
  constructor( ) {
  }
  ngOnInit() {
  }
  registerCourse() {
    Swal.fire({
      type: 'success',
      title: 'Uploaded Successfully',
      timer: 2000
    });
    console.log('a');
  }
}
