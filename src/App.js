import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from './layout/homePage/header/header';
import Footer from './layout/homePage/footer/footer';
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import RouterManager from "./layout/routerManager/routerManager";
function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <HashRouter>
            <Header />
            <RouterManager />
            <Footer />
          </HashRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
