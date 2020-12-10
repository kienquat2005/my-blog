import React, { Component } from "react";
import "./contact.css";
import { Container, Button, Col, Row } from "reactstrap";
import { Form, FormControl } from "react-bootstrap";
export default class Contact extends Component {
  
  render() {
    return (
      <div>
        <div className="contact-bg">
          <Container>
            <Row>
              <Col md={12}>
                <div className="contactHeading">
                  <h3>Contact Us</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="layout_padding">
          <Container>
            <Row>
              <Col md={12}>
                <div className="comment_form">
                  <Form>
                    <Col md={12}>
                      <Row>
                        <Col md={6}>
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
                        </Col>
                        <Col md={6}>
                          <FormControl
                            as="textarea"
                            placeholder="Message"
                            className="mb-3"
                          />
                        </Col>
                      </Row>
                      <div className="center">
                        <Button className="send">Send</Button>
                      </div>
                    </Col>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
