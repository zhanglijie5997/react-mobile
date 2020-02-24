export interface DataType {
    name: string,
    value: string ,
    type: string,
    placeholder: string
}

export interface PropsType {
    validateMap: Map<number, (str: string) => boolean>,
    toastMap: Map<number, () => void>,
    data: DataType[],
    changeFn: (index: number, value: string) => void
}