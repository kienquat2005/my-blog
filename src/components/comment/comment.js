import React from "react";
import avt1 from "./../../images/c_1.png";
import './comment.css';
import {  Row, Col, Button } from "reactstrap";
export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "  " +
    date.getHours() +
    "h" +
    date.getMinutes() +
    "m"
  );
}
const Comment = (props) => {
  return (
      
      <Row>
        <Col md={12}>
          <div className="comment_blog_line">
            <Row>
              <Col md={1}>
                <img src={avt1} alt='avatar'></img>
              </Col>
              <Col md={9}>
                <div className="contact_text">
                  <h3>{props.data.username}</h3>
                  <h4>
                    Posted on {timeStampToString(props.data.created.seconds)}
                  </h4>
                  <p>{props.data.content}</p>
                </div>
              </Col>
              <Col md={2}>
                <Button className="send">Reply</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
  );
};

export default Comment;
