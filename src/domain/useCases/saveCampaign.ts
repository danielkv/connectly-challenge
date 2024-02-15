import { Campaign } from '../../common/models/campaign'

export function saveCampaignUseCase(campaign: Campaign) {
    // The links for the templates weren't available so I created a Promise to simulate the backend request

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(campaign)
            resolve(true)
        }, 1000)
    })
}
