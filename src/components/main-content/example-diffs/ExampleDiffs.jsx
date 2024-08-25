import './exampleDiffsStyles.css';
import exampleBefore from '../../../assets/alter-before.png';
import exampleAfter from '../../../assets/alter-after.png';

function ExampleDiffs() {
  return (
    <div id="cardWrapper">
      <div id="exampleCard">
        <div className="examplePart" id="exampleBefore">
          <h4 className="hintText" id="hintBefore">
            BEFORE
          </h4>
          <img
            onDragStart={() => {
              return false;
            }}
            src={exampleBefore}
            className="examplePicture"
            id="pictureBefore"
            alt="PICTURE"></img>
        </div>
        <div id="examplesSeparator"></div>
        <div className="examplePart" id="exampleAfter">
          <img
            onDragStart={() => {
              return false;
            }}
            src={exampleAfter}
            className="examplePicture"
            id="pictureAfter"
            alt="PICTURE"></img>
          <h4 className="hintText" id="hintAfter">
            AFTER
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ExampleDiffs;
