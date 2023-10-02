import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../config/rootReducer'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
