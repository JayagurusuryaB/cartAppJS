import Controller from './controller';

export class CartListComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
    }
    next() {
        this.createCartList();
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

        this.createCartList();
    }

    createCartList() {
        this.cartListitems = localStorage.getItem("cartItems");
        this.cartListitems = this.cartListitems ? JSON.parse(this.cartListitems) : [];
        this.totalPrice = 0;
        this.totalDiscount = 0;
        this.cartListitems.forEach((item) => {
            item.discountPrice = (item.price * item.discount) / 100;
            item.finalPrice = item.price - item.discountPrice;
            this.totalDiscount = this.totalDiscount + (item.discountPrice * item.count);
            this.totalPrice = this.totalPrice + (item.finalPrice * item.count);
        })
        console.log("total data of cart items", this.cartListitems, this.totalDiscount, this.totalPrice);
        this.innerHTML = `<div>
            <h5>Price Details </h5>
        </div>
        `;
        var ul = this.createNode('ul');
        ul.setAttribute("class", "cartPriceList clearfix");
        
        this.appendChild(ul);

        let cartListPricecontainer =
            this.cartListitems.map((item) => {   // <-- map instead of forEach
               

                return `
            <li>
                <div class="row clearfix">
                    <div class="col-7">
                        <p> Price ${item.name} </p>

                    </div>
                    <div class="col-5">
                        <p> ${item.price * item.count}</p>
                    </div>
                </div>
                
            </li>
    `});
        this.querySelector('.cartPriceList').innerHTML = cartListPricecontainer.join('\n');

        let totalPriceContainer  = `<li>
                <div class="row">
                    <div class="col-7">
                        Total Discount 
                    </div>
                    <div class="col-5">
                        ${this.totalDiscount}
                    </div>
                </div>
                </li>
                <li>
                <div class="row">
                <div class="col-7">
                    Total Price 
                </div>
                <div class="col-5">
                    ${this.totalPrice}
                </div>
            </div>
        </>`;
        this.querySelector('.cartPriceList').innerHTML =  this.querySelector('.cartPriceList').innerHTML + totalPriceContainer;

    }
}
window.customElements.define('app-cart-list', CartListComponent);