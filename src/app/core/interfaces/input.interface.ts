import { OptionsKey } from "../../shared/components/molecules/select/select.component";

export interface InputControl{
    type: 'text' | 'number' | 'date' |'email' | 'password' | 'select' | 'text-area',
    label?: string,
    icon?: string,
    placeholder?: string,
    textAre?: boolean,
    options?: string[],
    optionsKey?: OptionsKey[],
    formInfo?: {
        formName: string,
        validatorRequered: boolean,
        validatorEmail?: boolean,
    }
}

export interface SectionInput {
    sectionName: string,
    inputControl: InputControl
}