import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-title">
        <hr className="left-line" />
        <h1>pomodoro clock</h1>
        <hr className="right-line" />
      </div>
      
      <div className="timer-length-btns">
        <div className="break-length">
          <span>break length</span>
          <div className="increment-decrement-btns">
            <button>-</button>
            <div className="length-display">5</div>
            <button>+</button>
          </div>
        </div>

        <div className="session-length">
          <span>session length</span>
          <div className="increment-decrement-btns">
            <button>-</button>
            <div className="length-display">5</div>
            <button>+</button>
          </div>
        </div>
      </div>

      <div className="timer">
        <span className="timer-title">session</span>
        <span className="timer-countdown">24:56</span>
      </div>

      <div className="stop-reset-btns">
        <button>stop</button>
        <button>reset</button>
      </div>

      <span className="dev-info">Designed and coded by <a href="https://www.linkedin.com/in/levis-mbui/" target="_blank">Levis Mbui</a></span>
    </div>
  );
}

export default App;
