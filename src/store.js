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
    getItem(id) {
        let list = JSON.parse(localStorage.getItem('countries') || '[]');
        var item = list.filter(x => x.item.id===id);
        if(item.length>0)
            return item[0];
        else
            return false;
    }
    addItem(item) {
        let list = this.getItems();
        //=> this way , if ==-1 then its a new item, so add it to list bottom, else then update
        if(item.id===-1) {
            item.id = list.length+1;
            list.push({item});
        }
        else {
            for(var i = 0; i<list.length;i++) {
                if(list[i].item.id === item.id)
                {
                    list[i].item.name = item.name;
                    list[i].item.population = item.population;
                    list[i].item.capitol = item.capitol;
                }
            }
        }
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
