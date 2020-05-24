import Controller from './controller';

export class SearchComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
        //this.shadow = this.createShadowRoot();
    }
    next(core) {
        //console.log('Updated core emitted to VeryFarComponent: ', core);
    }
    subscribe() {
        Controller.instance.subscribe(this);
    }
    unsubscribe() {
        Controller.instance.unsubscribe(this);
    }
    connectedCallback() {

        var shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <form >
        <input id="searchData" type="text" placeholder="Search.." name="search">
        <i class="fa fa-search"></i>
        </form>`;
        this.shadowRoot.querySelector('#searchData').addEventListener("keyup",()=>{this.searchData()})

    }

    searchData(){
       console.log("searchdata",this.shadowRoot.getElementById('searchData').value);
       let val =this.shadowRoot.getElementById('searchData').value;

       // if the value is an empty string don't filter the items
       if (val && val.trim() != '') {
           this.shoppingListItems = Controller.instance.originalShoppingList;
           this.shoppingListItems = this.shoppingListItems.filter((item) => {

               return (item.name.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
           })
           Controller.instance.editShoppingList(this.shoppingListItems);
        }
        else{
            Controller.instance.editShoppingList(Controller.instance.originalShoppingList);
        }
    }


}

window.customElements.define('app-search', SearchComponent);