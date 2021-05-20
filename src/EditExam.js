import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ListExams from "./ListExams";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Exam from "./Exam";

var updated = false;
export default class EditExam extends Component {
  state = {
    id: 0,
    exam: [],
    mountComponent: false,
  };
  render() {
    const handleID = (e) => {
      this.setState({
        id: e.target.value,
        mountComponent: false,
      });
      updated = false;
    };
    const handleGetExam = () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState({ exam: res.data, mountComponent: true });
          console.log(res, "REEEEES");
          this.forceUpdate();
        });
    };
    const deleteExam = () => {
      axios
        .delete(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((updated = true), this.forceUpdate());
    };

    return (
      <div>
        <ListExams token={this.props.token} view={false} />{" "}
        {updated && (
          <Alert severity="success">
            Exam with ID :{this.state.id} Deleted successfully!
          </Alert>
        )}
        <CardContent>
          <CardActions>
            <TextField
              id="outlined-required"
              label="Enter Exam ID"
              variant="outlined"
              onChange={handleID}
            />{" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleGetExam}
            >
              Edit Exam
            </Button>{" "}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={deleteExam}
            >
              Delete
            </Button>
          </CardActions>
        </CardContent>{" "}
        {this.state.mountComponent === true ? (
          <div style={{ float: "left" }}>
            {" "}
            <Exam exam={this.state.exam} token={this.props.token} />{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
