export class HeaderComponent extends HTMLElement{
    constructor(){
        super();

        this.shadow = this.createShadowRoot();
    }

    connectedCallback(){
        var template = `
            <h1>Loaded Header sucessfully</h1>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('app-header', HeaderComponent);