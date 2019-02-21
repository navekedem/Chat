import { Component } from "@angular/core";
import { User } from "../Models/user.model";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "../Services/authentication.service";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"]
})
export class AuthenticationComponent {
  constructor(private authenticationService: AuthenticationService) {}

  user: User;


  //add new user to chat
  signIn(userForm: NgForm) {
    this.authenticationService.getRandomId();
    let uniqueId =this.authenticationService.uniqueId;

    this.user = {
      id: uniqueId,
      userName: userForm.controls["userName"].value,
      imagePath: userForm.controls["imagePath"].value
    };

    if (
      this.authenticationService.checkIfImageSrcVaild(this.user.imagePath) ==
      false
    ) {
      this.user.imagePath = this.authenticationService.defaultAvatar;
    }

    this.authenticationService.addUser(this.user);
  }
}
