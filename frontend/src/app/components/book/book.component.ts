import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/Model/Book';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Array<Book> = [];
  constructor(private bookService : BookService,private router:Router, private userService: UserService) { }

  ngOnInit() {
      this.bookService.getBooksService().subscribe(
      (data) => {
        console.log('data',data);
        this.books = data;
        console.log(this.books);
       }
    );
    
  }
  logOut(){
    this.userService.logout();

  }

 

  

}
