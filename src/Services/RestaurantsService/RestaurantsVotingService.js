import RestService from '../RestService';

export default class RestaurantsVotingService extends RestService {
    constructor() {
        super("/api/restaurants/voting");
    }
}