import Controller from './controller';

export class inputCounterComponent extends HTMLElement{
    constructor() {
        super();
        this.subscribe();
    }
    subscribe() {
        Controller.instance.subscribe(this);
    }
    unsubscribe() {
        Controller.instance.unsubscribe(this);
    }
    connectedCallback() {
        this.innerHTML =`
            <style>
                .inputCounter span {
                    cursor:pointer; 
                }
                .minus, .plus{
                    width: 34px;
                    height: 34px;
                    background: #f2f2f2;
                    border-radius: 50%;
                    padding:8px 5px 8px 5px;
                    border:1px solid #ddd;
                    display: inline-block;
                    vertical-align: middle;
                    text-align: center;
                }
                input{
                    height:34px;
                    width: 50px;
                    text-align: center;
                    font-size: 20px;
                    border:1px solid #ddd;
                    border-radius:4px;
                    display: inline-block;
                    vertical-align: middle;
                    color:#000;
                }
            </style>

            <div class="inputCounter">
                <span class="minus">-</span>
                <input type="text" value="1"/>
                <span class="plus">+</span>
            </div>
        `;
    }
}
window.customElements.define('app-inputcounter', inputCounterComponent);