import Controller from './controller';

export class SortComponent extends HTMLElement {
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
        <button id="priceLow">PriceLow</button>
        <button id="priceHigh">PriceHigh</button>
        <button id="discount">Discount</button>`;
        this.shadowRoot.querySelector('#priceLow').addEventListener("click",()=>{this.sortList('priceLow')})
        this.shadowRoot.querySelector('#priceHigh').addEventListener("click",()=>{this.sortList('priceHigh')})
        this.shadowRoot.querySelector('#discount').addEventListener("click",()=>{this.sortList('discount')})

    }

    sortList(tag){
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
    }


}

window.customElements.define('app-sort', SortComponent);