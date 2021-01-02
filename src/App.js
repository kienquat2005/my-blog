import React from "react";
import "./App.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import RouterManager from "./layout/routerManager/routerManager";
function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <HashRouter>
            <RouterManager />
          </HashRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
