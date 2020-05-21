import '../css/main.scss';
import '../fonts/verdana/stylesheet.css'
import{ HeaderComponent } from './header.component';
import{ ShoppingListComponent } from './shopping-list.component';



    const xhttp = new XMLHttpRequest();
    let shopingList;
    xhttp.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            shopingList = this.responseText;
            console.log('reslist',shopingList);
        }
        else{
            alert('json payload failure');
        }
    }
    xhttp.open('get','../../src/json/list.json');
    xhttp.send();
    