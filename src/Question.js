import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import CardActions from "@material-ui/core/CardActions";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
var updated = false;
export default class Question extends Component {
  state = {
    exam_id: "",
    question: "",
    option1: {
      text: "",
      is_correct: false,
    },
    option2: {
      text: "",
      is_correct: false,
    },
    option3: {
      text: "",
      is_correct: false,
    },
    option4: {
      text: "",
      is_correct: false,
    },
    token: "",
    question_id: "question_id",
    mark: 0,
    loading: false,
  };
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      question: props.question.text,
      question_id: props.question.id,
      mark: props.question.mark,
      token: props.token,
      option1: Object.values(props.question.answers)[0],
      option2: Object.values(props.question.answers)[1],
      option3: Object.values(props.question.answers)[2],
      option4: Object.values(props.question.answers)[3],
    };
  }
  render() {
    const handleQuestionChange = (e) => {
      this.setState({
        question: e.target.value,
        token: this.state.token,
      });
    };
    const handleQuestionMark = (e) => {
      this.setState({
        mark: e.target.value,
      });
    };
    const handleSubmit = () => {
      axios
        .patch(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/{exam_id}/question/${this.state.question_id}//`,
          {
            id: this.state.question_id,
            text: this.state.question,
            mark: this.state.mark,
          },
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then((updated = true), this.forceUpdate());
    };
    return (
      <div>
        {updated === true ? (
          <Alert severity="success">Question updated successfully!</Alert>
        ) : (
          <div></div>
        )}
        <Card variant="outlined">
          <CardContent>
            <CardActions>
              <TextField
                style={{ margin: 8 }}
                placeholder="Enter the question"
                required
                fullWidth
                value={this.state.question}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Question " + this.props.counter}
                onChange={handleQuestionChange}
              />{" "}
              <TextField
                required
                value={this.state.mark}
                label="Mark"
                onChange={handleQuestionMark}
              />
            </CardActions>
            <div>
              {
                <RadioGroup name="options">
                  <CardActions>
                    <FormControlLabel
                      value="1"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option1 && this.state.option1.is_correct
                          }
                        />
                      }
                    />
                    <TextField
                      fullWidth
                      value={this.state.option1 && this.state.option1.text}
                      label="Option 1"
                    />
                  </CardActions>
                  <CardActions>
                    <FormControlLabel
                      value="b"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option2 && this.state.option2.is_correct
                          }
                        />
                      }
                    />
                    <TextField
                      fullWidth
                      label="Option 2"
                      value={this.state.option2 && this.state.option2.text}
                    />{" "}
                  </CardActions>
                  <CardActions>
                    <FormControlLabel
                      value="3"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option3 && this.state.option3.is_correct
                          }
                        />
                      }
                    />
                    <TextField
                      fullWidth
                      label="Option 3"
                      value={this.state.option3 && this.state.option3.text}
                    />{" "}
                  </CardActions>
                  <CardActions>
                    <FormControlLabel
                      value="4"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option4 && this.state.option4.is_correct
                          }
                        />
                      }
                    />
                    <TextField
                      fullWidth
                      label="Option 4"
                      value={this.state.option4 && this.state.option4.text}
                    />
                  </CardActions>
                </RadioGroup>
              }{" "}
              <br />
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
                disabled={this.state.loading}
                onClick={handleSubmit}
              >
                {this.state.loading
                  ? "Adding question..."
                  : "Add a new question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
