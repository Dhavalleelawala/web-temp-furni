import { createSlice } from "@reduxjs/toolkit";
import {productData} from "./productData";



const initialState = {
    products : productData,
    cart : [],
    netTotal : 0
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers : {
        getCartProducts:(state,action)=>{
            let findIndex = state.cart.findIndex((item)=>{
                return item.id == action.payload.id;
            })
            if(findIndex != -1){
                state.cart[findIndex].quantity += 1;
            }else{
                state.cart.push(action.payload);
            }
        },
        increaseQuantity:(state,action)=>{
            state.cart[action.payload].quantity += 1;
        },
        decreaseQuantity:(state,action)=>{
            if(state.cart[action.payload].quantity > 1)
            {
                state.cart[action.payload].quantity -= 1;
            }
            else
            {
                state.cart.splice(action.payload,1);
            }
        },
        removeCart:(state,action)=>{
            state.cart.splice(action.payload,1);
        },
        getCartTotal:(state)=>{
            let netTotal=0;
            state.cart.map((item,index)=>{
                let {price,quantity} = item;
                let total = price*quantity;
                netTotal+=total;
            })
            console.log(netTotal);
            
            state.netTotal = netTotal;
        }
    }
})


export const {getCartProducts,increaseQuantity,decreaseQuantity,removeCart,getCartTotal} = productSlice.actions;
export default productSlice;