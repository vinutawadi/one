import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user = {};

  constructor(
    private http:Http, 
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private router: Router) { 
      this.toastr.setRootViewContainerRef(vcr);

    }

  verifyUser() {
    console.log('User : ', this.user);

    this.http.get('assets/data/user-list.json')
      .map( resp => resp.json())
      .subscribe( userList => {
        console.log('Userlist : ', userList);

        if( this.isValidUser(this.user, userList) ) {
          this.toastr.success(`Login success!', 'Welcome !`);
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Invalid username or password!', 'Error!');
                    this.router.navigate(['/about']);

        }
      })
  }

  isValidUser(user, userList) {
    let isUserAuthenticated = false;
    userList.forEach(eachUser => {
      if(eachUser.email === user.email && eachUser.password === user.password) {
        isUserAuthenticated = true;
      }
    });

    return isUserAuthenticated;
  }
}
