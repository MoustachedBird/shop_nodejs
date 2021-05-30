import Axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstants";

//para despacha y obtener el estado de la tienda de redux
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`);
    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            prince: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

}