import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const addItemHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const itemList = (
    <ul>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onAdd={() => addItemHandler(item)}
          onRemove={() => removeItemHandler(item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {itemList}
    </Card>
  );
};

export default Cart;
