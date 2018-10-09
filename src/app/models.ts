declare type Frequency = '23weeks' | '23months' | 'halfAYear';

declare interface Friend {
  name: string;
  phoneNumber: string;
  frequency: Frequency;
}
