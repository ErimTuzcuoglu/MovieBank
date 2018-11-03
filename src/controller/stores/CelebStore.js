import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class CelebsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { celebs: null, celebDetails: null };
        this.listenToMany(actions);
        actions.getCelebs.listen(this.getCelebs())
    }


    getCelebs() {
        Fetch('trending/person/week').then(function (response) {
            this.setState({ celebs: response.data.results });
            //console.log(response);
        }.bind(this))
    }

    getCelebDetails(id) {
        Fetch('person/'+ id).then(function (response) {
            const celebDetails = response.data;
            this.setState({ celebDetails });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}


var store = Reflux.initStore(CelebsStore);