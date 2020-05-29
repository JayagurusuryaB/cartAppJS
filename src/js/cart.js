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
                .cartItemBox{
                    border:1px solid #000;
                    background:#fff;
                    padding:15px;
                    margin-bottom:10px;
                }
                .cartItemBox__items img{
                    width:100%;
                    max-width:100px;
                    margin-right:15px;
                    height:auto;
                    float:left;
                }
                .cartItemBox__countele,
                .btn__remove{
                    position: relative;
                    top: 2.5rem;
                    text-align: center;
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
      
        var div = this.createNode('div');
        div.setAttribute("class", "cartItems clearfix");
       
        this.appendChild(div);
        if(this.cartList){
        let cartListcontainer =
            this.cartList.map((item) => {   // <-- map instead of forEach
                item.discountPrice = (item.price * item.discount) / 100;

                return `
                    <div class="cartItemBox clearfix">
                        <div class="cartItemBox__items col-4 clearfix">    
                            <img src="${item.img_url}" alt="img_item"/>
                            <div class="">
                                <p>${item.name}</p>
                                <div class="price-block">
                                    <div class="price-box pull-left">&#x20b9;${item.price - item.discountPrice} <del class="price-block__discount">${item.price}</del></div>
                                    <div class="price-block__discountpercent pull-right">${item.discount}% off</div>
                                </div>
                            </div>
                        </div>
                        <div class="cartItemBox__countele col-4"><app-inputcounter></app-inputcounter></div>
                        <div class="btn__remove col-4"><b>REMOVE</b></div>
                    </div>
            `});
        this.querySelector('.cartItems').innerHTML = cartListcontainer.join('\n');

    }

    }

   
}

window.customElements.define('app-cart', CartComponent);