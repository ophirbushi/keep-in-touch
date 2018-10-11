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
    this.storage.set(this.friends);
    if (friend == null) return;
    const allNotifications = await this.notifications.getAll();
    const matchingNotification = allNotifications.find(n => n.data.id === friend.id);
    if (matchingNotification == null) return;
    this.notifications.cancel(matchingNotification.id);
  }

  private async editFriend(index: number, updated: Friend) {
    this.friends[index] = updated;
    this.storage.set(this.friends);
    const allNotifications = await this.notifications.getAll();
    const matchingNotification = allNotifications.find(n => n.data.id === updated.id);
    if (!matchingNotification) return;
    if (this.getSecondsFromFrequency(matchingNotification.data.frequency) !== this.getSecondsFromFrequency(updated.frequency)) {
      this.notifications.cancel(matchingNotification.id);
      this.scheduleNotification(updated);
    }
  }

  private scheduleNotification(friend: Friend) {
    this.notifications.schedule({
      id: generateRandomNumber(),
      text: 'This is a reminder to contact ' + friend.name,
      data: friend,
      vibrate: true,
      trigger: <any>{ every: this.getSecondsFromFrequency(friend.frequency) }
    });
  }

  private getSecondsFromFrequency(frequency: Frequency): number {
    let base: number = 0;
    switch (frequency.unit) {
      case 'days':
        base = 86400;
        break;
      case 'weeks':
        base = 604800;
        break;
      case 'months':
        base = 2592000;
        break;
    }
    return base * frequency.count;
  }
}
