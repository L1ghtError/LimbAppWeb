import AppHeader from './components/app-header/AppHeader';
import MainContent from './components/main-content/MainContent';
import DrawerMenu from './components/main-content/drawer-menu/DrawerMenu';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserInfo } from './store/UserSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="appBackground"></div>
      <AppHeader></AppHeader>
      <DrawerMenu></DrawerMenu>
      <MainContent></MainContent>
    </>
  );
}

export default App;
