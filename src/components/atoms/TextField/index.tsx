/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputAdornment, TextField as MuiTextField, TextFieldProps, Typography, styled } from '@mui/material'

type TextFieldWidthCountProps = TextFieldProps & {
    maxLength?: number
}

const CustomizedTextField = styled(MuiTextField)(() => ({
    '.MuiInputBase-root': {
        borderRadius: 10,
    },
}))

const TextField: React.FC<TextFieldWidthCountProps> = (props) => {
    const count = props.value ? String(props.value).length : 0

    const handleChange: React.MouseEventHandler<HTMLInputElement> = (event) => {
        if (props.maxLength && (event.target as any).value.length > props.maxLength) return

        props.onChange?.(event as any)
    }

    return (
        <Box position="relative" width="100%">
            <CustomizedTextField
                {...props}
                onClick={handleChange}
                inputProps={{ maxLength: props.maxLength || undefined }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Typography
                                style={{
                                    position: props.multiline ? 'absolute' : 'inherit',
                                    bottom: 10,
                                    right: 10,
                                    fontSize: 14,
                                }}
                            >
                                {count}/{props.maxLength}
                            </Typography>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}

export default TextField
