import React, { Component } from "react";
import "../css/App.css"
;import Slider from "./SlideComponents/Slider"
import { Link } from "react-router-dom";

const mission_description = "We know what if feels like to be a commuter student on campus who is working around strangers. We know what it feels like to be hungry but lacking a motivation to spend the time eating alone. We know what it's like to be bored studying  alone. Our platform is a tool friends can use to more easily find common places of interest, live. Suddenly, you always know where to head for good vibes!";

export default class Home extends Component {

  render() {
    console.log("Rendering Home");
    return (
      <div>
        <BigTitle />
        <hr className="my-4" />
        <Slider />
      </div>
    );
  }
}

function BigTitle(props) {
  console.log("Making big title");
  return (
    <div className="jumbotron hometitle">
      <h1 className="display-4 text-light">Check In</h1>
      <p class="lead text-light">Come together.</p>
      <hr className="my-4 homeline" />
      <p className="text-light" >{mission_description}</p>
      <span>
        <button type="button" class="btn btn-primary attractionbutton">
          <Link to={"/login"} className="nav-dark text-white">
            Login
              </Link>
        </button>
      </span>
      <span>
        <button type="button" class="btn btn-primary attractionbutton">
          <Link to={"/signup"} className="nav-link text-white">
            Sign Up
              </Link>
        </button>
      </span>
    </div>
  );
}
