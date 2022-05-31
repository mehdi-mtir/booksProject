import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch:"full" },
  { path: "login", component: LoginComponent },
  { path: "addUser", component: CreateUserComponent },
  { path: "livres", component: BookComponent, canActivate:[AuthGuard] },
  { path: "livres/add", component: AddBookComponent, canActivate:[AuthGuard] },
  { path: "livres/edit/:isbn", component: EditBookComponent, canActivate:[AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
