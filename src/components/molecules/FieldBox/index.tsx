import React, { PropsWithChildren } from 'react'

import { Error } from '@mui/icons-material'
import { Box, Chip, Collapse, Paper, Stack, Switch, Tooltip, Typography } from '@mui/material'

interface FieldBoxProps {
    title: string
    Icon?: React.ReactElement
    required?: boolean
    enabled?: boolean
    info?: string
    onChangeEnable?: (checked: boolean) => void
}

const FieldBox: React.FC<PropsWithChildren<FieldBoxProps>> = ({
    title,
    required,
    children,
    info,
    Icon,
    enabled,
    onChangeEnable,
}) => {
    return (
        <Paper style={{ boxShadow: 'none', border: '1px solid #0000001F', borderRadius: 10 }}>
            <Box px={3} py={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                        {Icon && <Box color="gray">{Icon}</Box>}
                        <Typography fontSize={14} fontWeight="bold" variant="h5">
                            {title}
                        </Typography>
                        {info && (
                            <Tooltip title={info}>
                                <Error fontSize="small" color="disabled" />
                            </Tooltip>
                        )}
                        {required && (
                            <Chip label="REQUIRED" style={{ borderRadius: 4, fontSize: 12, fontWeight: 'bold' }} />
                        )}
                    </Stack>
                    {!required && <Switch value={enabled} onChange={(_, checked) => onChangeEnable?.(checked)} />}
                </Stack>
            </Box>
            <Collapse in={enabled || required}>
                <Box px={3} pb={2}>
                    {children}
                </Box>
            </Collapse>
        </Paper>
    )
}

export default FieldBox
