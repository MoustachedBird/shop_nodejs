import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS} from "../constants/productConstants";

/*Se declara una accion llamada "listProducts" o lista de productos la cual contiene
un despachador asincrono 

acá lo unico que se hace es definir cada una de las operaciones que va a hacer la accion
listProducts

*/
export const listProducts = () => async (dispatch) =>{
    dispatch({type: PRODUCT_LIST_REQUEST});
    try{
        const { data } = await Axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch (error){
        dispatch({type:PRODUCT_LIST_FAIL,payload: error.message});
    }
}


export const detailsProduct = (productId) => async (dispatch) => {
    dispatch ({type: PRODUCT_DETAILS_REQUEST, payload:productId});
    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data });
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ?
            error.response.data.message
            : 
            error.message
        });
    }
}