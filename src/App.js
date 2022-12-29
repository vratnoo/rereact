import logo from './logo.svg';
import './App.css';
function Dummy({name}){
  return(<>
  <h2>{name}</h2>
  </>)
}
function App() {
  return (
   <div>
    <h1>
      Ratnoo is working
    </h1>
    <Dummy name={"vikram ratnoo"}/>
   </div>    
  );
}

export default App;
