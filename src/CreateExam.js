import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import CreateQuestion from "./CreateQuestion";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class CreateExam extends Component {
  state = {
    date: new Date().toISOString().slice(0, 10),
    time: new Date(),
    date_time: "",
    exam_duration: "",
    exam_name: "",
    token: "",
    exam_id: null,
    loading: false,
    disable: false,
  };
  render() {
    const handleDateChange = (date) => {
      this.setState({
        ...this.state,
        date: date,
        date_time: date.toISOString().substr(0, 11),
      });
    };
    const handleTimeChange = (time) => {
      time = new Date(time);
      this.setState({
        ...this.state,
        time: time,
        date_time: this.state.date_time.concat(
          time.toISOString().split("T")[1]
        ),
      });
    };
    const handleSubmit = () => {
      this.setState({
        ...this.state,
        loading: true,
      });
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/login/`,
          {
            username: "ramzyexaminer",
            password: "aa00000000",
          }
        )
        .then((res) => {
          console.log(res);
          axios
            .post(
              `https://cors-anywhere.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/`,
              {
                exam_name: this.state.exam_name,
                exam_startdate: this.state.date_time,
                exam_duration: this.state.exam_duration,
              },
              {
                headers: { Authorization: "Token " + res.data.key },
              }
            )
            .then((res1) => {
              console.log("sdsdsdsdsdssssssssss", res1.data.id);
              let id = res1.data.id;
              this.setState({
                ...this.state,
                exam_id: id,
                loading: false,
                disable: true,
              });
            })
            .catch(
              this.setState({
                ...this.state,
                loading: false,
              })
            );
        });
    };
    const handleDurationChange = (e) => {
      this.setState({
        ...this.state,
        exam_duration: e.target.value,
      });
    };
    const handleExamNameChange = (e) => {
      this.setState({
        ...this.state,
        exam_name: e.target.value,
      });
    };

    return (
      <div>
        <TextField
          required
          id="ExamName"
          label="Exam name"
          onChange={handleExamNameChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <br />{" "}
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Pick the date"
            value={this.state.date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />{" "}
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick the time"
            value={this.state.time}
            onChange={handleTimeChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>{" "}
        <br />
        <TextField
          required
          id="standard-required"
          label="Duration in hours"
          onChange={handleDurationChange}
        />
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={
            this.state.loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              <SaveIcon />
            )
          }
          disabled={this.state.loading || this.state.disable}
          onClick={handleSubmit}
        >
          {this.state.loading ? "Creating exam..." : "Create Exam"}
        </Button>
        {this.state.exam_id && (
          <CreateQuestion
            exam_id={this.state.exam_id}
            token={"b9bb864dbd489d8b714a2211cc32aa78697a6adb"}
          />
        )}
      </div>
    );
  }
}
