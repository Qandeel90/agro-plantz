import * as React from "react";
import { View } from "react-native";
import RootNavigation from "./navigation";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./Redux/store";

import Auth from "./Context/store/Auth";

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <RootNavigation></RootNavigation>
      </Provider>
    </Auth>
  );
}
