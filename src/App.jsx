import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Router } from "./routes/Router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
