import './App.css';
import MyRoute from './routes/MyRoute';
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';
// import Header from './components/Header/Header';

function App() {

  const { login, logout, token, userId, isReady, name } = useAuth()
  const isLogin = !!token

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin, name }}>
      <BrowserRouter>
        <div className="App">
          <MyRoute isLogin={isLogin} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
