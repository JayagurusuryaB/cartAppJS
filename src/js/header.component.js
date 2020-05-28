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
            }
            .appheader__rtlblock{
                float: right;
                color:#ffffff;
            }
            .appheader__logo{
                color: #F7CE23;
            }
        </style>
         <header class="appheader">
           <a class="appheader__logo" href="/"> <i class="fa fa-star fa-2x " aria-hidden="true"></i></a>
            <div class="appheader__rtlblock">
            <i id="app__headerfasearch" class="fa fa-search fa-2x" aria-hidden="true"></i>
            <app-search id="appheader__search" hidden></app-search>
            <a id="appheader__cart" class="txt-white" href="../../cart.html"><i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i></a>
            </div>
        </header>`;
        document.querySelector('#app__headerfasearch').addEventListener("click",()=>{
            this.querySelector('#app__headerfasearch').style.display = 'none';
            document.querySelector('#appheader__search').style.display = 'inline-block';
        })
        document.addEventListener("DOMContentLoaded", function(event) { 
            if (window.location.href.indexOf("cart.html") != -1) {
                this.querySelector('#app__headerfasearch').style.display = 'none';
                 document.querySelector('#appheader__cart').style.display = 'none';
            }
          });
    }
    disconnectedCallback(){
        this.unsubscribe();
    }
    
}

window.customElements.define('app-header', HeaderComponent);