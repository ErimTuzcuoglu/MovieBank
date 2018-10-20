import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class NewsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { news: null };
        // this.listenToMany(actions);
        actions.getNews.listen(this.getNews())
    }


    getNews() {
        Fetch('movie/upcoming').then(function (response) {
            this.setState({ news: response.data.results });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}
