import './App.css';
import ScrollTop from './components/ScrollTop';
import CustomizedSelects from './components/CustomizedSelects';
import InteractiveList from './components/InteractiveList';

function App() {

  return (
    <div>
      <ScrollTop />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CustomizedSelects />
      <InteractiveList />
    </div>

      
    </div>


  );
}

export default App;
