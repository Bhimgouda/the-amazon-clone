import Header from "./components/Header";
import Banner from "./components/Banner";

function App() {
  return (
    <div style={{"backgroundColor":"#f3f4f6"}}>
       {/* Header */}
       <Header/>

       <main className="main">
       {/* Banner */}
          <Banner/>
       </main>
    </div>
  )
}

export default App;
