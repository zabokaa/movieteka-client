import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
/* The following line can be included in your src/index.js or App.js file */


const MovietekaApp = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MovietekaApp />);