import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/provider/store/config/store'

export const useAppDispatch: () => AppDispatch = useDispatch
