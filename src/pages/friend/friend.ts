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
  frequencies: Frequency[] = ['23weeks', '23months', 'halfAYear'];

  constructor(private viewCtrl: ViewController) { }

  ngOnInit() {
    this.friend = this.viewCtrl.data && this.viewCtrl.data['id'] != null ? this.viewCtrl.data : {
      id: generateRandomNumber(),
      frequency: null,
      name: null,
      phoneNumber: null
    }
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
