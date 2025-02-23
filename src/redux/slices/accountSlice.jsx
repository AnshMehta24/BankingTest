import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    loading: false,
    error: null
}

export const convertCurrency = createAsyncThunk("account/convertCurrency", async ({ amount, currency }, thunkAPI) => {
    try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`)
        const data = response.json();

        return data;



    } catch (error) {
        // console.log(error, "ERR FROM THUNK")
        return thunkAPI.rejectWithValue(error.message)
    }
})

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        withdraw: (state, action) => {
            if (state.balance > 0) {
                state.balance -= action.payload
            }
        },
        requestLoan: (state, action) => {
            if (state.loan === 0) {
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payBack: (state) => {
            if (state.loan > 0) {
                state.balance -= state.loan;
                state.loan = 0;
                state.loanPurpose = "";
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(convertCurrency.pending, (state) => {
            state.loading = true
        })
            .addCase(convertCurrency.fulfilled, (state, action) => {
                console.log(action.payload, "FULLFILLED")
                state.loading = false,

                    state.balance += action.payload.rates.INR
            })
            .addCase(convertCurrency.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})


export const { withdraw, requestLoan, payBack } = accountSlice.actions;
export default accountSlice.reducer;