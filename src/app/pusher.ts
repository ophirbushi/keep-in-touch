// import { Injectable } from "@angular/core";

// import { Push, PushObject, PushOptions, Priority } from '@ionic-native/push';

// @Injectable()
// export class Pusher {

//   constructor(private push: Push) { }

//   hasPermission(): Promise<boolean> {
//     return this.push.hasPermission().then(res => !!res.isEnabled);
//   }

//   /** Create a channel (Android O and above). You'll need to provide the id, description and importance properties. */
//   createChannel(id: string, description: string, importance: Priority): Promise<any> {
//     return this.push.createChannel({ id, description, importance });
//   }

//   deleteChannel(id: string): Promise<any> {
//     return this.push.deleteChannel(id);
//   }

//   /** Return a list of currently configured channels */
//   listChannels(): Promise<any[]> {
//     return this.push.listChannels();
//   }

//   init(): PushObject {
//     return this.push.init({
//       android: {},
//       browser: {
//         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
//       }
//     });

//     // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
//     // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
//     // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
//   }
// }
