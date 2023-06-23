import './App.css';
import TimelinePage from './pages/TimelinePage'

import MockAPI from "./Api/MockAPI";

function App() {
  const mockAPI = new MockAPI();


    return <TimelinePage dataComponent={mockAPI} />;
  
}

export default App;
