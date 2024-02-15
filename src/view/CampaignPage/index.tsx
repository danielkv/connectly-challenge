import { Form, Formik } from 'formik'

import Preview from './Preview'
import Sidebar from './Sidebar'
import { IForm, IFormFields, formSchema, initialValues } from './schema'
import styles from './styles.module.scss'

const CampaignPage: React.FC = () => {
    const onSubmit = (fields: IForm) => {
        const result: IFormFields = {
            body: fields.body,
            image: fields.headerEnabled ? fields.image : null,
            footer: fields.footerEnabled ? fields.footer : '',
            buttons: fields.buttonsEnabled ? fields.buttons : [],
        }
        console.log(result)
    }

    return (
        <div className={styles.contentWrapper}>
            <Formik<IForm> initialValues={initialValues} onSubmit={onSubmit} validationSchema={formSchema}>
                {() => (
                    <Form style={{ display: 'contents' }}>
                        <div className={styles.sidebar}>
                            <Sidebar />
                        </div>
                        <div className={styles.preview}>
                            <Preview />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CampaignPage
