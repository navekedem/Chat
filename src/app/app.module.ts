import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './Header/header.component';
import { AuthenticationComponent } from './Authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './ChatRoom/chat.component';
import { AppComponent } from './app.component';
import { AppRountingModule } from './app-routing.module'
import { ChatService } from './Services/chat.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRountingModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
