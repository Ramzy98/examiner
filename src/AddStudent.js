import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

export default class AddStudents extends Component {
  state = {
    allowedStudents: [],
    loading: false,
    token: "",
    exam_id: "",
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
    const handleSubmit = (e) => {};
    return (
      <div>
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
