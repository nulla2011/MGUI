import Box from '@mui/material/Box';
import css from './grid.module.css';
import { clsx } from 'clsx';
import { useRecoilValue } from 'recoil';
import { chunkStatus } from '@renderer/store/states';

export default function Grid() {
  // const [totalState, setTotal] = useState(total);
  // const refList: HTMLDivElement[] = [];
  // const [statusList, setStatusList] = useState<number[]>([]);
  const chunkStatusState = useRecoilValue(chunkStatus);
  // useEffect(() => {
  //   if (total > 0) {
  //     refList.forEach((el) => el.classList.remove(css.complete));
  //     console.log(total);
  //     // setStatusList(Array(total).fill(0));
  //     setTotal(total);
  //   }
  // }, [total]);
  // useEffect(() => {
  //   refList[currentIndexState].classList.add(css.complete);
  //   // setStatusList((prev) => prev.map((e, i) => (i === currentIndexState ? 1 : e)));
  // }, [currentIndexState]);
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {chunkStatusState.map((e, i) => (
        <div className={clsx(css.block, e && css.complete)} key={i}></div>
      ))}
      {/* {.map((_, i) => (
            <div
              className={css.block}
              key={i}
              ref={(ref) => {
                refList[i] = ref!;
              }}
            ></div>
          ))} */}
    </Box>
  );
}
