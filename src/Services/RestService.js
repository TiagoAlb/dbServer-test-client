import axios from 'axios';

export default class RestService {
    constructor(url){
        this.url = url;
    }

    post(item, success, error) {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(this.url, JSON.stringify(item), options)
            .then(res => {
                if(res.status==201) {
                    sessionStorage.setItem('user', res.data);
                    success();
                } else {
                    error(res);
                }
            });
    }

    get(success, error) {
        axios.get(this.url)
            .then(res => {
                if(res.status==200) {
                    console.log(res);
                    success(res.data);
                } else {
                    error(res);
                }
            });
    }
}