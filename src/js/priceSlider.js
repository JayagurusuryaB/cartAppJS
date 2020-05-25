import Controller from './controller';

export class PriceSliderComponent extends HTMLElement {
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
        this.innerHTML =   `
            <style>
    .slidecontainer {
    width: 100%;
    padding: 0 10px;
    margin-top: 20px;
    }

    .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    }

    .slider:hover {
    opacity: 1;
    }

    .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
    }

    .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
    }
    </style>
<div class="slidecontainer">
  <input type="range" min="1" max="1000" value="1000" class="slider" id="sliderData">
 
</div>

`;

        // this.shadowRoot.innerHTML = `
        // <form >
        // <input id="searchData" type="text" placeholder="Search.." name="search">
        // <i class="fa fa-search"></i>
        // </form>`;
        this.querySelector('#sliderData').addEventListener("change",()=>{this.slider()})
        
this.slider();
    }
    disconnectedCallback(){
        this.unsubscribe();
    }

    slider(){
        console.log("element",document.getElementById('sliderData').value);
       let val =parseInt(document.getElementById('sliderData').value);
        console.log("val",typeof val);
       // if the value is an empty string don't filter the items
       if (val >0) {
           this.shoppingListItems = Controller.instance.originalShoppingList;
           this.shoppingListItems = this.shoppingListItems.filter((item) => {
                console.log("item price type",item.price ,val,(item.price <=val));
               return (item.price <= val);
           })
           Controller.instance.editShoppingList(this.shoppingListItems);
        }
        else{
            Controller.instance.editShoppingList(Controller.instance.originalShoppingList);
        }
    }


}

window.customElements.define('app-price-slider', PriceSliderComponent);