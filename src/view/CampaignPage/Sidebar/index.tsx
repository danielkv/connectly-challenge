import { FieldArray, useFormikContext } from 'formik'

import {
    Close,
    Code,
    Delete,
    DeleteOutline,
    EmojiEmotions,
    FormatBold,
    FormatClear,
    FormatItalic,
    Highlight,
    Image,
    SmartButton,
    TextFields,
} from '@mui/icons-material'
import { Button, IconButton, Stack, Typography } from '@mui/material'

import TextField from '../../../components/atoms/TextField'
import FieldBox from '../../../components/molecules/FieldBox'
import InfoBox from '../../../components/molecules/InfoBox'
import { IForm } from '../schema'

const Sidebar: React.FC = () => {
    const { values, handleChange, setFieldValue } = useFormikContext<IForm>()

    const imagePreview = values.image ? URL.createObjectURL(values.image) : null

    return (
        <>
            <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontSize={24} variant="h3">
                    Edit Message
                </Typography>
                <IconButton>
                    <Close />
                </IconButton>
            </Stack>
            <Stack gap={3}>
                <FieldBox title="Header" info="Header" enabled Icon={<Image />}>
                    <Stack gap={1} alignItems="flex-start">
                        <Typography variant="caption">Image size recommendation: 800 x 418 pixel.</Typography>
                        <Button component="label" role={undefined} variant="outlined" tabIndex={-1}>
                            UPLOAD IMAGE
                            <input
                                accept="image/*"
                                hidden
                                type="file"
                                onChange={(event) =>
                                    setFieldValue('image', Object.values(event.target.files as FileList)[0])
                                }
                            />
                        </Button>
                        {!!imagePreview && (
                            <>
                                <img src={imagePreview} style={{ maxWidth: '100%' }} />
                                <Button fullWidth startIcon={<Delete />} onClick={() => setFieldValue('image', null)}>
                                    Remove image
                                </Button>
                            </>
                        )}
                        <InfoBox learnMoreUrl="#" title="Image header tips" Icon={<Highlight />}>
                            Images can enrich the message experience and help maintain engagement. Use eye-catching
                            images that summarize the message (eg discounts, gifts etc.)
                        </InfoBox>
                    </Stack>
                </FieldBox>
                <FieldBox title="Body message" required info="Body message" Icon={<TextFields />}>
                    <Stack gap={1} alignItems="flex-start">
                        <TextField
                            value={values.body}
                            onChange={handleChange('body')}
                            multiline
                            maxLength={1024}
                            maxRows={8}
                            minRows={8}
                            fullWidth
                        />

                        <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
                            <Button size="small">ADD VARIABLE</Button>
                            <Stack direction="row" alignItems="center">
                                <IconButton size="small">
                                    <EmojiEmotions fontSize="inherit" />
                                </IconButton>
                                <IconButton size="small">
                                    <FormatBold fontSize="inherit" />
                                </IconButton>
                                <IconButton size="small">
                                    <FormatClear fontSize="inherit" />
                                </IconButton>
                                <IconButton size="small">
                                    <FormatItalic fontSize="inherit" />
                                </IconButton>
                                <IconButton size="small">
                                    <Code fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        </Stack>

                        <InfoBox learnMoreUrl="#" title="What are variables?" Icon={<Highlight />}>
                            Variables are dynamic content that help personalize your campaign, for example: customer
                            names or coupon codes.
                        </InfoBox>
                    </Stack>
                </FieldBox>
                <FieldBox
                    title="Footer text"
                    enabled
                    onChangeEnable={() => {}}
                    info="Footer text"
                    Icon={<TextFields />}
                >
                    <Stack gap={1} alignItems="flex-start">
                        <TextField
                            value={values.footer}
                            onChange={handleChange('footer')}
                            multiline
                            maxLength={500}
                            maxRows={8}
                            minRows={8}
                            fullWidth
                        />
                    </Stack>
                </FieldBox>

                <FieldBox title="Buttons" enabled onChangeEnable={() => {}} info="Buttons" Icon={<SmartButton />}>
                    <Stack gap={1} alignItems="flex-start">
                        <FieldArray name="buttons">
                            {({ insert, remove }) => (
                                <>
                                    {values.buttons.map((button, index) => (
                                        <>
                                            <Stack
                                                width="100%"
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Typography fontWeight="bold" fontSize={14} component="label">
                                                    Button {index + 1}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        remove(index)
                                                    }}
                                                >
                                                    <DeleteOutline />
                                                </IconButton>
                                            </Stack>
                                            <TextField
                                                placeholder="Enter text"
                                                value={button}
                                                onChange={handleChange(`buttons.${index}`)}
                                                maxLength={25}
                                                fullWidth
                                            />
                                        </>
                                    ))}
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => insert(values.buttons.length, '')}
                                    >
                                        Add Button
                                    </Button>
                                </>
                            )}
                        </FieldArray>
                    </Stack>
                </FieldBox>

                <Stack gap={2}>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                    <Button variant="outlined">Delete</Button>
                </Stack>
            </Stack>
        </>
    )
}

export default Sidebar
