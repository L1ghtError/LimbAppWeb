import './appHeaderStyles.css';
import drawerIcon from '../../assets/settingButtonIcon.svg';
import { useDispatch } from 'react-redux';
import { setDrawerState } from '../../store/UiSlice';
function AppHeader() {
  const dispatch = useDispatch();
  const handleOpenDrawer = (val) => {
    dispatch(setDrawerState(val));
  };
  return (
    <div id="appHeader">
      <div id="optionsWrapper">
        <button id="toggleDrawer" onClick={() => handleOpenDrawer(true)} aria-label="Open Drawer">
          <img draggable="false" className="drawerIcon" src={drawerIcon} alt="Upload Icon" />
        </button>
      </div>
    </div>
  );
}

export default AppHeader;
