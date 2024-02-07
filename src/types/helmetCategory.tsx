import { Helmet } from '../model/helmet';

export type Category =
  | 'SK2'
  | 'SK3'
  | 'SK4'
  | 'SK5'
  | 'SK6'
  | 'SK7'
  | 'SK8'
  | 'SK9'
  | 'SK10';

export type helmetCategory = {
  category: Category;
  helmets: Helmet[];
};
