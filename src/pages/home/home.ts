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
      debugger
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

    try {
      const allNotifications = await this.notifications.getAll();

      const toCancel = allNotifications.filter(n => this.friends.findIndex(f => f.id === n.data.id) === -1);
      const toSchedule: ILocalNotification[] = [];

      this.friends.forEach(friend => {
        const matchingNotification = allNotifications.find(n => n.data.id === friend.id);

        if (matchingNotification) {
          if (matchingNotification.data.frequency === friend.frequency) return;
          toCancel.push(matchingNotification);
        }

        let seconds: number;

        switch (friend.frequency) {
          case '23weeks':
            seconds = 1404800;
            break;
          case '23months':
            seconds = 5184000;
            break;
          case 'halfAYear':
            seconds = 5184000 * 3;
            break;
          default:
            seconds = 0;
            break;
        }

        toSchedule.push({
          text: 'This is a reminder to contact ' + friend.name,
          data: friend,
          vibrate: true,
          trigger: <any>{ every: seconds }
        });
      });

      this.notifications.schedule(toSchedule);

      this.notifications.cancel(toCancel);

    } catch (error) {
      alert(error)
    }

  }
}
