import { forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { IMask, IMaskInput } from 'react-imask';
import c from './Slice.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MaskCustom = forwardRef(function MaskCustom(props: any, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="hh:mm:ss"
      blocks={{
        hh: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 99,
          maxLength: 2
        },
        mm: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2
        },
        ss: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2
        }
      }}
      lazy={false}
      inputRef={ref}
      onAccept={(value: unknown) => onChange({ target: { name: props.name, value } })}
      overwrite
      // unmask={true}
    />
  );
});
export default function Slice({ onUpdate }: { onUpdate: (value: string) => void }) {
  const [values, setValues] = useState({ from: '00:00:00', to: '00:00:00' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
    onUpdate(`${newValues.from}-${newValues.to}`);
  };
  return (
    <>
      <span className={c.half}>
        <span className={c.text}>从:</span>
        <TextField
          size="small"
          sx={{ mx: 1.5 }}
          name="from"
          value={values.from}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          InputProps={{ inputComponent: MaskCustom as any }}
          onChange={handleChange}
        />
      </span>
      <span className={c.half}>
        <span className={c.text}>到:</span>
        <TextField
          size="small"
          sx={{ mx: 1.5 }}
          name="to"
          value={values.to}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          InputProps={{ inputComponent: MaskCustom as any }}
          onChange={handleChange}
        />
      </span>
    </>
  );
}
