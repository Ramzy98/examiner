import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class AddStudents extends Component {
  render() {
    return (
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />
      </div>
    );
  }
}
