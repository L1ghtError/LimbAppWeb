import './drawerMenuStyles.css';
import PageOption from './page-option/PageOption';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDrawerState } from '../../../store/UiSlice';
import { setDrawerState } from '../../../store/UiSlice';

function DrawerMenu() {
  const drawerState = useSelector(selectDrawerState);
  const dispatch = useDispatch();
  const handleBackdropClick = (val) => {
    dispatch(setDrawerState(val));
  };

  const escHandle = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        dispatch(setDrawerState(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener('keydown', escHandle, false);

    return () => {
      document.removeEventListener('keydown', escHandle, false);
    };
  }, [escHandle]);

  return drawerState == true ? (
    <>
      <div id="backdrop" onClick={() => handleBackdropClick(false)} autoFocus></div>
      <div id="drawerMenu">
        <div id="internalDrawer">
          <PageOption placeholder="Main"></PageOption>
          <PageOption placeholder="Profile"></PageOption>
          <PageOption placeholder="Settings"></PageOption>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default DrawerMenu;
