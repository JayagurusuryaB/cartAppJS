
let _instance = null;
export default class Controller {
    static get instance() {
        return _instance ? _instance : _instance = new Controller();
    }

    constructor() {
        this._shoppingList = [];
        this._originalShoppingList =[];
        this._core = {
            subscribers: [],
        };
        //this.loadShoppingList();
        window.Controller = this; //for debugging purposes
    }
    get shoppingList() {
        return this._shoppingList;
    }
    get originalShoppingList(){
        return this._originalShoppingList;
    } 

    setOriginalShoppingList(data){
        this._originalShoppingList = data;
    }

    defaultsort(data){
        var sortedList = data.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
        Controller.instance.editShoppingList(sortedList);
    }

    editShoppingList(data) {
        this._shoppingList = data;

        this._core.subscribers && this.emit();
    }
    

    cartUpdate(){
        console.log("jpeenr");
        this._core.subscribers.forEach(component => {
            console.log("component",typeof component.createCartList);

            typeof component.createCartList === 'function' &&
                component.next();
        });
    }
    emit() {
        this._core.subscribers.forEach(subscriber =>
            subscriber.next(this._core)
        );
    }
    emit() {
        this._core.subscribers.forEach(component => {
            console.log("component",typeof component.createCartList);

            typeof component.next === 'function' &&
                component.next(this._core);
        });
    }
    subscribe(component) {
        console.log("component name",component);
        !this._core.subscribers.includes(component) &&
            this._core.subscribers.push(component);
    }
    unsubscribe(component) {
        this._core.subscribers.includes(component) &&
            this._core.subscribers.splice(this._core.subscribers.indexOf(component), 1);
    }
}