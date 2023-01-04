import "./ErrorModal.css";
import { CSSTransition } from "react-transition-group";

const ErrorModal = (props) => {
  return (
    <>
      {props.error && <div className="backdrop" onClick={props.onClear}></div>}
      <CSSTransition
        in={props.error}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <div className="modal">
          <header>
            <h2>An Error Occurred!</h2>
          </header>
          <div>
            <p>{props.error}</p>
          </div>
          <footer>
            <button onClick={props.onClear}>Okay</button>
          </footer>
        </div>
      </CSSTransition>
    </>
  );
};

export default ErrorModal;
