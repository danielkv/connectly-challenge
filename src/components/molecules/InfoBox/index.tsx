import React, { PropsWithChildren, useState } from 'react'

import { Close } from '@mui/icons-material'
import { Box, Collapse, IconButton, Link, Stack, Typography } from '@mui/material'

interface InfoBoxProps {
    Icon: React.ReactElement
    title: string

    learnMoreUrl?: string
}

const InfoBox: React.FC<PropsWithChildren<InfoBoxProps>> = ({
    Icon,
    title,

    learnMoreUrl,
    children,
}) => {
    const [closed, setClosed] = useState(false)

    return (
        <Collapse in={!closed}>
            <Box px={2} pt={1} pb={2} bgcolor="#F5F5F5" borderRadius={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center">
                        <Box color="gray">{Icon}</Box>
                        <Typography fontSize={14} fontWeight="bold">
                            {title}
                        </Typography>
                    </Stack>
                    <IconButton
                        onClick={() => {
                            setClosed(true)
                        }}
                    >
                        {<Close />}
                    </IconButton>
                </Stack>

                <Typography component="p" fontSize={12} color="#0000008A">
                    {children}
                </Typography>
                {!!learnMoreUrl && (
                    <Link href={learnMoreUrl} underline="none">
                        <Typography fontSize={12}>Learn More</Typography>
                    </Link>
                )}
            </Box>
        </Collapse>
    )
}
export default InfoBox
