import {useState, useEffect} from "react";
import {API_KEY, API_URL} from '../config'
import {Preloader} from "./Preloader";
import {GoodsList} from "./GoodsList";
import {Cart} from "./Cart";
import {BasketList} from "./BasketList";
import {Alert} from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');
    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);
        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            };
            setOrder([...order, newItem]);
        }
        else {
            incQuantity(order[itemIndex].id);
        }
        setAlertName(item.name);
    };
    const heandelBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName('');
    }
    const basketDelete = (id) => {
        const newOrder = order.filter((item)=>item.id !== id);
        setOrder(newOrder);
    }
    const incQuantity = (itemId) => {
        const newOrder = order.map((orderItem)=>{
            if( orderItem.id === itemId)
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1
                };
            else return orderItem;
        });
        setOrder(newOrder);
    };
    const decQuantity = (itemId) => {
        const fOrder = order.filter((item) => !(item.id === itemId && item.quantity === 1))
        if(fOrder.length !== order.length) {
            setOrder(fOrder);
            return;
        }
        const newOrder = order.map((orderItem) => {
            if( orderItem.id === itemId) {
                const newQuality = orderItem.quantity -1;
                if (orderItem.quantity > 1) return {
                    ...orderItem,
                    quantity: newQuality
                };
            }
            else return orderItem;
        });
        setOrder(newOrder);
    };

    useEffect(function getGoods(){
        fetch(API_URL,{
            headers: {'Authorization': API_KEY}
        }).then(response => response.json()).then(data => {
            data.daily && setGoods(data.daily);
            setLoading(false);
        })
    },[]);
    return <main className="container content">
        <Cart quantity = {order.length} heandleBasketShow = {heandelBasketShow}/>
        {loading ?(
            <Preloader/>
        ) : (
            <GoodsList goods={goods} addToBasket={addToBasket}/>
        )}
        {isBasketShow && (
            <BasketList
                order = {order}
                heandelBasketShow ={heandelBasketShow}
                basketDelete ={basketDelete} incQuantity = {incQuantity}
                decQuantity = {decQuantity}/>
        )}
        {alertName && (
            <Alert name = {alertName} closeAlert = {closeAlert}/>
        )}
    </main>
}
export {Shop};