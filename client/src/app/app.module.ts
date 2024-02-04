import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { ImageboxComponent } from './components/imagebox/imagebox.component'; 
import{AngularFireModule} from '@angular/fire/compat'
import { environment } from './env/env';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';
import { BubbleareaComponent } from './components/bubblearea/bubblearea.component';
import { PopupComponent } from '../app/components/popup/popup.component';
@NgModule({
  declarations: [AppComponent, ImageboxComponent, BubbleareaComponent,PopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
