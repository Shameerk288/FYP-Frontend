
import React, { Component, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StepsContext } from './stepsContext';


function post(props) {

  // const[steps,setSteps] = useContext(StepsContext);
  const [response, setResponse] = useState("");

  let length;
  useEffect(() => {

    postMsg(props.previousStep.value);
  })
  // constructor(props) {
  //   super(props);
  //   const { steps } = this.props;
  //   const { submit, firstname, lastname, email } = steps;

  //   this.state =  { submit, firstname, lastname, email };
  // }
  // componentDidMount() {
  //     const userObject = {
  //       submit:this.state.submit.value,
  //       first_name:this.state.firstname.value,
  //       last_name:this.state.lastname.value,
  //       email:this.state.email.value,
  //     };
  const postMsg = async (chat) => {
    // console.log(chat);
    try {
      await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset': 'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify({ "sender": 'user', "message": chat }),
      })
        .then(res => res.json())
        .then((res) => {
          if (res) {
            const temp = res[0];
            // const recipient_id = temp["recipient_id"];
            const recipient_msg = temp["text"];

            console.log(res);
            // const response_temp = { sender: "bot", msg: recipient_msg };
            setResponse(recipient_msg);
            // console.log(recipient_msg);

          }
        })
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>{response}</div>
  );


}

export default post;