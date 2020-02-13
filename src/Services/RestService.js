import axios from 'axios';

export default class RestService {
    constructor(url) {
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
                if (res.status === 201) {
                    success(res.data);
                } else {
                    error(res);
                }
            }).catch(err => {
                error(err.response.data.message);
            });;
    }

    put(url, success, error) {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.put(url, options)
            .then(res => {
                if (res.status === 200) {
                    success(res.data);
                } else {
                    error(res);
                }
            }).catch(err => {
                error(err.response.data.message);
            });
    }

    get(success, error) {
        axios.get(this.url)
            .then(res => {
                if (res.status === 200) {
                    success(res.data);
                } else {
                    error(res);
                }
            });
    }
}