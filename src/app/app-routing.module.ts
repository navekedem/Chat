import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './Authentication/authentication.component'
import { ChatComponent } from './ChatRoom/chat.component'

const routes: Routes = [
  {path: '' , component:AuthenticationComponent },
  {path: 'chatrooms' , component:ChatComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRountingModule {

}
