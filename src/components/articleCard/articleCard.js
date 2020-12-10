import React from "react";
import { Container, Col, Row } from "reactstrap";
import "./articleCard.css";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
export function timeStampToString(ts) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(ts * 1000);
  return (
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    "," +
    date.getFullYear() +
    "."
  );
}


const ArticleCard = (props) => {
  return (
    <div>
      {props.data.isPublish ? (
        <Container>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <div className="blog_post full_blog_post">
                <h3>
                  <Link to={{ pathname: "article/" + props.data.id }}>{props.data.title}</Link>
                </h3>
                <h5>
                  Written by Me on{" "}
                  {timeStampToString(props.data.createDate.seconds)}
                </h5>
                <p className="blog_info">
                  <i className="fa fa-eye"></i>
                  <Link
                    to={{
                      pathname: "article/" + props.data.id,
                      state: { article: props.data },
                    }}
                  >
                    View Blog
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i className="fa fa-comment"></i>
                  <Link
                    to={{
                      pathname: "article/" + props.data.id,
                      state: { article: props.data },
                    }}
                  >
                    3 comments
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i className="fa fa-tags"></i>
                  <Link to={{ pathname: "/" }}>Photo </Link>
                  <Link to={{ pathname: "/" }}>Girl </Link>
                  <Link to={{ pathname: "/" }}>Graphics </Link>
                </p>
                <div className="blog-content">
                  <div className="content-img">
                  <img
                    className="media-object"
                    src={props.data.featureImage}
                    alt={props.data.title}
                  />
                  </div>
                  
                  <p>{parse(props.data.shortContent)}</p>
                  <Link
                    className="btn btn-primary"
                    to={{
                      pathname: "article/" + props.data.id,
                      state: { article: props.data },
                    }}
                  >
                    <span>Read more</span>&nbsp;
                    <i className="fa fa-angle-double-right"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
};
export default ArticleCard;
