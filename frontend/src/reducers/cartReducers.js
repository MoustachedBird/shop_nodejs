import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[]},action) =>{
    switch(action.type){ 
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product );
            /*Si ya fue añadido al carrito anteriormente... */
            if (existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map((x) => 
                        x.product === existItem.product? item : x
                    ),
                }
            }else{
                /*...state significa que no vamos a cambiar toda la propiedad state
                dentro de cartItems guardaermos a partir de la ultima posicion el nuevo item
                
                */
                return { ...state, cartItems: [...state.cartItems, item]};
            }
        default:
            return state;
    }
}