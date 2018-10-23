import Reflux from 'reflux';

export var actions = Reflux.createActions([
    'getCelebs',
    'getNews',
    'getPlayings',
    'getFilmDetails',
    'getVideos',
]);

actions.getPlayings();
actions.getNews();
actions.getCelebs();
actions.getFilmDetails();
actions.getVideos();