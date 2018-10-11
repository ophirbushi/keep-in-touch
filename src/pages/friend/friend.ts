import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { generateRandomNumber } from "../../app/generate-random-number";

@Component({
  selector: 'friend-page',
  templateUrl: './friend.html',
  styles: [
    `
      :host{
        background:white;
      }

      ion-list{
        margin-top: 60px;
      }
    `
  ]
})
export class FriendPage {
  friend: Friend;
  count: number;
  unit: 'minutes' | 'days' | 'weeks' | 'months';

  constructor(private viewCtrl: ViewController) { }

  ngOnInit() {
    this.friend = this.viewCtrl.data && this.viewCtrl.data['id'] != null ? this.viewCtrl.data : {
      id: generateRandomNumber(),
      frequency: { count: 1, unit: 'days' },
      name: null,
      phoneNumber: null
    }

    this.count = this.friend.frequency.count;
    this.unit = this.friend.frequency.unit;

    this.onFrequencyChange();
  }

  onFrequencyChange() {
    this.friend.frequency = { count: this.count, unit: this.unit };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this.viewCtrl.dismiss('delete');
  }

  saveChanges() {
    this.viewCtrl.dismiss(this.friend);
  }
}
