import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AppStorage } from '../../app/storage';
import { FriendPage } from '../friend/friend';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: Friend[] = [];

  constructor(public navCtrl: NavController, private storage: AppStorage, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.friends = this.storage.get();
  }


  onPlusClick() {
    const modal = this.modalCtrl.create(FriendPage);
    modal.present();
    modal.onDidDismiss(friend => {
      if (friend) {
        this.friends.push(friend);
        this.storage.set(this.friends);
      }
    });
  }
}
