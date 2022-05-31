export class User {
    nom: string;
    email: string;
    password: string;
    constructor(nom: string, email: string, password: string){
        this.nom = nom;
        this.email = email;
        this.password = password;
    }
}