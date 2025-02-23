import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: "",
    adharId: "",
    created: ""
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare: ({ fullName, adharId }) => {
                return {
                    payload: {
                        fullName,
                        adharId,
                        created: new Date().toISOString()
                    }
                }
            },
            reducer: (state, action) => {
                console.log("Reducers", action.payload)
                state.fullName = action.payload.fullName;
                state.adharId = action.payload.adharId;
                state.created = action.payload.created
            },
        }


    }
})



export const { createCustomer } = customerSlice.actions;

export default customerSlice.reducer;