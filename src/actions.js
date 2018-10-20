import Reflux from 'reflux';

export var actions = Reflux.createActions([
    'getCelebs',
    'getNews',
    'getPlayings',
]);

actions.getPlayings();
actions.getNews();
actions.getCelebs();