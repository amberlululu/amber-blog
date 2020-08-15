import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import Message from "./Message";

import { BrowserRouter } from "react-router-dom";

describe("Message", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Message username="Amber" message="How are you" />
      </BrowserRouter>
    );
  });

  it("should render an p element containing the username ", () => {
    expect(wrapper.find("strong").text()).toBe(" Amber: ");
  });

  it("should render an p element containing the message", () => {
    expect(wrapper.find("p").text()).toBe(" Amber: How are you");
  });
});
