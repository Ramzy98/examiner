import React, { Component } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import Alert from "react-bootstrap/Alert";
import GetStudentExam from "./GetStudentExam";

const columns = [
  {
    field: "student_name",
    headerName: "Student username",
    width: 170,
    backgroundColor: "#376331",
  },
  {
    field: "supervisor_name",
    headerName: "Supervisor name",
    width: 200,
  },

  {
    field: "enter_time",
    headerName: "Enter time",
    width: 180,
    type: "dateTime",
  },
  {
    field: "submit_time",
    headerName: "Submit time",
    width: 180,
    type: "dateTime",
  },
];
const supervisors = [
  {
    field: "supervisor_name",
    headerName: "Supervisor name",
    width: 170,
    backgroundColor: "#376331",
  },
  {
    field: "student_name",
    headerName: "Assigned Student",
    width: 200,
  },
];
const marks = [
  {
    field: "student_name",
    headerName: "Student username",
    width: 170,
    backgroundColor: "#376331",
  },
  {
    field: "mark",
    headerName: "Mark",
    width: 200,
    type: "number",
  },
];

export default class ViewAllowed extends Component {
  state = {
    id: 0,
    exam: [],
    mountComponent: false,
    attendance: [],
    students: [],
    supervisors: [],
    marks: [],
  };
  render() {
    const handleID = (e) => {
      this.setState({
        id: e.target.value,
        mountComponent: false,
      });
    };
    const handleGetAttendance = () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/attendance/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState({ attendance: res.data });
          console.log(this.state.attendance, "REEEEES");
        });
    };
    const handleViewStudent = () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/allowed-students/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState(
            { students: res.data.student.sort() },
            console.log(res)
          );
        });
    };
    const handleViewSupervisors = () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/supervisors/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState(
            { supervisors: res.data },
            console.log(this.state.supervisors)
          );
        });
    };
    const handleGetMarks = () => {
      axios
        .get(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.id}/marks/`,
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((res) => {
          this.setState({ marks: res.data }, console.log(this.state.marks));
        });
    };
    let rows = this.state.attendance;
    for (let i = 0; i < rows.length; i++) {
      rows[i].enter_time = new Date(rows[i].enter_time.toString());
      rows[i].submit_time = new Date(rows[i].submit_time.toString());
    }
    return (
      <div>
        <CardContent>
          <CardActions>
            <TextField
              id="outlined-required"
              label="Enter Exam ID"
              variant="outlined"
              onChange={handleID}
              size="small"
            />{" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleViewStudent}
              size="small"
            >
              View allowed students{" "}
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleViewSupervisors}
            >
              View Supervisors
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleGetAttendance}
              size="small"
            >
              view attendance sheet{" "}
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleGetMarks}
              size="small"
            >
              View students marks{" "}
            </Button>
          </CardActions>
        </CardContent>
        <GetStudentExam token={this.props.token} />
        <CardContent>
          <br />
          {this.state.students.length > 0 ? (
            <div>
              <Alert variant="secondary">
                <Alert.Heading>
                  Allowed Students: {this.state.students.length}
                </Alert.Heading>{" "}
                <hr />
                <TextField
                  id="outlined-multiline-static"
                  label="Allowed Students"
                  multiline
                  rowsMax={this.state.students.length}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  value={this.state.students.join(", ")}
                />{" "}
              </Alert>
              <br />
            </div>
          ) : (
            <div></div>
          )}
          {this.state.attendance.length > 0 ? (
            <Alert style={{ height: 396, width: 760 }} variant="secondary">
              {" "}
              <Alert.Heading>Attendance Sheet</Alert.Heading> <hr />
              <div style={{ height: 300, width: 735 }}>
                {" "}
                <DataGrid
                  rows={this.state.attendance}
                  columns={columns}
                  pageSize={10}
                />
                <hr /> <br />
              </div>{" "}
            </Alert>
          ) : (
            <div></div>
          )}{" "}
          {this.state.supervisors.length > 0 ? (
            <div style={{ height: 500, width: 400 }}>
              <DataGrid
                rows={this.state.supervisors}
                columns={supervisors}
                pageSize={10}
              />
              <br />
            </div>
          ) : (
            <div></div>
          )}{" "}
          {this.state.marks.length > 0 ? (
            <div style={{ height: 300, width: 400 }}>
              <DataGrid rows={this.state.marks} columns={marks} pageSize={10} />
              {console.log(this.state.marks)}
              <br />
            </div>
          ) : (
            <div></div>
          )}
        </CardContent>
      </div>
    );
  }
}
