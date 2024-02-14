import { Campaign, Dashboard, ModeComment, Person, Settings } from '@mui/icons-material'
import { Box, Stack } from '@mui/material'

import ConnectlyLogo from '../../../assets/connectly-logo.svg'
import AppNavigationButton from '../../atoms/AppNavigationButton'

const AppNavigation: React.FC = () => {
    return (
        <Box bgcolor="#20232A" height="100vh">
            <Stack pt={4} justifyContent="space-between" boxSizing="border-box" height="100%">
                <Box>
                    <Box mb={3} textAlign="center">
                        <img style={{ width: 26 }} src={ConnectlyLogo} title="Connectly" />
                    </Box>
                    <Box borderTop="1px solid #616161" borderBottom="1px solid #616161">
                        <AppNavigationButton Icon={<Person />} title="Profile" />
                    </Box>
                    <AppNavigationButton Icon={<Dashboard />} title="Dashboard" />
                    <AppNavigationButton Icon={<ModeComment />} title="Comments" />
                    <AppNavigationButton selected Icon={<Campaign />} title="Campaign" />
                </Box>

                <AppNavigationButton Icon={<Settings />} title="Settings" />
            </Stack>
        </Box>
    )
}

export default AppNavigation
