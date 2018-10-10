declare type Frequency = '23weeks' | '23months' | 'halfAYear';

declare interface Friend {
  id: number;
  name: string;
  frequency: Frequency;
  phoneNumber?: string;
}
