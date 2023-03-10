import { configureStore } from '@reduxjs/toolkit'
import currentCustomerReducer from '../reducers/dummyReducer'

export default configureStore({
  reducer: {currentCustomerReducer},
})