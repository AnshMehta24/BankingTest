import { configureStore } from "@reduxjs/toolkit"
import accountReducer from "../redux/slices/accountSlice"
import customerReducer from "../redux/slices/customerSlice"

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
})

export default store;