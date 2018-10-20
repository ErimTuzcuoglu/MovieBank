import {Fetch} from './../utils/Api';
import Reflux from 'reflux';
import {actions} from '../../actions';

export class PlayingStore extends Reflux.Store{

    constructor() {
        super();
        this.state = {playing : null};
        // this.listenToMany(actions);
        actions.getPlayings.listen(this.getPlayings())
    }
    

    getPlayings(){
        Fetch('trending/movie/week').then(function (response) {
            this.setState({playing : response.data.results});
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}
