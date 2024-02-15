import { useFormikContext } from 'formik'

import { Message } from '@mui/icons-material'
import { Box, Card, Chip, Divider, Stack, Typography } from '@mui/material'

import { IForm } from '../schema'

const Preview: React.FC = () => {
    const { values } = useFormikContext<IForm>()

    const imagePreview = values.image ? URL.createObjectURL(values.image) : null

    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Card>
                <Stack p={2} width={304} boxSizing="border-box" gap={2}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Stack
                            bgcolor="#7986CB"
                            borderRadius={30}
                            alignItems="center"
                            justifyContent="center"
                            width={32}
                            height={32}
                            color="white"
                        >
                            <Message fontSize="small" />
                        </Stack>
                        <Typography fontSize={16} fontWeight="bold">
                            Message example
                        </Typography>
                    </Stack>
                    <Stack gap={1} bgcolor="#F5F5F5" borderRadius={2} padding={3}>
                        <Card>
                            <Box padding={1}>
                                {values.headerEnabled && !!imagePreview && (
                                    <Box position="relative">
                                        <Chip
                                            label="Header"
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                                borderRadius: 4,
                                                color: '#41C352',
                                                backgroundColor: '#F5F5F5',
                                            }}
                                        />
                                        <img src={imagePreview} style={{ maxWidth: '100%', borderRadius: 8 }}></img>
                                        <Divider
                                            style={{ borderColor: '#41C352', borderStyle: 'dashed', margin: '8px 0' }}
                                        />
                                    </Box>
                                )}
                                <Chip
                                    label="Body message"
                                    style={{ borderRadius: 4, color: '#41C352', backgroundColor: '#F5F5F5' }}
                                />

                                <Typography fontSize={14} fontWeight={400}>
                                    {values.body}
                                </Typography>

                                {values.footerEnabled && !!values.footer && (
                                    <>
                                        <Divider
                                            style={{ borderColor: '#41C352', borderStyle: 'dashed', margin: '8px 0' }}
                                        />
                                        <Chip
                                            label="Footer"
                                            style={{ borderRadius: 4, color: '#41C352', backgroundColor: '#F5F5F5' }}
                                        />
                                        <Typography fontSize={14} fontWeight={400} color="#999">
                                            {values.footer}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Card>
                        {values.buttonsEnabled &&
                            values.buttons
                                .filter((item) => item)
                                .map((button) => (
                                    <Box
                                        bgcolor="white"
                                        textAlign="center"
                                        borderRadius={1}
                                        boxShadow=" 0px 1px 1px 0px #00000033"
                                        py="5px"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Typography color="#007DFF" fontSize={14} fontWeight={400}>
                                            {button}
                                        </Typography>
                                    </Box>
                                ))}
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    )
}

export default Preview
