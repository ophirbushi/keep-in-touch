import { Injectable } from "@angular/core";

@Injectable()
export class MockNotifications {

  hasPermission(): Promise<boolean> {
    return Promise.resolve(true);
  }

  getAllScheduled(): Promise<any[]> {
    return Promise.resolve(this.getMockNotifications());
  }

  cancel(id) {
    const notifications = this.getMockNotifications();
    const matchIndex = notifications.findIndex(n => n.id === id);
    if (matchIndex > -1) {
      notifications.splice(matchIndex, 1);
    }
    this.setMockNotifications(notifications);
  }

  schedule(notification) {
    const notifications = this.getMockNotifications();
    notifications.push(notification);
    this.setMockNotifications(notifications);
    console.log('notification scheduled: ', notification);
  }

  private getMockNotifications(): any[] {
    const raw = localStorage.getItem('mock-notifications');
    return raw != null ? JSON.parse(raw) : [];
  }

  private setMockNotifications(notifications: any[]) {
    localStorage.setItem('mock-notifications', JSON.stringify(notifications));
  }
}
