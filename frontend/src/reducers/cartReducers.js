import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
        case CART_REMOVE_ITEM:
            /*de state no vamos a cambiar todo, solo el parametro cartItems, en el cual se va a 
            guardar el contenido de state.cartItems de los contenidos que no coincidan con la id
            del producto a eliminar (se aplica un filtro que devuelve todos menos la id a eliminar ) 
            */
            return { ...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)}
        default:
            return state;
    }
}