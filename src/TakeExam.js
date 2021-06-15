import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import CountdownTimer from "./CountdownTimer";
import LinearProgress from "@material-ui/core/LinearProgress";
import StudentExam from "./StudentExam";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
var counter = 0;
var Answer = {};
var start = false;
var submitted = false;
var success = false;
export default class TakeExam extends Component {
  state = {
    exam_name: "",
    exam_starttime: "",
    exam_duration: 0,
    questions: [],
    checked: false,
    Answer: {},
    loading: false,
    submit: false,
  };

  handleStartExam = () => {
    start = true;
    this.setState({ ...this.state, loading: true }, () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/start/`,
          {
            headers: {
              Authorization: "Token bd3e907d14538ba241743820efb221164ae9fcdd",
            },
          }
        )
        .then((res) => {
          this.setState({
            exam_name: res.data.exam_name,
            exam_starttime: res.data.exam_starttime,
            exam_duration: res.data.exam_duration,
            questions: res.data.questions,
            loading: false,
          });
        });
    });
  };
  handleSubmit = () => {
    this.setState({ ...this.state, submit: true }, () => {
      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.props.exam_id}/submit/`,
          { student_answers: Answer },
          {
            headers: {
              Authorization: "Token bd3e907d14538ba241743820efb221164ae9fcdd",
            },
          }
        )
        .then(() => {
          submitted = true;
          success = true;
          this.setState({ ...this.state, submit: false });
        });
    });
  };
  handleAnswer = (idQ, idA) => {
    Object.assign(Answer, { [idQ]: idA });
  };
  render() {
    const handleTimerChange = (e) => {
      this.setState({
        checked: e.target.checked,
      });
    };
    let examStartTime = new Date(this.props.exam_startdate);
    var date =
      examStartTime.getFullYear() +
      "-" +
      (examStartTime.getMonth() + 1) +
      "-" +
      examStartTime.getDate();
    var time =
      examStartTime.getHours() +
      ":" +
      examStartTime.getMinutes().toString().padStart(2, "0");
    var dateTime = date + " " + time;

    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        <Button
          style={{ float: "left", marginLeft: 20, marginTop: 20 }}
          variant="outlined"
          size="small"
          onClick={this.props.goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        {this.props.exam_name !== "" ? (
          <div>
            {" "}
            <Jumbotron>
              <h1>{this.props.exam_name} Exam</h1>
              <p>
                Exam Duration: {this.props.exam_duration}h
                <br />
                {"   "} Exam Start Time: {dateTime.toString()}
              </p>
              <p>
                Show exam countdown timer{" "}
                <Switch
                  disabled={!start}
                  checked={this.state.checked}
                  onChange={handleTimerChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </p>
              <p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.handleStartExam}
                  startIcon={
                    this.state.loading ? (
                      <CircularProgress size={20} color="secondary" />
                    ) : (
                      <div></div>
                    )
                  }
                  disabled={this.state.loading || start}
                >
                  Start Exam
                </Button>
              </p>
            </Jumbotron>{" "}
            {}
            {this.state.checked ? (
              <div style={{ position: "sticky", top: 0 }}>
                <CountdownTimer duration={this.state.exam_duration * 60 * 60} />
              </div>
            ) : (
              <div></div>
            )}
            {Object.keys(this.state.questions).length > 0 ? (
              <div>
                {Object.entries(this.state.questions).map((question) => {
                  counter = counter + 1;
                  return (
                    <StudentExam
                      key={question[0]}
                      question={question}
                      counter={counter}
                      exam_id={163}
                      handleAnswer={this.handleAnswer}
                    />
                  );
                })}{" "}
                <Button
                  style={{ marginBottom: 20 }}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.handleSubmit}
                  startIcon={
                    this.state.submit ? (
                      <CircularProgress size={20} color="secondary" />
                    ) : (
                      <div></div>
                    )
                  }
                  disabled={this.state.submit || submitted}
                >
                  {this.state.submit === false && success !== true
                    ? "Submit"
                    : success === true
                    ? "Submitted Successfully"
                    : "Submitting..."}
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    );
  }
}
