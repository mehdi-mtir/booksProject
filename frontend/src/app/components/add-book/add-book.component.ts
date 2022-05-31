import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/Model/Book';
import { Author } from 'src/app/Model/Author';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService: BookService,private router: Router) { }

  ngOnInit() {
  }

  addBook(f: NgForm) {
    console.log('addBook',f);
    let a = new Author(f.value.nom,f.value.prenom,f.value.email)
    let b = new Book(f.value.titre, f.value.isbn, f.value.categorie,a);
    this.bookService.addBookService(b).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigate(['/livres/']);
      }
    );
  }

}
