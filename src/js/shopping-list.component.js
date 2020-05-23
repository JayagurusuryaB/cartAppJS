import Controller from './controller';
export class ShoppingListComponent extends HTMLElement {

    constructor() {
        super();
        this.subscribe();
        this.shadow= this.attachShadow({mode:'open'});
        console.log("shopingList", Controller.instance.shoppingList);
        //  console.log("shopingList",this.shopingList);
    }
    next(core) {
        console.log('Updated core emitted to shoppingListcomponent: ', core);
        this.replaceDOM();
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
        this.loadDoc();
    }
    replaceDOM() {
       // document.querySelector('app-shopping-list').remove();
       
        this.shadow.innerHTML = `<style> 
        ul li img{
            width:100px !important;
            height:100px !important;
        }
    </style>`;
            this.shoppingList = Controller.instance.shoppingList;
            var ul = this.createNode('ul');
            ul.setAttribute("id", "shoppingList");
            this.shoppingList.forEach((item, i) => {
                console.log("i", i);
                let li = this.createNode('li'),
                    img = this.createNode('img'),
                    span = this.createNode('span');
                img.src = item.img_url;
                span.innerHTML = `${item.name}`;
                this.append(li, img);
                this.append(li, span);
                this.append(ul, li);
            });
            this.shadow.appendChild(ul);

    }


    loadDoc() {

        

        fetch("src/json/list.json")
            .then((resp) => resp.json())
            .then((data) => {
                // Here you get the data to modify as you please
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