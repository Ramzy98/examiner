import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateExam from "./CreateExam";

export default class App extends Component {
  render() {
    return (
      <div>
        <CreateExam
          view={true}
          token={"8a747b9ad8b7fb01d30c0ae0033e7951bb7ae939"}
        />
      </div>
    );
  }
}
