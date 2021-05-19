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
      id: this.props.question.answers[0],
    },
    option2: {
      text: "",
      is_correct: false,
    },
    option3: {
      text: "",
      is_correct: false,
    },
    option4: {},
    token: "",
    question_id: "question_id",
    mark: 0,
    loading: false,
  };
  constructor(props) {
    super(props);
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
  componentDidMount() {
    this.setState({
      option1: {
        ...this.state.option1,

        id: Object.keys(this.props.question.answers)[0],
      },
      option2: {
        ...this.state.option2,

        id: Object.keys(this.props.question.answers)[1],
      },
      option3: {
        ...this.state.option3,

        id: Object.keys(this.props.question.answers)[2],
      },
      option4: {
        ...this.state.option4,

        id: Object.keys(this.props.question.answers)[3],
      },
    });
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
    const handleOptionOneChange = (e) => {
      this.setState({
        option1: { ...this.state.option1, text: e.target.value },
      });
    };
    const handleOptionTwoChange = (e) => {
      this.setState({
        ...this.state,
        option2: { ...this.state.option2, text: e.target.value },
      });
    };
    const handleOptionThreeChange = (e) => {
      this.setState({
        option3: { ...this.state.option3, text: e.target.value },
      });
    };
    const handleOptionFourChange = (e) => {
      this.setState({
        option4: { ...this.state.option4, text: e.target.value },
      });
    };
    const handleSubmit = () => {
      axios
        .patch(
          `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/{exam_id}/question/${this.state.question_id}/`,
          {
            id: this.state.question_id,
            text: this.state.question,
            mark: this.state.mark,
          },
          {
            headers: { Authorization: "Token " + this.props.token },
          }
        )
        .then(
          (updated = true),
          this.forceUpdate(),
          Object.keys(this.state)
            .filter((key) => key.includes("option"))
            .forEach((key) => {
              axios.patch(
                `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/question/${this.state.question_id}/answer/${this.state[key].id}/`,
                {
                  text: this.state[key].text,
                  is_correct: this.state[key].is_correct,
                },
                {
                  headers: { Authorization: "Token " + this.state.token },
                }
              );
            })
        );
    };

    const handleAnswer = (e) => {
      this.setState(
        {
          [e.target.value]: {
            ...this.state[e.target.value],
            is_correct: true,
          },
        },
        () => {
          Object.keys(this.state)
            .filter((key) => key.includes("option"))
            .forEach((key) => {
              if (key !== e.target.value) {
                this.setState({
                  [key]: { ...this.state[key], is_correct: false },
                });
              }
            });
        }
      );
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
                      value="option1"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option1 && this.state.option1.is_correct
                          }
                        />
                      }
                      onClick={handleAnswer}
                    />
                    <TextField
                      fullWidth
                      value={this.state.option1 && this.state.option1.text}
                      label="Option 1"
                      onChange={handleOptionOneChange}
                    />
                  </CardActions>
                  <CardActions>
                    <FormControlLabel
                      value="option2"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option2 && this.state.option2.is_correct
                          }
                        />
                      }
                      onClick={handleAnswer}
                    />
                    <TextField
                      fullWidth
                      label="Option 2"
                      value={this.state.option2 && this.state.option2.text}
                      onChange={handleOptionTwoChange}
                    />{" "}
                  </CardActions>
                  <CardActions>
                    <FormControlLabel
                      value="option3"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option3 && this.state.option3.is_correct
                          }
                        />
                      }
                      onClick={handleAnswer}
                    />
                    <TextField
                      fullWidth
                      label="Option 3"
                      value={this.state.option3 && this.state.option3.text}
                      onChange={handleOptionThreeChange}
                    />{" "}
                  </CardActions>
                  <CardActions>
                    <FormControlLabel
                      value="option4"
                      control={
                        <Radio
                          size="small"
                          checked={
                            this.state.option4 && this.state.option4.is_correct
                          }
                        />
                      }
                      onClick={handleAnswer}
                    />
                    <TextField
                      fullWidth
                      label="Option 4"
                      value={this.state.option4 && this.state.option4.text}
                      onChange={handleOptionFourChange}
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
                  ? "Updating question..."
                  : "Update question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
