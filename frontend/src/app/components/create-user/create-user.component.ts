import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit() {
  }
  
  addUser(f:NgForm) {
    console.log(f);
    let user= new User(f.value.nom,f.value.email,f.value.password);
    this.userService.createUserService(user).subscribe(
      (data)=>{
        console.log("Data" + data);
      }
    )
  }

}
