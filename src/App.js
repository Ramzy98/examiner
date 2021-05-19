import React, { Component } from "react";
import CreateExam from "./CreateExam";
import Exam from "./Exam";
/*import CreateExam from "./CreateExam";*/
import ListExams from "./ListExams";
import Question from "./Question";
export default class App extends Component {
  render() {
    return (
      <div>
        <ListExams token={"8a747b9ad8b7fb01d30c0ae0033e7951bb7ae939"} />
      </div>
    );
  }
}
