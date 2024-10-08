import {AppRouter} from './routers'
import { AuthProvider } from './context';

function App() {

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
