import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/Model/Book';
import { NgForm } from '@angular/forms';
import { Author } from 'src/app/Model/Author';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  isbn : number;
  book : Book;
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.isbn = parseInt(this.activatedRoute.snapshot.paramMap.get("isbn"));
    console.log('isbn===',this.isbn)
    this.bookService.getBooksByIsbnService(this.isbn).subscribe(
      (data)=>{
        console.log('data',data);
        this.book = data;
      }
    );
  }

  editBook(f: NgForm){
    let a = new Author(f.value.nom,f.value.prenom,f.value.email)
    let b = new Book(f.value.title,f.value.isbn,f.value.categorie,a);
    this.bookService.editBookService(this.isbn,b).subscribe(
      (data)=>{
        console.log(data)
        this.router.navigate(['/livres/'])
      }
    );
  }

}
