declare interface Frequency {
  count: number;
  unit: 'days' | 'weeks' | 'months';
}

declare interface Friend {
  id: number;
  name: string;
  frequency: Frequency;
  phoneNumber?: string;
}
