import "./App.css";
import Hero from "./Components/Hero";
import Demo from "./Components/Demo";

const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
        </div>

        <div className="app">
            <Hero/>
            <Demo/>
        </div>
    </main>
  )
}

export default App;