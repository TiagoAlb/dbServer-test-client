import RestService from '../RestService';

export default class RestaurantsService extends RestService {
    constructor() {
        super("/api/restaurants/");
    }
}