import Controller from './controller';

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
        //this.shadow = this.createShadowRoot();
    }
    next(core) {
      //  console.log('Updated core emitted to VeryFarComponent: ', core);
    }
    subscribe() {
        Controller.instance.subscribe(this);
    }
    unsubscribe() {
        Controller.instance.unsubscribe(this);
    }
    connectedCallback() {

        var shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = " <h1>Loaded Header sucessfully</h1>";
        //this.change("update data");
    }

    change(data) {
        Controller.instance.editShoppingList([data]);
    }
}

window.customElements.define('app-header', HeaderComponent);