import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layouts from "./layouts";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Layouts />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
