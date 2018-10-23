import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class FilmDetailsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { film_details: null, videos: null };
        this.listenToMany(actions);
        // actions.getFilmDetails.listen(this.getFilmDetails())
    }


    getFilmDetails(id) {
        Fetch('movie/'+ id).then(function (response) {
            const film_details = response.data;
            this.setState({ film_details });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }

    getVideos(id){
        Fetch('movie/' + id + '/videos').then(function (response) {
            const videos = response.data.results;
            this.setState({ videos });
        }.bind(this))
        // console.log(this.state.videos)
    }
}

var store = Reflux.initStore(FilmDetailsStore);

