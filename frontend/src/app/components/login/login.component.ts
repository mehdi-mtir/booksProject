import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    let u = { email: f.value.email, password: f.value.password };
    return this.userService.loginService(u).subscribe(obj=>{
      console.log("--------------------------"+obj.tok);
      window.localStorage.setItem('token',obj.tok);
      console.log(obj.expiresIn)
      this.userService.setTimer(obj.expiresIn);
      console.log("Navigate t list of books");
      this.router.navigate(['/livres'])
    }
    );
  }

  

}
