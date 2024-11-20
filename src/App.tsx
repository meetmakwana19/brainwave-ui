import "./App.css";
import "@contentstack/venus-components/build/main.css";
import Layout from "./Layout";
import { IMicroAppsObj } from "./types/microAppObj";

interface IApp {
  microAppsObj: IMicroAppsObj;
}

const App: React.FC<IApp> = (props) => {
  return (
    <>
      <Layout microAppsObj={props.microAppsObj} />
    </>
  );
};

export default App;
