import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AppStorage } from '../../app/storage';
import { FriendPage } from '../friend/friend';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: Friend[] = [];

  constructor(public navCtrl: NavController, private storage: AppStorage, private modalCtrl: ModalController,
    private notifications: LocalNotifications) { }

  ngOnInit() {
    this.friends = this.storage.get();
  }

  onPlusClick() {
    const modal = this.modalCtrl.create(FriendPage);
    modal.present();
    modal.onDidDismiss(friend => {
      if (!friend || friend === 'delete') return;
      this.friends.push(friend);
      this.onChanges();
    });
  }

  onFriendClick(index: number) {
    const friend = this.friends[index];
    const modal = this.modalCtrl.create(FriendPage, friend);
    modal.present();
    modal.onDidDismiss(updated => {
      if (!updated) return;
      if (updated === 'delete') {
        this.friends.splice(index, 1);
      } else {
        this.friends[index] = updated;
      }
      this.onChanges();
    });
  }

  async onChanges() {
    this.storage.set(this.friends);

    if (!await this.notifications.hasPermission()) {
      alert('no permission');
      return;
    }

    const allNotifications = await this.notifications.getAllScheduled();

    this.notifications.schedule({
      text: 'abc'
    })
  }
}
