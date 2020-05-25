import Controller from './controller';

export class SortComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
        //this.attachShadow({mode:'open'});

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
            .sortBlock{
                padding: 20px 10px;
            }
            .active{
                color:#4269EA;
                border-bottom: 1px solid #4269EA;
            }
            a{
                margin: 0 5px;
                color:#999999;
                font-size:12px;
                line-height:1.2;
            }
            a:hover,a:focus{
                cursor:pointer;
            }
        </style>
        <div class="sortBlock">
        <span><b>Sort By</b></span>
        <a id="priceHigh" class="active">Price -- High Low</a>
        <a id="priceLow">Price -- Low High</a>
        <a id="discount">Discount</a>
        </div>
        `;
        this.querySelector('#priceLow').addEventListener("click",()=>{this.sortList('priceLow',event)})
        this.querySelector('#priceHigh').addEventListener("click",()=>{this.sortList('priceHigh',event)})
        this.querySelector('#discount').addEventListener("click",()=>{this.sortList('discount',event)})

    }
    disconnectedCallback(){
        this.unsubscribe();
    }

    sortList(tag,event){
        var shopList = Controller.instance.shoppingList;
       if(tag == 'priceLow'){
        shopList.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        Controller.instance.editShoppingList(shopList);
       }
       else if(tag == 'priceHigh'){
        shopList.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
        Controller.instance.editShoppingList(shopList);
       }else if(tag == 'discount'){
        shopList.sort((a,b) => (a.discount < b.discount) ? 1 : ((b.discount < a.discount) ? -1 : 0));
        Controller.instance.editShoppingList(shopList);
       }
       
        if (document.querySelector('.sortBlock a.active') !== null) {
          document.querySelector('.sortBlock a.active').classList.remove('active');
        }
        event.target.className = "active";
    }


}

window.customElements.define('app-sort', SortComponent);