import React, { Component } from "react";
import AddStudent from "./AddStudent";
import CreateExam from "./CreateExam";
export default class App extends Component {
  render() {
    return (
      <div>
        <CreateExam />
        <AddStudent />
      </div>
    );
  }
}
