import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocalNotifications, ILocalNotification, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { AppStorage } from '../../app/storage';
import { FriendPage } from '../friend/friend';
import { generateRandomNumber } from '../../app/generate-random-number';

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
      this.addFriend(friend);
    });
  }

  onFriendClick(index: number) {
    const friend = this.friends[index];
    const modal = this.modalCtrl.create(FriendPage, friend);
    modal.present();
    modal.onDidDismiss(updated => {
      if (!updated) return;
      if (updated === 'delete') this.deleteFriend(index);
      else this.editFriend(index, updated);
    });
  }

  private addFriend(friend: Friend) {
    this.friends.push(friend);
    this.scheduleNotification(friend);
    this.storage.set(this.friends);
  }

  private async deleteFriend(index: number) {
    const friend = this.friends.splice(index, 1)[0];
    if (friend == null) return;
    const allNotifications = await this.notifications.getAll();
    const matchingNotifications = allNotifications.filter(n => n.data.id === friend.id);
    this.notifications.cancel(matchingNotifications.map(n => n.id));
    this.storage.set(this.friends);
  }

  private async editFriend(index: number, updated: Friend) {
    this.friends[index] = updated;
    const allNotifications = await this.notifications.getAll();
    const matchingNotification = allNotifications.find(n => n.data.id === updated.id);
    if ((matchingNotification.data as Friend).frequency !== updated.frequency) {
      this.notifications.cancel(matchingNotification);
    }
    this.scheduleNotification(updated);
    this.storage.set(this.friends);
  }

  private scheduleNotification(friend: Friend) {
    this.notifications.schedule({
      text: 'This is a reminder to contact ' + friend.name,
      data: friend,
      vibrate: true,
      trigger: <any>{ every: this.getSecondsFromFrequency(friend.frequency) }
    });
  }

  private getSecondsFromFrequency(frequency: Frequency): number {
    switch (frequency) {
      case '23weeks': return 1404800;
      case '23months': return 5184000;
      case 'halfAYear': return 5184000 * 3;
      default: return 0;
    }
  }
}
