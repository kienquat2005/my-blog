import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import RouterManager from "./layout/routerManager/routerManager";
function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <BrowserRouter basename={process.env.PUBLIC_URL} >
            <RouterManager />
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
