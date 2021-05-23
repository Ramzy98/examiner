import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ExcelRenderer } from "react-excel-renderer";

var success = false;

export default class AddSupervisors extends Component {
  state = {
    allowedSupervisors: [],
    loading: false,
    token: "",
    exam_id: "",
    error: "",
    manually: 0,
    upload: 0,
    selectedFile: null,
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
    const handleAddSupervisors = (e) => {
      this.setState({
        ...this.state,
        allowedSupervisors: e.target.value,
      });
    };
    const handleAllowedSupervisorsArray = () => {
      console.log(this.state.allowedSupervisors);
      if (this.state.allowedSupervisors.includes(",")) {
        console.log("sadsadsadsa3");

        this.setState(
          {
            ...this.state,
            allowedSupervisors: this.state.allowedSupervisors
              .replace(/,/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else if (this.state.allowedSupervisors.includes(" ")) {
        console.log("sadsadsadsa2");

        this.setState(
          {
            ...this.state,
            allowedSupervisors: this.state.allowedSupervisors
              .replace(/\s+/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      } else if (this.state.allowedSupervisors.includes("\n")) {
        console.log(
          "sadsadsadsa",
          this.state.allowedSupervisors.replace(/\n/g, " ").trim().split(" ")
        );
        this.setState(
          {
            ...this.state,
            allowedSupervisors: this.state.alloweSupervisors
              .replace(/\n/g, " ")
              .trim()
              .split(" "),
          },
          handleSubmit
        );
      }
    };
    const handleSubmit = () => {
      this.setState({ loading: true }, handleAllowedSupervisorsArray);
      axios
        .patch(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.exam_id}/supervisors/`,
          {
            supervisor: this.state.allowedSupervisors,
          },
          {
            headers: { Authorization: "Token " + this.state.token },
          }
        )
        .then((res) => {
          this.forceUpdate()((success = true));
        })
        .catch(() => {
          this.setState({
            ...this.state,
            error: `Error adding supervisors!`,
          });
        });
      this.setState({ loading: false });
    };
    const enterManually = () => {
      this.setState({
        manually: 1,
        upload: 0,
      });
    };
    const uploadFile = () => {
      this.setState({
        upload: 1,
        manually: 0,
      });
    };
    const getData = () => {
      let result = [];
      ExcelRenderer(this.state.selectedFile, (err, resp) => {
        console.log(this.state.allowedSupervisors);
        if (err) {
          console.log(err);
        } else {
          resp.rows.map((supervisor) => result.push(supervisor[0]));
          this.setState({
            allowedSupervisors: result,
          });
        }
      });
    };
    const fileHandler = (event) => {
      this.setState(
        {
          selectedFile: event.target.files[0],
        },
        getData
      );
    };

    return (
      <div>
        {console.log(this.state.allowedSupervisors)}
        {success === true ? (
          <div>
            {" "}
            <br />
            <Alert severity="success">Supervisors added successfully! </Alert>
          </div>
        ) : this.state.error !== "" ? (
          <Alert severity="error"> {this.state.error}</Alert>
        ) : (
          <div></div>
        )}
        <br />
        <h3
          style={{ fontSize: "20px", fontFamily: "Century Gothic,Lucida Sans" }}
        >
          Add Supervisors
        </h3>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={enterManually}>Enter Supervisors manually</Button>
          <Button onClick={uploadFile}>Upload an excel file</Button>
        </ButtonGroup>
        {this.state.manually === 1 ? (
          <div>
            <br />
            <TextField
              id="outlined-multiline-static"
              label="Add allowed Supervisors"
              multiline
              rowsMax={this.state.allowedSupervisors.length}
              variant="outlined"
              onChange={handleAddSupervisors}
              fullWidth
              size="medium"
              value={this.state.allowedSupervisors}
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
              onClick={handleAllowedSupervisorsArray}
              disabled={
                this.state.allowedSupervisors.length === 0 ? true : false
              }
            >
              {this.state.loading ? "Adding supervisors..." : "Add supervisor"}
            </Button>{" "}
          </div>
        ) : (
          <div></div>
        )}
        {this.state.upload === 1 ? (
          <div>
            <br />{" "}
            <input
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={fileHandler.bind(this)}
              accept=".xlsx, .xls, .csv"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="default"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Choose an excel file
              </Button>{" "}
            </label>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleSubmit}
              disabled={
                this.state.allowedSupervisors.length === 0 ? true : false
              }
            >
              Upload and add Supervisors
            </Button>{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
