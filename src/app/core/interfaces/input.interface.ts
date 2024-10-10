
export interface InputControl{
    type: 'text' | 'number' | 'date' |'email' | 'password',
    label?: string,
    icon?: string,
    placeholder?: string,
    textAre?: boolean
    formInfo?: {
        formName: string,
        validatorRequered: boolean,
        validatorEmail?: boolean,
    }
}