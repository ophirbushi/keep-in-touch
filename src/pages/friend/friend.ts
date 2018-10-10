import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

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
    this.friend = this.viewCtrl.data || {
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
