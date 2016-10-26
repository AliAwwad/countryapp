import EventEmitter from './EventEmitter';
import AppDispatcher from './Dispatcher';

class Store extends EventEmitter {
    constructor() {
        super();
        this.getItems = this.getItems.bind(this);
        // localStorage.setItem('countries', JSON.stringify([]));
    }
    getItems() {
        let list = JSON.parse(localStorage.getItem('countries') || '[]');
        return list;
    }
    addItem(item) {
        let list = this.getItems();
        list.push({id:list.length+1,value:item});
        localStorage.setItem('countries', JSON.stringify(list));
    }
    deleteItem(id) {
        var list2 = [];
        let list = this.getItems();
        for(var i=0; i<list.length;i++){
            if(list[i].id!==id)
            list2.push(list[i]);
        }
        list = list2;
        localStorage.setItem('countries', JSON.stringify(list));
    }
    emitChange() {
        this.emit('change');
    }
    addChangeListener(listener) {
        this.on('change',listener);
    }
}
const AppStore = new Store();
export default AppStore;

AppDispatcher.register(function (action) {
    switch (action.actionType) {
	    case 'ITEM_ADDED':
		    AppStore.addItem(action.newItem);
            AppStore.emitChange();
			break;
        
        case 'ITEM_DELETE':
            AppStore.deleteItem(action.itemId);
            AppStore.emitChange();

		default:
		    break;
	} 
});
