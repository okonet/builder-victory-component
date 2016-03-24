/**
 * Client tests
 */
import React from "react";
// See Enzyme API documentation for all supported rendering modes and test methods:
// https://github.com/airbnb/enzyme/tree/master/docs/api
import { shallow, mount } from "enzyme";

import Component from "src/components/<%= packageName %>";

describe("components/<%= packageName %>", () => {

  it("has expected content with deep render", () => {
    // The Enzyme `mount` function does a deep render and mounts the component in the DOM.
    // https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
    const wrapper = mount(<Component />);
    const divNode = wrapper.find("div");

    // See chai-enzyme documentation for all available assertions:
    // https://github.com/producthunt/chai-enzyme
    expect(divNode).to.have.text("Edit me!");
  });

  it("has expected content with shallow render", () => {
    // The Enzyme `shallow` function does a shallow render on just the current component
    // without using the actual DOM.
    // https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
    const wrapper = shallow(<Component />);
    const divNode = wrapper.find("div");

    expect(divNode).to.have.text("Edit me!");
  });
});
