
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import RouteComponent from "./Component/RouteComponent"
import store from "./redux/index";

function App() {
  return (
    <>
      <BrowserRouter>
            <Provider store={store}>
                  <RouteComponent />
                  <Toaster />
            </Provider>
        </BrowserRouter>
      </>   
  );
}

export default App;
