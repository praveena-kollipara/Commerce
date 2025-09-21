
import './App.css';
import './index.css'
import MainMenu from "../src/common/MainMenu/MainMenu"
import NavTabs from './common/MainMenu/NavTabs';


const App: React.FC = () => {
    return (
        <div>
            <MainMenu />
            <NavTabs/>
            <h1>Hello</h1>
        </div>
    );
};


export default App;