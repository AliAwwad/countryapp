class Dispatcher {
    constructor() {
        this._lastID = 0;
        this._callbacks = {};
    }
    register(callback) {
        var id = 'CID_'+ this._lastID++;
        this._callbacks[id] = callback;
        return id;
    }
    dispatch(action) {
        for(var id in this._callbacks) {
            this._callbacks[id](action);
        }
    }
}

const AppDispatcher = new Dispatcher();

export default AppDispatcher;