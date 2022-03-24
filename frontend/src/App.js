import AppRouter from './routers/AppRouter';
import './tailwind.css';


import { ToastProvider} from 'react-toast-notifications';
import {Web3Provider} from './context/Web3Context'
import {TokenProvider} from './context/TokenContext'
function App() {



  return (
    <>
    <Web3Provider>
    <TokenProvider>
      <ToastProvider autoDismiss={true}>
      
        <AppRouter/>
        
        </ToastProvider>
        </TokenProvider>
    
      </Web3Provider>
    </>
  );
}

export default App;

