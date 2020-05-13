import React, { useMemo, useState, useCallback, ChangeEvent, memo } from 'react'
import styles from "./FormValidate.scss";
import { PropsType, DataType } from './FromValidateType';

const FormValidate = (props: PropsType) => {
    const [getData, setData] = useState<DataType[]>([...props.data])

    const changeDataFn = useCallback((index: number, value: string) => {
        console.log(value, 'event');
        props.changeFn(index, value)
    }, [getData]);

   
    const validateMemo: JSX.Element[]| JSX.Element = useMemo(() => {
        return props.data.map((_: DataType, index: number) => {
            return <li key={index}> 
                      <label>{ _.name }</label> 
                      <input type={ _.type } placeholder={ _.placeholder } onChange={(event: ChangeEvent<HTMLInputElement> ) => changeDataFn(index, event.target.value)}/>
                   </li>
        })
    }, [props.data])
    return (
        <div className={styles.formValidate}>
            { validateMemo }
        </div>
    )
}

function propsChange(curProps: PropsType, nextProps: PropsType): boolean {
    if(JSON.stringify(curProps.data) !== JSON.stringify(nextProps)) {
        return true;
    }
    return false;
}

export default memo(FormValidate, propsChange) 
