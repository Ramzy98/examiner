import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
export default class Question extends Component {
  state = {
    exam_id: "",
    question: "",
    option1: {
      text: "",
      is_correct: false,
      id: 0,
    },
    option2: {
      text: "",
      is_correct: false,
      id: 0,
    },
    option3: {
      text: "",
      is_correct: false,
      id: 0,
    },
    option4: { text: "", is_correct: false, id: 0 },
    token: "",
    question_id: "question_id",
    mark: 0,
    error: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      question: props.question[1].text,
      question_id: props.question[0],
      mark: props.question[1].mark,
      token: props.token,
      option1: {
        text: Object.values(props.question[1].answers)[0],
        is_correct: false,
        id: Object.keys(props.question[1].answers)[0],
      },
      option2: {
        text: Object.values(props.question[1].answers)[1],
        is_correct: false,
        id: Object.keys(props.question[1].answers)[1],
      },
      option3: {
        text: Object.values(props.question[1].answers)[2],
        is_correct: false,
        id: Object.keys(props.question[1].answers)[2],
      },
      option4: {
        text: Object.values(props.question[1].answers)[3],
        is_correct: false,
        id: Object.keys(props.question[1].answers)[3],
      },
    };
  }

  render() {
    const handleSubmit = () => {};

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
              } else {
                this.props.handleAnswer(
                  this.state.question_id,
                  this.state[key].id
                );
              }
            });
        }
      );
      handleSubmit();
    };
    return (
      <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
        <Card variant="outlined">
          <CardContent>
            <CardActions>
              <TextField
                style={{ margin: 8 }}
                fullWidth
                value={this.state.question}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Question " + this.props.counter}
              />{" "}
              <TextField value={this.state.mark} label="Mark" />
            </CardActions>{" "}
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
                      label="Option 1"
                      value={this.state.option1 && this.state.option1.text}
                    />{" "}
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
                    />
                  </CardActions>
                </RadioGroup>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
