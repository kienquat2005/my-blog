import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import RouterManager from "./layout/routerManager/routerManager";
function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <Router>
            <RouterManager />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
