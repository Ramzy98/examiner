import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";
import TakeExam from "./TakeExam";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class StudentExamList extends Component {
  state = {
    exams: [],
    exam_name: "",
    exam_id: 0,
    exam_duration: 0,
    exam_startdate: "",
    clicked: false,
  };
  componentDidMount() {
    axios
      .get(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/student/dashboard/`,
        {
          headers: {
            Authorization: "Token bd3e907d14538ba241743820efb221164ae9fcdd",
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, exams: res.data });
      });
  }
  goBack = () => {
    this.setState({ ...this.state, clicked: false });
  };
  formatDate = (exam_starttime) => {
    let examStartTime = new Date(exam_starttime);
    var date =
      examStartTime.getFullYear() +
      "-" +
      (examStartTime.getMonth() + 1) +
      "-" +
      examStartTime.getDate();

    return date;
  };
  formatTime = (exam_starttime) => {
    let examStartTime = new Date(exam_starttime);
    var time =
      examStartTime.getHours() +
      ":" +
      examStartTime.getMinutes().toString().padStart(2, "0");
    return time;
  };
  render() {
    return !this.state.clicked ? (
      this.state.exams.length > 0 ? (
        <div style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Exam name</th>
                <th>Start date</th> <th>Start Time</th>
                <th>Duration</th>
                <th>Exam status</th>
                <th>Mark</th>
                <th>Full Mark</th>
              </tr>
            </thead>
            <tbody>
              {this.state.exams.map((key) => {
                return (
                  <tr key={key.exam_id}>
                    <td
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          exam_name: key.exam_name,
                          exam_id: key.exam_id,
                          exam_duration: "2",
                          exam_startdate: key.exam_startdate,
                          clicked: true,
                        })
                      }
                    >
                      <Button style={{ color: "blue" }}>{key.exam_name}</Button>{" "}
                    </td>
                    <td>{this.formatDate(key.exam_startdate)}</td>
                    <td>{this.formatTime(key.exam_startdate)}</td>
                    <td>{key.exam_duration}</td>
                    <td>
                      {key.is_started === "The Exam is Closed"
                        ? "Exam ended"
                        : "Exam didn't start yet"}
                    </td>
                    <td>
                      {key.is_started === "The Exam is Closed"
                        ? key.student_mark
                        : "-"}
                    </td>{" "}
                    <td>{key.full_mark}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <LinearProgress />
        </div>
      )
    ) : (
      <div>
        {console.log("here")}
        <TakeExam
          exam_id={this.state.exam_id}
          exam_name={this.state.exam_name}
          exam_startdate={this.state.exam_startdate}
          exam_duration={this.state.exam_duration}
          goBack={this.goBack}
        />
      </div>
    );
  }
}
