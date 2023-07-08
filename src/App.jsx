import DisplaySection from "./Components/DisplaySection";
import Jumbotron from "./Components/Jumbotron";
import Nav from "./Components/Nav";
import SoundSection from "./Components/SoundSection";
import WebgiViewer from "./Components/WebgiViewer";

function App() {

  return (
    <div className="App">
      <Nav/>
      <Jumbotron/>
      <SoundSection/>
      <DisplaySection/>
      <WebgiViewer/>
    </div>
  );
}

export default App;
