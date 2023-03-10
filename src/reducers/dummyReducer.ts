import {createSlice} from '@reduxjs/toolkit'

export const currentCustomerSlice = createSlice({
    name: 'currentCustomer',
    initialState: {
        value: {},
    },
    reducers: {
        setCurrentCustomer: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCurrentCustomer} = currentCustomerSlice.actions

export default currentCustomerSlice.reducer