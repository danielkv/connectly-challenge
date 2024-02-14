import './App.scss'
import AppHeader from './components/organisms/AppHeader'
import AppNavigation from './components/organisms/AppNavigation'

function App() {
    return (
        <>
            <nav id="app-navigation">
                <AppNavigation />
            </nav>
            <div id="app-header">
                <AppHeader />
            </div>
            <main id="app-main"></main>
        </>
    )
}

export default App
