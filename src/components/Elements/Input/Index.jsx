import { forwardRef } from 'react';
import Label from './Label';
import Input from './input';

const InputForm = forwardRef((props, ref) =>{
    const {label, name, type, placeholder} = props
    return (
        <div className='mb-6'>
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} placeholder={placeholder} ref={ref} />
        </div>        
    )
})

InputForm.displayName = "InputForm";

export default InputForm;