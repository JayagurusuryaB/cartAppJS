import Controller from './controller';
export class CartComponent extends HTMLElement {

    constructor() {
        super();
        this.subscribe();
        //  this.shadow= this.attachShadow({mode:'open'});
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
        this.createcartDOM();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }
    createcartDOM() {
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
                .inputCounter span {
                    cursor:pointer; 
                }
                .minus, .plus{
                    width: 34px;
                    height: 34px;
                    background: #f2f2f2;
                    border-radius: 50%;
                    padding:8px 5px 8px 5px;
                    border:1px solid #ddd;
                    display: inline-block;
                    vertical-align: middle;
                    text-align: center;
                }
                input{
                    height:34px;
                    width: 50px;
                    text-align: center;
                    font-size: 20px;
                    border:1px solid #ddd;
                    border-radius:4px;
                    display: inline-block;
                    vertical-align: middle;
                    color:#000;s
                </style>`;

        var div = this.createNode('div');
        div.setAttribute("class", "cartItems clearfix");

        this.appendChild(div);
        if (this.cartList) {
            let cartListcontainer =
                this.cartList.map((item,i) => {   // <-- map instead of forEach
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
                        <div class="cartItemBox__countele col-4">
                            <div class="inputCounter">
                                <span class="minus cart-item-count-minus" >-</span>
                                <input class="cart-item-input" id="cart-item-count-${i}" type="number" min="0" max="100" value="${item.count}"/>
                                <span class="plus cart-item-count-plus">+</span>
                            </div>
                        </div>
                        <div class="btn__remove col-4 remove-from-cart"><b>REMOVE</b></div>
                    </div>
            `});
            this.querySelector('.cartItems').innerHTML = cartListcontainer.join('\n');
            var elems = document.getElementsByClassName('remove-from-cart');

            if (elems.length) {
                for (var i = 0, l = elems.length; i < l; i++) {
                    var item = this.cartList[i];
                    (function (i, item) {
                        elems[i].onclick = function () {
                            let existingItems = localStorage.getItem("cartItems");
                            existingItems = existingItems ? JSON.parse(existingItems) : [];
                            if (existingItems) {
                                existingItems = existingItems.filter((cart) => { return cart.id != item.id });
                            }
                            localStorage.setItem("cartItems", JSON.stringify(existingItems));
                            alert('Item removed from Cart');
                            location.reload();
                        }
                    })(i, item);
                }
            }

            var inputItems = document.getElementsByClassName('cart-item-input');
            if (inputItems.length) {
                for (var i = 0, l = inputItems.length; i < l; i++) {
                    (function (i) {
                       inputItems[i].onchange = function () {
                        console.log("inputiem value",inputItems[i].value);
                        let existingItems = localStorage.getItem("cartItems");
                        existingItems = existingItems ? JSON.parse(existingItems) : [];
                       existingItems[i].count = parseInt(inputItems[i].value);

                       console.log("cart items",existingItems);
                        localStorage.setItem("cartItems", JSON.stringify(existingItems));
                        Controller.instance.cartUpdate();

                        }
                    })(i);
                }
            }
            var cartItems= this.cartList;

            var minusItems = document.getElementsByClassName('cart-item-count-minus');
            if (minusItems.length) {
                for (var i = 0, l = minusItems.length; i < l; i++) {
                    (function (i) {
                        minusItems[i].onclick = function () {
                        console.log("inputiem value",  document.getElementById("cart-item-count-"+i).value );
                        let existingItems = localStorage.getItem("cartItems");
                        existingItems = existingItems ? JSON.parse(existingItems) : [];
                       existingItems[i].count =  existingItems[i].count-1>0 ?  existingItems[i].count-1:0;
                       document.getElementById("cart-item-count-"+i).value =  existingItems[i].count;

                       console.log("cart items",existingItems);
                        localStorage.setItem("cartItems", JSON.stringify(existingItems));
                        Controller.instance.cartUpdate();

                        }
                    })(i);
                }
            }

            var plusItems = document.getElementsByClassName('cart-item-count-plus');
            if (plusItems.length) {
                for (var i = 0, l = plusItems.length; i < l; i++) {
                    (function (i) {
                        plusItems[i].onclick = function () {
                            console.log("inputiem value",document.getElementById("cart-item-count-"+i).value);
                            let existingItems = localStorage.getItem("cartItems");
                            existingItems = existingItems ? JSON.parse(existingItems) : [];
                           existingItems[i].count =  existingItems[i].count+1 <= 100 ? existingItems[i].count+1 : 100;
                           document.getElementById("cart-item-count-"+i).value =  existingItems[i].count;

                       console.log("cart items",existingItems);
                        localStorage.setItem("cartItems", JSON.stringify(existingItems));
                        Controller.instance.cartUpdate();

                        }
                    })(i);
                }
            }
        }

    }


}

window.customElements.define('app-cart', CartComponent);