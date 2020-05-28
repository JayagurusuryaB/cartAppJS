import Controller from './controller';
export class CartComponent extends HTMLElement {

    constructor() {
        super();
        this.subscribe();
        //  this.shadow= this.attachShadow({mode:'open'});
        console.log("shopingList", Controller.instance.shoppingList);
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
    append(parent, el) {
        return parent.appendChild(el);
    }
    connectedCallback() {
        this.createDOM();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }
    createDOM() {
        // document.querySelector('app-shopping-list').remove();
        this.cartList = JSON.parse(localStorage.getItem("cartItems"));
        this.innerHTML = `<style> 
                .shoppingList{
                    list-style:none;
                    width:100%;
                    padding:0;
                    margin:0;
                }
                .shoppingList li{
                    float:left;
                    width: calc( 100% / 5 );
                    padding: 0 10px 20px;
                }
                ul li img{
                    width:100%;
                    height:auto;
                }
                .price-block__discount{
                    color:#707070;
                    font-size:12px;
                    display:inline-block;
                }
                .price-block__discountpercent{
                    font-size:12px;
                    color:#14A214;
                    margin-bottom:10px;
                }
                </style>`;
      
        var ul = this.createNode('ul');
        ul.setAttribute("class", "shoppingList clearfix");
       
        this.appendChild(ul);
        if(this.cartList){
        let cartListcontainer =
            this.cartList.map((item) => {   // <-- map instead of forEach
                item.discountPrice = (item.price * item.discount) / 100;

                return `
                    <li>
                        <img src="${item.img_url}" alt="img_item"/>
                        <p>${item.name}</p>
                        <div class="price-block">
                            <div class="price-box pull-left">&#x20b9;${item.price - item.discountPrice} <del class="price-block__discount">${item.price}</del></div>
                            <div class="price-block__discountpercent pull-right">${item.discount}% off</div>
                            <div class="text-center clearfix">
                                <button class="btn btn--bgwarning add-to-cart" >Add to Cart</button>
                            </div> 
                        </div>
                    </li>
            `});
        this.querySelector('.shoppingList').innerHTML = cartListcontainer.join('\n');

    }

    }

   
}

window.customElements.define('app-cart', CartComponent);