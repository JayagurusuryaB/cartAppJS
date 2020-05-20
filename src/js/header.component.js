export class HeaderComponent extends HTMLElement{
    constructor(){
        super();

        //this.shadow = this.createShadowRoot();
    }

    connectedCallback(){
        
      var shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = " <h1>Loaded Header sucessfully</h1>";
    }
}

window.customElements.define('app-header', HeaderComponent);