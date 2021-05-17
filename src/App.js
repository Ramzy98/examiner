import React, { Component } from "react";
import CreateExam from "./CreateExam";
import Exam from "./Exam";
/*import CreateExam from "./CreateExam";*/
import ListExams from "./ListExams";
export default class App extends Component {
  render() {
    return (
      <div>
        <CreateExam token={"b9bb864dbd489d8b714a2211cc32aa78697a6adb"} />
      </div>
    );
  }
}
