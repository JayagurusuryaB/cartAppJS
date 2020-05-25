import Controller from './controller';
export class ShoppingListComponent extends HTMLElement {

    constructor() {
        super();
        this.subscribe();
      //  this.shadow= this.attachShadow({mode:'open'});
        console.log("shopingList", Controller.instance.shoppingList);
    }
    next(core) {
        this.createDOM();
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
        this.loadData();
    }

    disconnectedCallback(){
        this.unsubscribe();
    }
    createDOM() {
       // document.querySelector('app-shopping-list').remove();
       
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
            this.shoppingList = Controller.instance.shoppingList;
            var ul = this.createNode('ul');
             ul.setAttribute("class", "shoppingList clearfix");
            // this.shoppingList.forEach((item, i) => {
            //     // console.log("i", i);
            //     let li = this.createNode('li'),
            //         img = this.createNode('img'),
            //         span = this.createNode('span');
            //     img.src = item.img_url;
            //     span.innerHTML = `${item.name}`;
            //     this.append(li, img);
            //     this.append(li, span);
            //     this.append(ul, li);
            // });
            this.appendChild(ul);

            let shoppingListcontainer =
            this.shoppingList.map(function(item) {   // <-- map instead of forEach
                   return `
                    <li>
                        <img src="${item.img_url}" alt="img_item"/>
                        <p>${item.name}</p>
                        <div class="price-block">
                            <div class="price-box pull-left">&#x20b9;${item.price} <del class="price-block__discount">${item.discount}</del></div>
                            <div class="price-block__discountpercent pull-right">${(item.discount/item.price * 100).toFixed(2)}% off</div>
                            <div class="text-center clearfix">
                                <button class="btn btn--bgwarning">Add to Cart</button>
                            </div>
                        </div>
                    </li>
            `});
            this.querySelector('.shoppingList').innerHTML = shoppingListcontainer.join('\n');

    }


    loadData() {

        fetch("src/json/list.json")
            .then((resp) => resp.json())
            .then((data) => {
                // Here you get the data to modify as you please
                Controller.instance.setOriginalShoppingList(data);
                Controller.instance.editShoppingList(data);
            })

            .catch(error => {
                console.log("error", error);
                // If there is any error you will catch them here
            });
    }
    createList() {
        this.shoppingList.forEach(element => {
            console.log("element", element);
        });
    }
}

window.customElements.define('app-shopping-list', ShoppingListComponent);