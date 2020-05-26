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
    createNode(element) {
        return document.createElement(element); // Create the type of element you pass in the parameters
    }
    connectedCallback() {
        this.innerHTML = `
            <style>
    
    section.range-slider {
        position: relative;
        width: 200px;
        height: 35px;
        text-align: center;
    }
    
    section.range-slider input {
        pointer-events: none;
        position: absolute;
        overflow: hidden;
        left: 0;
        top: 15px;
        width: 200px;
        outline: none;
        height: 18px;
        margin: 0;
        padding: 0;
    }
    
    section.range-slider input::-webkit-slider-thumb {
        pointer-events: all;
        position: relative;
        z-index: 1;
        outline: 0;
    }
    
    section.range-slider input::-moz-range-thumb {
        pointer-events: all;
        position: relative;
        z-index: 10;
        -moz-appearance: none;
        width: 9px;
    }
    
    section.range-slider input::-moz-range-track {
        position: relative;
        z-index: -1;
        background-color: rgba(0, 0, 0, 1);
        border: 0;
    }
    section.range-slider input:last-of-type::-moz-range-track {
        -moz-appearance: none;
        background: none transparent;
        border: 0;
    }
      section.range-slider input[type=range]::-moz-focus-outer {
      border: 0;
    }
    </style>

<section class="range-slider">
  <span class="rangeValues"></span>
  <input value="0" min="0" max="1000" step="20" type="range" id="leftslider">
  <input value="1000" min="0" max="1000" step="20" type="range" id="rightslider">
</section>
`;

      
        this.querySelector('#leftslider').addEventListener("change",()=>{this.updateData()});
        this.querySelector('#rightslider').addEventListener("change",()=>{this.updateData()});
this.updateData();
      
    }
    disconnectedCallback() {
        this.unsubscribe();
    }

    updateData() {
        // Get slider values
        var slide1 =parseFloat(document.getElementById("leftslider").value) ;
        var slide2 = parseFloat(document.getElementById("rightslider").value);
       
        // Neither slider will clip the other, so make sure we determine which is larger
         if (slide1 > slide2) { var tmp = slide2; slide2 = slide1; slide1 = tmp; }

        var displayElement = document.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = slide1 + " - " + slide2;
        this.slider(slide1,slide2);
    }
    slider(min,max) {
  
            this.shoppingListItems = Controller.instance.originalShoppingList;
            this.shoppingListItems = this.shoppingListItems.filter((item) => {
                return (item.price >=parseInt(min) && item.price <=parseInt(max) );
            })
            Controller.instance.editShoppingList(this.shoppingListItems);
           }
  
}

window.customElements.define('app-price-slider', PriceSliderComponent);