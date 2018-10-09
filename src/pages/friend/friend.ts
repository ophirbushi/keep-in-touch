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
    this.friend = {
      frequency: null,
      name: null,
      phoneNumber: null
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveChanges(){
    this.viewCtrl.dismiss(this.friend);
  }
}
