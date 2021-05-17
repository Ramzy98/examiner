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
import AddIcon from "@material-ui/icons/Add";
import AddStudents from "./AddStudent";
import AddSupervisors from "./AddSupervisors";
import DoneIcon from "@material-ui/icons/Done";
var loading = false;
export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      date_time: props.exam.date_time.substr(0, 11),
      exam_duration: props.exam.exam_duration,
      exam_name: props.exam.exam_name,
      exam_id: props.exam.id,
      token: props.token,
    };
  }
  state = {
    date: new Date().toISOString().slice(0, 10),
    time: new Date(),
    date_time: "",
    exam_duration: 0,
    exam_name: "exam_name",
    exam_id: null,
    disable: false,
    created: false,
    AddStudents: false,
    AddSupervisors: false,
    loading: false,
    token: "",
  };
  render() {
    const handleDurationChange = (e) => {
      this.setState({
        exam_duration: e.target.value,
      });
    };
    const handleExamNameChange = (e) => {
      this.setState({
        exam_name: e.target.value,
      });
    };
    return (
      <div style={{ textAlign: "center" }}>
        {console.log(this.state)}
        <TextField
          size="small"
          required
          id="ExamName"
          label="Exam name"
          value={this.state.exam_name}
          error={this.state.exam_name ? false : true}
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
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            value={this.state.date_time}
          />{" "}
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pick the time"
            value={this.state.date_time}
            required
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
          error={isNaN(this.state.exam_duration)}
          value={this.state.exam_duration}
          onChange={handleDurationChange}
        />
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : this.state.created ? (
              <DoneIcon />
            ) : (
              <SaveIcon />
            )
          }
          disabled={
            loading ||
            this.state.disable ||
            isNaN(this.state.exam_duration) ||
            this.state.exam_duration === 0 ||
            this.state.exam_name === "exam_name" ||
            this.state.exam_name === "" ||
            this.state.exam_duration === ""
          }
        >
          {loading
            ? "Updating exam..."
            : this.state.created
            ? "Updated successfully"
            : "Update Exam"}
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={!this.state.created}
          startIcon={<AddIcon />}
        >
          Edit allowed students
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={!this.state.created}
          startIcon={<AddIcon />}
        >
          Edit supervisors
        </Button>
        {this.state.exam_id && (
          <CreateQuestion
            exam_id={this.state.exam_id}
            token={this.state.token}
          />
        )}{" "}
        {this.state.AddStudents && (
          <AddStudents exam_id={this.state.exam_id} token={this.state.token} />
        )}
        {this.state.AddSupervisors && (
          <AddSupervisors
            exam_id={this.state.exam_id}
            token={this.state.token}
          />
        )}
      </div>
    );
  }
}
