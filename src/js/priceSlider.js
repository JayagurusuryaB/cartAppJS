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
            .rangeSlider__container{
                position:relative;
            }
            .rangeValues {
                display: block;
                text-align: center;
                padding: 15px 0;
            }
            input {
                background: transparent;
                color: #fff;
                border: 0;
                outline: 0;
            }
            input[type="range"] {
                -webkit-appearance: none;
                width:100%;
                position:absolute;
                margin:0;
             }
           
            input[type="range"]:focus {
                outline: none;
            }
            input[type="range"]::-webkit-slider-runnable-track {
                background: #4269EA;
                height: 5px;
            }
            input[type="range"]#rightslider::-webkit-slider-runnable-track{
                height:0;
            }
            input[type="range"]::-moz-range-track{
                background: #4269EA;
                height: 5px;
            }
            input[type="range"].rightslider::-moz-range-track{
                height:0;
            } 
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 15px;
                width: 15px;
                background: #fff;
                border:1px solid #707070;
                margin-top: -5px;
                border-radius: 50%;
            }
            
            input[type="range"]::-moz-range-thumb {
                height: 15px;
                width: 15px;
                background: pink;
                margin-top: -5px;
                border-radius: 50%;
            }
        </style>
        <section class="rangeSlider">
        <div style="margin:15px 0;"><b>Filters</b></div>
        <span class="rangeValues"></span>
        <div class="rangeSlider__container"><input value="0" min="0" max="1000" step="20" type="range" id="leftslider">
        <input value="1000" min="0" max="1000" step="20" type="range" id="rightslider"></div>
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
        displayElement.innerHTML = "&#x20b9;" + slide1 + " - " + "&#x20b9;" + slide2;
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