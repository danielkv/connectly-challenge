import { Form, Formik } from 'formik'

import Sidebar from './Sidebar'
import { IForm, formSchema, initialValues } from './schema'
import styles from './styles.module.scss'

const CampaignPage: React.FC = () => {
    const onSubmit = (fields: IForm) => {
        console.log(fields)
    }

    return (
        <div className={styles.contentWrapper}>
            <Formik<IForm> initialValues={initialValues} onSubmit={onSubmit} validationSchema={formSchema}>
                {() => (
                    <Form>
                        <div className={styles.sidebar}>
                            <Sidebar />
                        </div>
                        <div className={styles.preview}></div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CampaignPage
