import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class CelebsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { celebs: null };
        // this.listenToMany(actions);
        actions.getCelebs.listen(this.getCelebs())
    }


    getCelebs() {
        Fetch('trending/person/week').then(function (response) {
            this.setState({ celebs: response.data.results });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}
