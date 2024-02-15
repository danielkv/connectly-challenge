import { Campaign } from '../../common/models/campaign'

export function saveCampaignUseCase(campaign: Campaign) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(campaign)
            resolve(true)
        }, 1000)
    })
}
