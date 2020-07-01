import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      'publisher': [null, Validators.required],
      'published_year': [null, Validators.required]
    });
  }

  // getter for form fields
  get form() {
    return this.bookForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    const book: object = {};
    book['isbn'] = this.bookForm.value.isbn;
    book['title'] = this.bookForm.value.title;
    book['description'] = this.bookForm.value.description;
    book['author'] = this.bookForm.value.author;
    book['publisher'] = this.bookForm.value.publisher;
    book['published_year'] = this.bookForm.value.published_year;
    console.log(book);

    this.api.postBook(book)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

  onReset() {
    this.submitted = false;
    this.bookForm.reset();
  }
}
