import RestService from '../RestService';

export default class UserService extends RestService {
    constructor() {
        super("/api/users/");
    }
}