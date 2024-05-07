import { IMovie } from './movies.interface';
import { IShow } from './shows.interface';

export interface ICard {
	item: IMovie | IShow;
}
