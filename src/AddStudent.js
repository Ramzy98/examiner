import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Alert } from "@material-ui/lab";
var success = false;

export default class AddStudents extends Component {
  state = {
    allowedStudents: [],
    loading: false,
    token: "",
    exam_id: "",
    error: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      exam_id: props.exam_id,
      token: props.token,
    };
  }
  render() {
    const handleAddStudents = (e) => {
      this.setState({
        ...this.state,
        allowedStudents: e.target.value.replace(/\s+/g, " ").trim().split(" "),
      });
    };
    const handleSubmit = () => {
      axios
        .post(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.exam_id}/allowed-students/`,
          {
            students: this.state.allowedStudents,
          },
          {
            headers: { Authorization: "Token " + this.state.token },
          }
        )
        .then(this.forceUpdate(), (success = true))

        .catch(() => {
          this.setState({
            ...this.state,
            error: `Error adding students!`,
          });
        });
    };
    return (
      <div>
        {success === true ? (
          <Alert severity="success">Students added successfully! </Alert>
        ) : this.state.error !== "" ? (
          <Alert severity="error"> {this.state.error}</Alert>
        ) : (
          <div></div>
        )}
        <br />
        <TextField
          id="outlined-multiline-static"
          label="Add allowed Students"
          multiline
          rowsMax={this.state.allowedStudents.length}
          variant="outlined"
          onChange={handleAddStudents}
          fullWidth
          size="medium"
          /*  value={this.state.allowedStudents}*/
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
              <AddIcon />
            )
          }
          onClick={handleSubmit}
        >
          {this.state.loading ? "Adding students..." : "Add students"}
        </Button>
      </div>
    );
  }
}
