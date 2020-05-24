import Controller from './controller';

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
        this.attachShadow({mode:'open'});

    }
    next(core) {
    }
    subscribe() {
        Controller.instance.subscribe(this);
    }
    unsubscribe() {
        Controller.instance.unsubscribe(this);
    }
    connectedCallback() {

        this.shadowRoot.innerHTML = " <h1>Loaded Header sucessfully</h1>";
    }
    disconnectedCallback(){
        this.unsubscribe();
    }
    
}

window.customElements.define('app-header', HeaderComponent);