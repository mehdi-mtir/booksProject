import { Author } from './Author';

export class Book {
    title: string;
    isbn: string;
    categorie: string;
    auteur: Author;
    constructor(title: string, isbn: string, categorie: string, auteur: Author) {
        this.title = title;
        this.isbn = isbn;
        this.categorie = categorie;
        this.auteur = auteur;
    }
}