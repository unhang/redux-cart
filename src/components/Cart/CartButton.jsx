import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    return state.cart.items.reduce((curVal, item) => {
      return item.quantity + curVal;
    }, 0);
  });
  return (
    <button
      className={classes.button}
      onClick={() => dispatch(uiActions.toggleCartVisible())}
    >
      <span>My Cart</span>
      {quantity > 0 && <span className={classes.badge}>{quantity}</span>}
    </button>
  );
};

export default CartButton;
