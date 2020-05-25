import Controller from './controller';

export class SearchComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
      //  this.attachShadow({mode:'open'});
    }
    next(core) {
    }
    subscribe() {
        Controller.instance.subscribe(this);
    }
    unsubscribe() {
        Controller.instance.unsubscribe(this);
    }
    connectedCallback() {

        this.innerHTML = `
        <style>
        :host input{
            background:transparent;
            color:#fff;
            border:0;
            outline:0;
            border-bottom:1px solid #fff;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active,
        input:-webkit-autofill:valid,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus
        {
            -webkit-transition-delay: 99999s;
            -webkit-text-fill-color:#fff;
        }
        </style>
        <form >
        <input id="searchData" type="text" placeholder="Search.." name="search">
        <i class="fa fa-search"></i>
        </form>`;
        document.querySelector('#searchData').addEventListener("keyup",()=>{this.searchData()})

    }
    disconnectedCallback(){
        this.unsubscribe();
    }

    searchData(){
       console.log("searchdata",document.getElementById('searchData').value);
       let val =document.getElementById('searchData').value;

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