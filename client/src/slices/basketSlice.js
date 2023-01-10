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
        addTobasket: (state, action)=>{
            // manuplating the items of global store which is [] initially
            state.items = [...state.items, action.payload]    // not pushing directly
            // and finally we get the item as payload and we change the state
        },
        removeFromBasket: (state, action)=>{
            state.items = [...state.items].filter(item=>item.id !== action.payload);
        }
    }
})

// For adding and removing (basically perform action on the basket)
export const {addTobasket, removeFromBasket} = basketSlice.actions;

// For pulling information from the slice(basket in this case)
export const selectItems = (state) => state.basket.items;
export const subTotal = (state) => state.basket.items.reduce((total,item)=> total + item.price, 0)

export default basketSlice.reducer;