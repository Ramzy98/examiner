import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import CardActions from "@material-ui/core/CardActions";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";

export default class CreateQuestion extends Component {
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
    flag: 0,
    counter: 1,
    loading: false,
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
    const handleQuestionChange = (e) => {
      this.setState({
        ...this.state,
        question: e.target.value,
        token: this.state.token,
      });
    };
    const handleQuestionMark = (e) => {
      this.setState({
        ...this.state,
        mark: e.target.value,
      });
    };
    const handleOptionOneChange = (e) => {
      this.setState({
        ...this.state,
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
        ...this.state,
        option3: { ...this.state.option3, text: e.target.value },
      });
    };
    const handleOptionFourChange = (e) => {
      this.setState({
        ...this.state,
        option4: { ...this.state.option4, text: e.target.value },
      });
    };
    const handleAnswer1 = () => {
      this.setState({
        ...this.state,
        option1: { ...this.state.option1, is_correct: true },
        option2: { ...this.state.option2, is_correct: false },
        option3: { ...this.state.option3, is_correct: false },
        option4: { ...this.state.option4, is_correct: false },
      });
    };
    const handleAnswer2 = () => {
      this.setState({
        ...this.state,
        option2: { ...this.state.option2, is_correct: true },
        option1: { ...this.state.option1, is_correct: false },
        option3: { ...this.state.option3, is_correct: false },
        option4: { ...this.state.option4, is_correct: false },
      });
    };
    const handleAnswer3 = () => {
      this.setState({
        ...this.state,
        option3: { ...this.state.option3, is_correct: true },
        option1: { ...this.state.option1, is_correct: false },
        option2: { ...this.state.option2, is_correct: false },
        option4: { ...this.state.option4, is_correct: false },
      });
    };
    const handleAnswer4 = () => {
      this.setState({
        ...this.state,
        option4: { ...this.state.option4, is_correct: true },
        option1: { ...this.state.option1, is_correct: false },
        option2: { ...this.state.option2, is_correct: false },
        option3: { ...this.state.option3, is_correct: false },
      });
    };

    const resetchoices = () => {
      Object.keys(this.state)
        .filter((key) => key.includes("option"))
        .forEach((key) => {
          console.log(key);
          this.setState(
            {
              [key]: { is_correct: false, text: "" },
            },
            resetQuestion
          );
        });
    };
    const resetQuestion = () => {
      this.setState({
        ...this.state,
        question: "",
        mark: 0,
        flag: 2,
        counter: this.state.counter + 1,
      });
    };
    const handleSubmit = () => {
      this.setState({
        ...this.state,
        loading: true,
      });
      var done = 1;

      axios
        .post(
          `https://cors-anywhere.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/${this.state.exam_id}/question/`,
          {
            text: this.state.question,
            mark: this.state.mark,
          },
          {
            headers: { Authorization: "Token " + this.state.token },
          }
        )
        .then((res) => {
          console.log(res, "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs");
          this.setState({
            ...this.state,
            question_id: res.data.id,
          });
          Object.keys(this.state)
            .filter((key) => key.includes("option"))
            .forEach((key) => {
              console.log(this.state[key]);
              if (this.state[key].text !== "")
                axios
                  .post(
                    `https://cors-anywhere.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/exam/question/${this.state.question_id}/answer/`,
                    {
                      text: this.state[key].text,
                      is_correct: this.state[key].is_correct,
                    },
                    {
                      headers: { Authorization: "Token " + this.state.token },
                    }
                  )
                  .catch(() => {
                    this.setState({
                      ...this.state,
                      flag: 1,
                    });
                    done = 0;
                  });
            });
        })
        .catch((res) => {
          console.log("SDSDSDSDSDSDSD");
          this.setState({
            ...this.state,
            flag: 1,
          });
        });
      if (done === 1) {
        resetchoices();
      }
      this.setState({
        ...this.state,
        loading: true,
      });
    };
    return (
      <div style={{ padding: "1% 10%" }}>
        <Card variant="outlined">
          <CardContent>
            {console.log("Qustion State ", this.state)}{" "}
            {this.state.flag === 1 ? (
              <Alert severity="error">
                {" "}
                All fields must be filled (except the options field 1 at least
                required)!
              </Alert>
            ) : this.state.flag === 2 ? (
              <Alert severity="success">
                Question {this.state.counter - 1} added successfully!
              </Alert>
            ) : (
              <div></div>
            )}
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
                label={"Question " + this.state.counter}
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
              <RadioGroup name="options">
                <CardActions>
                  <FormControlLabel
                    value="1"
                    control={<Radio size="small" onChange={handleAnswer1} />}
                  />
                  <TextField
                    fullWidth
                    value={this.state.option1.text}
                    label="Option 1"
                    onChange={handleOptionOneChange}
                  />
                </CardActions>
                <CardActions>
                  <FormControlLabel
                    value="b"
                    control={<Radio size="small" onChange={handleAnswer2} />}
                  />
                  <TextField
                    fullWidth
                    label="Option 2"
                    value={this.state.option2.text}
                    onChange={handleOptionTwoChange}
                  />{" "}
                </CardActions>
                <CardActions>
                  <FormControlLabel
                    value="3"
                    control={<Radio size="small" onChange={handleAnswer3} />}
                  />
                  <TextField
                    fullWidth
                    label="Option 3"
                    value={this.state.option3.text}
                    onChange={handleOptionThreeChange}
                  />{" "}
                </CardActions>
                <CardActions>
                  <FormControlLabel
                    value="4"
                    control={<Radio size="small" onChange={handleAnswer4} />}
                  />
                  <TextField
                    fullWidth
                    label="Option 4"
                    value={this.state.option4.text}
                    onChange={handleOptionFourChange}
                  />{" "}
                </CardActions>
              </RadioGroup>
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
