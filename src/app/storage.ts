import { Injectable } from "@angular/core";

@Injectable()
export class AppStorage {
  get(): Friend[] {
    const friends = JSON.parse(localStorage.getItem('friends')) || [];
    return friends;
  }

  set(friends: Friend[]) {
    localStorage.setItem('friends', JSON.stringify(friends));
  }
}
