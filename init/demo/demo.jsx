import React from "react";
import {<%= componentName %>} from "../src/index";

class Demo extends React.Component {
  render() {
    return (
      <div className="demo">
        <<%= componentName %> />
      </div>
    );
  }
}

export default Demo;
