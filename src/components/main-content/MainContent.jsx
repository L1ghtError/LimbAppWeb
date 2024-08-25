import './mainContentStyles.css';
import HeaderInfo from './header-info/HeaderInfo';
import InteractiveMenu from './interactive-menu/InteractiveMenu';
import ExampleDiffs from './example-diffs/ExampleDiffs';
function MainContent() {
  return (
    <div className="mainContent">
      <HeaderInfo className="appInfo"></HeaderInfo>
      <ExampleDiffs className="item3"></ExampleDiffs>
      <InteractiveMenu className="menuWrapper"></InteractiveMenu>
    </div>
  );
}

export default MainContent;
