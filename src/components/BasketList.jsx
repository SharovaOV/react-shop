import {BasketItem} from "./BasketItem";
function BasketList(props) {
    const {order=[],
        heandelBasketShow=Function.prototype,
        basketDelete = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = props;
    const totalPrice = order.reduce((sum, item)=>{return item.price && item.quantity ? sum + item.price * item.quantity: sum},0)
    return (<div className="collection basket-list">
        <li className="collection-item active">Корзина</li>
        { order.length ? order.map(item => (
            <BasketItem key={item.id} {...item}
                        basketDelete={basketDelete}
                        incQuantity = {incQuantity}
                        decQuantity = {decQuantity}/>
        )):<li className="collection-item">Корзина пуста</li> }
        <li className="collection-item active">Общая стоимость: {totalPrice} руб.
        </li>
        <li className="collection-item go-buy">
            <button className="secondary-content btn btn-small" >Оформить</button>
        </li>
        <i  className="material-icons basket-close" onClick={heandelBasketShow}>close</i>
    </div>);
}
export {BasketList};