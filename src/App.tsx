import './App.scss'
import AppHeader from './components/organisms/AppHeader'
import AppNavigation from './components/organisms/AppNavigation'
import CampaignPage from './view/CampaignPage'

function App() {
    return (
        <>
            <main id="app-main">
                <CampaignPage />
            </main>
            <nav id="app-navigation">
                <AppNavigation />
            </nav>
            <div id="app-header">
                <AppHeader />
            </div>
        </>
    )
}

export default App
