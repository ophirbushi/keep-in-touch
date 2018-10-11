declare interface Frequency {
  count: number;
  unit: 'minutes' | 'days' | 'weeks' | 'months';
}

declare interface Friend {
  id: number;
  name: string;
  frequency: Frequency;
  phoneNumber?: string;
}
