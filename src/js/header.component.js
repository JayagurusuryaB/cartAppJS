import Controller from './controller';

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.subscribe();
       // this.attachShadow({mode:'open'});
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

        this.innerHTML =
         `
         <style>
            .appheader{
                background: #4269EA;
                color: #F7CE23;
            }
            .appheader__rtlblock{
                float: right;
                color:#ffffff;
            }
        </style>
         <header class="appheader">
            <i class="fa fa-star fa-2x appheader__logo" aria-hidden="true"></i>
            <div class="appheader__rtlblock">
            <i id="app__headerfasearch" class="fa fa-search fa-2x" aria-hidden="true"></i>
            <app-search id="appheader__search" hidden></app-search>
            <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
            </div>
        </header>`;
        document.querySelector('#app__headerfasearch').addEventListener("click",()=>{
            this.querySelector('#app__headerfasearch').style.display = 'none';
            document.querySelector('#appheader__search').style.display = 'inline-block';
        })
    }
    disconnectedCallback(){
        this.unsubscribe();
    }
    
}

window.customElements.define('app-header', HeaderComponent);