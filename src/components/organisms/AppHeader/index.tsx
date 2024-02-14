import { Close, Highlight } from '@mui/icons-material'
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'

import styles from './styles.module.scss'

const AppHeader: React.FC = () => {
    return (
        <Box className={styles.appHeader}>
            <Typography variant="h1" fontSize={16} fontWeight="bold">
                Create a Campaign
            </Typography>

            <Stack direction="row" gap={4} alignItems="center">
                <Chip
                    label="Tips"
                    color="info"
                    variant="filled"
                    icon={<Highlight />}
                    style={{ background: '#F6F8FF', color: '#007DFF', fontSize: 14, height: 40, borderRadius: '30px' }}
                    onClick={() => {}}
                />
                <IconButton color="info" style={{ width: 40, height: 40, background: '#F5F5F5' }}>
                    <Close />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default AppHeader
