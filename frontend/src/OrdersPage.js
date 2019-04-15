import React, {Component} from "react";
import ErrorPage from './ErrorPage';
import FarmOrders from "./FarmOrders";
import KitchenOrders from "./KitchenOrders";

class OrdersPage extends Component {

    render() {
        console.log(localStorage);
        if(localStorage.getItem('loggedin') === 'true') {
            console.log('loggedin')
            if(localStorage.getItem('userType') === 'FARM') {
                console.log('farmikäyttäjä')
                return <FarmOrders/>
            } else if(localStorage.getItem('userType') === 'KITCHEN') {
                console.log('keittiökäyttäjä')
                return <KitchenOrders/>
            } else {
                console.log('login mut error')
                return <ErrorPage/>
            }
        } else {
            console.log('ei ollu kirjauduttu sisää')
            return(
                <ErrorPage/>
            )
        }
    }
}

export default OrdersPage;
