import Reflux from 'reflux';

export var actions = Reflux.createActions([
    'getCelebs',
    'getNews',
    'getPlayings',
    'getCelebDetails',
    'getFilmDetails',
    'getVideos',
    'getBoxOffice',
]);

actions.getPlayings();
actions.getNews();
actions.getCelebs();
actions.getCelebDetails();
actions.getFilmDetails();
actions.getVideos();
actions.getBoxOffice();