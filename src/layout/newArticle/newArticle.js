import React, { Component } from "react";
import "./newArticle.css";
import { FormControl } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "../../../src/Config/firebase";
import { v4 as uuidv4 } from "uuid";

const db = firebase.firestore();
const storageRef = firebase.storage();

export default class NewArticle extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      article: {
        title: "",
        content: "",
        createDate: new Date(),
        featureImage: "",
        isPublish: false,
        lastModified: new Date(),
        createUserID: "",
      },
    };
    console.log(this.state);
  }
  modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
        ["code-block"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];
  
  onChangeArticleTitle = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        title: value,
      },
    });
  };

  onChangeArticleContent = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        content: value,
      },
    });
  };

  onChangePublish = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        isPublish: value === "True",
      },
    });
  };
  onChangeShortContent = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        shortContent: value,
      },
    });
  };

  submitArticle = () => {
    const article = this.state.article;
    article.createUserID = this.props.auth.uid;
    console.log(article);
    db.collection("Articles")
      .add(article)
      .then((res) => {
        alert("Post successfully added!");
        this.props.history.push("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  uploadImageCallBack = (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const fileName = uuidv4();
      storageRef
        .ref()
        .child("Articles/" + fileName)
        .put(file)
        .then(async (snapshot) => {
          const downloadURL = await storageRef
            .ref()
            .child("Articles/" + fileName)
            .getDownloadURL();
          console.log(downloadURL);
          resolve({
            success: true,
            data: { link: downloadURL },
          });
        });
    });
  };

  render() {
    return (
      <div className="new-article">
        <div className="contact-bg">
          <Container>
            <Row>
              <Col md={12}>
                <div className="contactHeading">
                  <h3>New Article</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="content">
          <Container>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="content-body padding-bottom-0">
                  <Row>
                    <Col lg={8} md={8} sm={12} xs={12}>
                      <FormGroup className="form-group">
                        <Label className="form-label">BLOG TITLE</Label>
                        <div className="controls">
                          <Input
                            type="text"
                            name="articleTitle"
                            id="articleTitle"
                            placeholder=""
                            onChange={(e) =>
                              this.onChangeArticleTitle(e.target.value)
                            }
                            value={this.state.article.title}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Label className="form-label">Short Content</Label>
                        <div className="controls">
                          <FormControl
                            name="shortContent"
                            id="shortContent"
                            as="textarea"
                            className="mb-3"
                            onChange={(e) =>
                              this.onChangeShortContent(e.target.value)
                            }
                            value={this.state.article.shortContent}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12} sm={12} xs={12}>
                      <FormGroup className="form-group">
                        <Label className="form-label">BLOG POST CONTENT</Label>
                        <ReactQuill
                          id="quill"
                          ref={(el) => (this.quill = el)}
                          value={this.state.article.content}
                          onChange={(e) => this.onChangeArticleContent(e)}
                          theme="snow"
                          modules={this.modules}
                          formats={this.formats}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Card className="setting">
                        <CardHeader>Article Setting</CardHeader>
                        <CardBody>
                          <FormGroup>
                            <Label className="Label">Publish</Label>
                            <Input
                              type="select"
                              name="publish"
                              id="publish"
                              onChange={(e) =>
                                this.onChangePublish(e.target.value)
                              }
                            >
                              <option>False</option>
                              <option>True</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label className="Label">Feature Image</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              className="ImageUpLoader"
                              onChange={async (e) => {
                                const uploadState = await this.uploadImageCallBack(
                                  e
                                );
                                if (uploadState.success) {
                                  this.setState({
                                    hasFeatureImage: true,
                                    article: {
                                      ...this.state.article,
                                      featureImage: uploadState.data.link,
                                    },
                                  });
                                }
                              }}
                            ></Input>
                            {this.state.hasFeatureImage ? (
                              <img
                                src={this.state.article.featureImage}
                                className="FeatureImage"
                                alt="Feature"
                              />
                            ) : (
                              ""
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Button
                              color="danger"
                              onClick={(e) => this.submitArticle()}
                            >
                              Submit
                            </Button>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
