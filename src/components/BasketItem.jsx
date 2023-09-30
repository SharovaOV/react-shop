function BasketItem(props){
    const {id, name, price, quantity,
        basketDelete = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype} = props;
    return (
        <li id={id} className="collection-item">{name} {' '}
            <i
                className='material-icons basket-quantity'
                onClick={() => decQuantity(id)}
            >
                remove
            </i>{' '}
            x {quantity}{' '}
            <i
                className='material-icons basket-quantity'
                onClick={() => incQuantity(id)}
            >
                add
            </i>{' '} {price *quantity}
            <span className="secondary-content" onClick={()=>basketDelete(id)}><i  className="material-icons basket-delete">close</i></span>
        </li>
    );
}
export {BasketItem};