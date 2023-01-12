import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

// This generates actions on basketSlice
export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        // Actions
        addTobasket: (state, action)=>{  // we get the item as payload and so that we can change the state
            // manuplating the items of global store which is [] initially
            const index = [...state.items].findIndex(item=>item._id===action.payload._id)

            if(index !== -1){
                const allItems = [...state.items] // not pushing directly
                allItems[index].quantity++;
                state.items = allItems;
            }
            else{
                state.items = [...state.items, action.payload]
            }
        },
        removeFromBasket: (state, action)=>{
            state.items = [...state.items].filter(item=>item._id !== action.payload);
        },
        increaseItemQuantity: (state,action)=>{
            state.items = [...state.items].map(item=>{
                if(item._id === action.payload) item.quantity ++;
                return item;
            })
        },
        decreaseItemQuantity: (state,action)=>{
            state.items = [...state.items].map(item=>{
                if(item._id === action.payload && item.quantity > 1) item.quantity-- ;
                return item;
            })
        }
    }
})

// For adding and removing (basically perform action on the basket)
export const {addTobasket, removeFromBasket, increaseItemQuantity, decreaseItemQuantity} = basketSlice.actions;

// For pulling information from the slice(basket in this case)
export const selectItems = (state) => state.basket.items;
export const subTotal = (state) => state.basket.items.reduce((total,item)=> total + item.price * item.quantity, 0).toFixed(2)

export default basketSlice.reducer;