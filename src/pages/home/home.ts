import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppStorage } from '../../app/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: Friend[] = [];

  constructor(public navCtrl: NavController, private storage: AppStorage) {

  }

  ngOnInit() {
    debugger
    this.friends = this.storage.get();
  }


  onPlusClick() {
    this.friends.push({ name: 'abc', phoneNumber: '123', frequency: '23months' })
  }
}
