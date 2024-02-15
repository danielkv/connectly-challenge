import { useCallback, useEffect, useRef, useState } from 'react'

import { useFormikContext } from 'formik'

import { Add, CenterFocusStrong, Info, Message, Remove, Send } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Card, Chip, Divider, Stack, Typography, styled } from '@mui/material'

import arrow from '../../../assets/arrow.svg'
import { IForm } from '../schema'

const ZoomButton = styled(Button)({
    backgroundColor: 'white',
    border: 'none',
    padding: 0,
    paddingTop: 6,
    paddingBottom: 6,
    color: 'gray',
    fontSize: 20,

    boxShadow: '0px 2px 6px 0px #0000002E',
    '&.MuiButtonGroup-grouped': {
        minWidth: 32,
    },
    '&.MuiButton-root': {
        minWidth: 32,
    },
    '&:hover': {
        border: 'none',
        backgroundColor: '#f5f5f5',
    },
})

const SCALE_THRESHOLD = 0.2

const Preview: React.FC = () => {
    const { values } = useFormikContext<IForm>()

    const cardRef = useRef<HTMLDivElement>(null)

    const [zoom, setZoom] = useState(1)
    const [helpersHidden, setHelpersHidden] = useState(false)
    const [offsetLeft, setOffsetLeft] = useState(0)

    const handleOffsetLeft = useCallback(() => {
        const newOffsetLeft = cardRef.current
            ? cardRef.current.offsetLeft - (cardRef.current.offsetWidth * zoom) / 2
            : 0

        setOffsetLeft(newOffsetLeft)
    }, [zoom])

    useEffect(() => {
        handleOffsetLeft()
    }, [handleOffsetLeft, zoom])

    useEffect(() => {
        window.addEventListener('resize', () => handleOffsetLeft())

        return () => {
            window.removeEventListener('resize', () => handleOffsetLeft())
        }
    }, [handleOffsetLeft])

    const imagePreview = values.image ? URL.createObjectURL(values.image) : null

    return (
        <Stack height="100%" alignItems="center" justifyContent="center" position="relative" overflow="hidden">
            <Stack gap={2} position="absolute" width={32} left={30} bottom={30}>
                <ZoomButton onClick={() => setHelpersHidden((current) => !current)}>
                    <Info fontSize="inherit" />
                </ZoomButton>
                <ZoomButton disabled={zoom === 1} onClick={() => setZoom(1)}>
                    <CenterFocusStrong fontSize="inherit" />
                </ZoomButton>
                <ButtonGroup orientation="vertical">
                    <ZoomButton onClick={() => setZoom((current) => current + SCALE_THRESHOLD)}>
                        <Add fontSize="inherit" />
                    </ZoomButton>
                    <ZoomButton onClick={() => setZoom((current) => current - SCALE_THRESHOLD)}>
                        <Remove fontSize="inherit" />
                    </ZoomButton>
                </ButtonGroup>
            </Stack>
            <Box
                bgcolor="#212121"
                color="white"
                textAlign="center"
                padding={4}
                borderRadius={20}
                position="absolute"
                zIndex={999}
                left={offsetLeft - 80}
                style={{ transition: 'all .1s' }}
            >
                <Send />
                <Typography>Campaign Starts</Typography>
                <img src={arrow} style={{ position: 'absolute', right: -45, top: '50%', marginTop: -8 }} />
            </Box>
            <Card ref={cardRef} style={{ transform: `scale(${zoom})`, transition: 'all .1s' }}>
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
                                        {!helpersHidden && (
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
                                        )}
                                        <img src={imagePreview} style={{ maxWidth: '100%', borderRadius: 8 }}></img>
                                        {!helpersHidden && (
                                            <Divider
                                                style={{
                                                    borderColor: '#41C352',
                                                    borderStyle: 'dashed',
                                                    margin: '8px 0',
                                                }}
                                            />
                                        )}
                                    </Box>
                                )}
                                {!helpersHidden && (
                                    <Chip
                                        label="Body message"
                                        style={{ borderRadius: 4, color: '#41C352', backgroundColor: '#F5F5F5' }}
                                    />
                                )}

                                <Typography fontSize={14} fontWeight={400}>
                                    {values.body}
                                </Typography>

                                {values.footerEnabled && !!values.footer && (
                                    <>
                                        {!helpersHidden && (
                                            <>
                                                {' '}
                                                <Divider
                                                    style={{
                                                        borderColor: '#41C352',
                                                        borderStyle: 'dashed',
                                                        margin: '8px 0',
                                                    }}
                                                />
                                                <Chip
                                                    label="Footer"
                                                    style={{
                                                        borderRadius: 4,
                                                        color: '#41C352',
                                                        backgroundColor: '#F5F5F5',
                                                    }}
                                                />
                                            </>
                                        )}
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
