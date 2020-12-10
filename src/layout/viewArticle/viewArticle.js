import React, { Component } from "react";
import "./viewArticle.css";
import avt1 from "./../../images/c_1.png";
import { Container, Row, Col, Button } from "reactstrap";
import { Form, FormControl } from "react-bootstrap";
import Comment from "./../../components/comment/comment";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../../../src/Config/firebase";
const db = firebase.firestore();

class ViewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isLoaded: false,
      comments: [],
      comment: {
        userID: "",
        articleID: "",
        content: "",
        created: new Date(),
        email: "",
        username: "",
      },
    };
  }
  componentDidMount() {
    this.getMyCommentsByIDArticle();
    if (typeof this.props.location.state !== "undefined") {
      if (typeof this.props.location.state.hasOwnProperty("active")) {
        this.setState(
          {
            article: this.props.location.state.article,
          },
          () => {
            this.setState({
              isLoaded: true,
            });
          }
        );
      }
    } else {
      this.getArticleByID(this.props.match.params.id);
    }
  }
  getArticleByID = (uid) => {
    db.collection("Articles")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState(
            {
              article: doc.data(),
            },
            () => {
              this.setState({
                isLoaded: true,
              });
            }
          );
        } else {
          this.props.history.push({ pathname: "/" });
        }
      });
  };
  getMyCommentsByIDArticle = () => {
    db.collection("Comments")
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let allComments = [];
          const a = this.props.location.pathname.slice(9);
          docs.forEach((doc) => {
            if (doc.data().articleID === a) {
              const comment = {
                id: doc.id,
                ...doc.data(),
              };
              allComments.push(comment);
              console.log(allComments);
            } else {
              console.log(a, doc.data().articleID);
            }
          });
          this.setState({
            comments: allComments,
          });
        }
        console.log(this.state);
      });
  };

  timeStampToString = (ts) => {
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
  };

  onChangeComment = (value) => {
    this.setState({
      comment: {
        ...this.state.comment,
        content: value,
      },
    });
  };
  sendComment = () => {
    if (this.props.auth.isEmpty) {
      console.log(this.props.auth.isEmpty);
      alert("Please login to comment");
      this.props.history.push({ pathname: "/login" });
    } else {
      const comment = this.state.comment;
      comment.username = firebase.auth().currentUser.displayName;
      comment.userID = firebase.auth().currentUser.uid;
      comment.email = firebase.auth().currentUser.email;
      comment.articleID = this.props.location.pathname.slice(9);
      db.collection("Comments")
        .add(comment)
        .then((res) => {
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <Container>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <div className="blog_post full_blog_post">
                  <h3>
                    <Link to={{ pathname: "/" }}>
                      {this.state.article.title}
                    </Link>
                  </h3>
                  <h5>
                    Written by Me on{" "}
                    {this.timeStampToString(
                      this.state.article.lastModified.seconds
                    )}
                    {firebase.auth().currentUser.uid ===
                    "1osNDqHyjsTecTHnsXiBsLmsPHp2" || firebase.auth().currentUser.uid === 'T9Mbzum7Y6a9AdL4Wo32tIFIOF92'? (
                      <Link
                        to={{
                          pathname: "/editArticle/" + this.state.article.id,
                          state: { article: this.state.article },
                        }}
                      >
                        Edit Blog
                      </Link>
                    ) : (
                      ""
                    )}
                  </h5>
                  <p className="blog_info">
                    <i className="fa fa-comment"></i>
                    <Link to={{ pathname: "/" }}>
                      {this.state.comments.length} comments
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-tags"></i>
                    <Link to={{ pathname: "/" }}>Photo </Link>
                    <Link to={{ pathname: "/" }}>Girl </Link>
                    <Link to={{ pathname: "/" }}>Graphics </Link>
                  </p>
                  <div className="blog-content">
                    <img
                      className="media-object"
                      src={this.state.article.featureImage}
                      alt={this.state.article.title}
                    />
                    <p>{parse(this.state.article.content)}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="layout_spadding">
            <Container>
              <Row>
                <Col md={12}>
                  <div className="heading">
                    <h4 style={{ borderBottom: "solid #333 1px" }}>Comments</h4>
                  </div>
                </Col>
              </Row>
              {this.state.comments.map((comment, index) => {
                return <Comment key={index} data={comment} />;
              })}

              <Row>
                <Col md={12}>
                  <div className="heading">
                    <h4>Leave a Comment</h4>
                  </div>
                </Col>
              </Row>
              <Container>
                <Row>
                  <Col md={12}>
                    <div className="comment_form">
                      <Form>
                        <Col md={12}>
                          <Row>
                            <Col md={1}>
                              <img src={avt1} alt="avatar"></img>
                            </Col>
                            <Col md={11}>
                              <FormControl
                                as="textarea"
                                placeholder="Comment"
                                className="mb-3"
                                id="comment"
                                name="comment"
                                onChange={(e) =>
                                  this.onChangeComment(e.target.value)
                                }
                                value={this.state.comment.comment}
                              />
                            </Col>
                          </Row>
                          <div className="center">
                            <Button
                              onClick={(e) => this.sendComment()}
                              className="send"
                            >
                              Send
                            </Button>
                          </div>
                        </Col>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Container>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));
export default withRouter(enhance(ViewArticle));
