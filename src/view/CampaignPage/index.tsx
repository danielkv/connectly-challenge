import { Form, Formik } from 'formik'

import { Campaign } from '../../common/models/campaign'
import { saveCampaignUseCase } from '../../domain/useCases/saveCampaign'
import Preview from './Preview'
import Sidebar from './Sidebar'
import { IForm, formSchema, initialValues } from './schema'
import styles from './styles.module.scss'

const CampaignPage: React.FC = () => {
    const onSubmit = async (fields: IForm) => {
        try {
            const result: Campaign = {
                body: fields.body,
                image: fields.headerEnabled ? fields.image : null,
                footer: fields.footerEnabled ? fields.footer : '',
                buttons: fields.buttonsEnabled ? fields.buttons : [],
            }

            await saveCampaignUseCase(result)
        } catch (err) {
            alert((err as Error).message)
        }
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
