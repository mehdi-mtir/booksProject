import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../Model/Book';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private router: Router) { }
  urlApi = 'http://localhost:3000/books';


  getBooksService(): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json', "Authorization": window.localStorage.getItem('token') });
    let options = {
      headers: headers
    };
    return this.http.get<Book>(this.urlApi, options);
  }

  getBooksByIsbnService(isbn): Observable<any> {
    return this.http.get<Book>(this.urlApi + '/' + isbn);
  }

  addBookService(b: Book): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    let options = {
      headers: headers
    };
    console.log('in service' + JSON.stringify(b));
    return this.http.post(this.urlApi, JSON.stringify(b), options);
  }

  editBookService(isbn, b: Book): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    let options = {
      headers: headers
    };
    console.log('in service');
    return this.http.put(this.urlApi + '/updateByIsbn/' + isbn, JSON.stringify(b), options);
  }

  deleteBookByIsbn(isbn: number) {
    console.log('delete book ', isbn);
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    let options = {
      headers: headers
    };
    return this.http.delete(this.urlApi + '/' + isbn, options).subscribe(
      result => location.reload(),
      //this.router.navigate(['/livres/'])
      err => console.error(err),

    );
  }
}
