export class ShoppingListComponent extends HTMLElement {

    constructor() {
        super();


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
    loadDoc() {
        var shadow = this.attachShadow({ mode: 'open' });
        //add style like this to shadow dom
        // shadow.innerHTML= `<style> 
        //     ul li img{
        //         width:100px !important;
        //         height:100px !important;
        //     }
        // </style>`;

        fetch("src/json/list.json")
        .then((resp) => resp.json())
            .then((data) => {
                // Here you get the data to modify as you please
                console.log("data",data);
                var ul = this.createNode('ul');
                this.shoppingList = data;
                this.shoppingList.forEach((item) => {
                    let li = this.createNode('li'),
                        img = this.createNode('img'),
                        span = this.createNode('span');
                    img.src = item.img_url;
                    span.innerHTML = `${item.name}`;
                    this.append(li, img);
                    this.append(li, span);
                    this.append(ul, li);

                })
                shadow.appendChild(ul) ;
            })

            .catch(error => {
                console.log("error",error);
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