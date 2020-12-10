import React, { Component } from "react";
import "./footer.css";
import Logo from "../../../images/footer_logo.png";
import Location_icon from "../../../images/location_icon.png";
import Phone_icon from "../../../images/phone_icon.png";
import Mail_icon from "../../../images/mail_icon.png";
import { Container, Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Container>
          <Row>
            <Col lg="4" md="6">
              <img src={Logo} alt="Logo" />
              <ul className="contact_information">
                <li>
                  <span>
                    <img src={Location_icon} alt="Location"></img>
                  </span>
                  <span className="text_cont">
                    Đà Nẵng <br /> Việt Nam
                  </span>
                </li>
                <li>
                  <span>
                    <img src={Phone_icon} alt="icon"></img>
                  </span>
                  <span className="text_cont">
                    036 759 2479 <br /> 037 983 8029
                  </span>
                </li>
                <li>
                  <span>
                    <img src={Mail_icon} alt="mail"></img>
                  </span>
                  <span className="text_cont">
                    Kimthanh99315@gmail.com <br /> thaovan8599@gmail.com
                  </span>
                </li>
              </ul>
            </Col>
            <Col lg="3" md="6">
              <div className="footer_links">
                <h3>Quick link</h3>
                <ul>
                  <li>
                    <Link to="#"> Home </Link>
                  </li>
                  <li>
                    <Link to="#"> Features </Link>
                  </li>
                  <li>
                    <Link to="#"> Events </Link>
                  </li>
                  <li>
                    <Link to="#"> Marketing </Link>
                  </li>
                  <li>
                    <Link to="#"> Blog </Link>
                  </li>
                  <li>
                    <Link to="#"> Testimonial </Link>
                  </li>
                  <li>
                    <Link to="#"> Contact </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg="5" md="6">
              <div className="footer_links">
                <h3>Contact Us</h3>
                <Form>
                  <FormControl
                    type="text"
                    placeholder="Your Name"
                    className="mb-3"
                  />
                  <FormControl
                    type="text"
                    placeholder="Email"
                    className="mb-3"
                  />
                  <FormControl
                    type="text"
                    placeholder="Subject"
                    className="mb-3"
                  />
                  <FormControl
                    as="textarea"
                    placeholder="Message"
                    className="mb-3"
                  />
                  <div className="center">
                    <Button className="send">Send</Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
