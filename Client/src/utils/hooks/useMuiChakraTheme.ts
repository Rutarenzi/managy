import { setMuiIndex } from '@/redux/slices/utils.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function useMuiChakraTheme() {
  const { muiIndex } = useSelector((state: any) => state.utils.muiChakraTheme);
  const dispatch = useDispatch();

  const setIndexMui = (index: number) => {
    dispatch(setMuiIndex(index));
  };

  return {
    muiIndex,
    setIndexMui,
  };
}
