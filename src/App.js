import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentExamList from "./StudentExamList";

export default class App extends Component {
  render() {
    return (
      <div>
        <StudentExamList />
        {/*   <TakeExam
          exam_name={"7boly"}
          view={true}
          token={"8a747b9ad8b7fb01d30c0ae0033e7951bb7ae939"}
        />*/}
      </div>
    );
  }
}
