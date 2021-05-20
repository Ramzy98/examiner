import React, { Component } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";

export default class GetStudentExam extends Component {
  state = { examID: 0, username: "", exam: [] };
  render() {
    const handleusername = (e) => {
      this.setState({
        username: e.target.value,
      });
    };
    const handleExamID = (e) => {
      this.setState({
        examID: e.target.value,
      });
    };
    const handleGetExam = () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.examID}/student/${this.state.username}/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState({ exam: res.data });
        });
    };

    return (
      <div>
        {console.log(this.state)}
        <CardContent>
          <CardActions>
            <TextField
              id="outlined-required"
              label="Enter Student username"
              variant="outlined"
              onChange={handleusername}
              size="small"
            />{" "}
            <TextField
              id="outlined-required"
              label="Enter Exam ID"
              variant="outlined"
              onChange={handleExamID}
              size="small"
            />{" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleGetExam}
              size="small"
            >
              Get student's exam{" "}
            </Button>{" "}
          </CardActions>
        </CardContent>
      </div>
    );
  }
}
