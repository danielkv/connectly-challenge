import * as yup from 'yup'

export interface IForm {
    image: File | null
    body: string
    footer: string
    buttons: string[]
}

export const initialValues: IForm = {
    image: null,
    body: '',
    footer: '',
    buttons: [],
}

export const formSchema = yup.object().shape({
    //image: yup.string().notRequired(),
    body: yup.string().required('Body is required'),
    footer: yup.string().notRequired(),
    buttons: yup.array().of(yup.string().notRequired()),
})
