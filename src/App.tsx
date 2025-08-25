import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <h1>pomodoro clock</h1>
      <div className="timer-length-btns">
        <div className="break-length">
          <span>break length</span>
          <div>
            <button>-</button>
            <div>5</div>
            <button>+</button>
          </div>
        </div>

        <div className="session-length">
          <span>break length</span>
          <div>
            <button>-</button>
            <div>5</div>
            <button>+</button>
          </div>
        </div>
      </div>

      <div>
        <span>session</span>
        <span>24:56</span>
      </div>

      <div>
        <button>stop</button>
        <button>reset</button>
      </div>

      <span>Designed and coded by <a href="https://www.linkedin.com/in/levis-mbui/">Levis Mbui</a></span>
    </div>
  );
}

export default App;
