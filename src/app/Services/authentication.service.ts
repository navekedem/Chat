import { User } from "../Models/user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  users: User[] = [];
  defaultAvatar: string;
  uniqueId: string;
  constructor(private router: Router, private http: HttpClient) {
    this.defaultAvatar =
      "https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg";
  }

  addUser(user: User) {
  
    this.users.push(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    this.router.navigate(["/chatrooms"]);
  }

  checkIfImageSrcVaild(imagePath: string) {
    const validExtensions = ["jpg", "bmp", "gif", "png", "jpeg"];
    if (imagePath.trim().length > 0) {
      validExtensions.forEach(src => {
        let res = imagePath.indexOf(src);
        if (res > 0) {
          return true;
        }
      });
    } else {
      return false;
    }
  }

  getRandomId(){
    var uniqueId = 'id-' + Math.random().toString(36).substr(2, 16);
    this.uniqueId = uniqueId.toString();
  }

}




