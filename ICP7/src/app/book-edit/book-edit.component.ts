import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  isbn = '';
  title = '';
  description = '';
  author = '';
  publisher = '';
  published_year = '';
  submitted = false;
  book = {};

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.isbn = this.route.snapshot.params['id'];
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
  getBook(id) {
    /*** Get the Customer Details*/
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
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

    this.api.deleteBook(this.isbn)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );

    this.api.postBook(book)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
