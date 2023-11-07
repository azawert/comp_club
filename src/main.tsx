import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import './index.css'
import './shared/config/i18n/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>
)
