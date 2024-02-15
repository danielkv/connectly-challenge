import * as yup from 'yup'

export interface IFormFields {
    image: File | null
    body: string
    footer: string
    buttons: string[]
}

export interface IForm extends IFormFields {
    buttonsEnabled: boolean
    footerEnabled: boolean
    headerEnabled: boolean
}

export const initialValues: IForm = {
    image: null,
    body: '',
    footer: '',
    buttons: [],
    headerEnabled: true,
    footerEnabled: false,
    buttonsEnabled: false,
}

export const formSchema = yup.object().shape({
    body: yup.string().required('Body is required'),
    footer: yup.string().notRequired(),
    buttons: yup.array().of(yup.string().notRequired()),
})
