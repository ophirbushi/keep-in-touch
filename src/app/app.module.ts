import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppStorage } from './storage';
import { FriendPage } from '../pages/friend/friend';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { MockNotifications } from './mock-notifications';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FriendPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FriendPage
  ],
  providers: [
     LocalNotifications,
    //{ provide: LocalNotifications, useClass: MockNotifications },
    AppStorage,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
