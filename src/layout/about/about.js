import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ArticleCard from "./../../components/articleCard/articleCard";
import firebase from "./../../Config/firebase";
import "./about.css";
const db = firebase.firestore();
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoader: false,
          articles: [],
        };
      }
      componentDidMount() {
        this.getMyArticles();
      }
    
      getMyArticles = () => {
        db.collection("Articles")
          .get()
          .then((docs) => {
            if (!docs.empty) {
              let allArticles = [];
              docs.forEach(function (doc) {
                const article = {
                  id: doc.id,
                  ...doc.data(),
                };
                allArticles.push(article);
              });
              this.setState(
                {
                  articles: allArticles,
                },
                () => {
                  this.setState({
                    isLoader: true,
                  });
                }
              );
            }
          });
      };
      render() {
        return (
          <div className="about">
           
            <div className="contact-bg">
          <Container>
            <Row>
              <Col md={12}>
                <div className="contactHeading">
                  <h3>Blog Ẩm Thực </h3>
                </div>
              </Col>
            </Row>
          </Container>

        </div>
        <Container>
              {this.state.isLoader
                ? this.state.articles.map((article, index) => {
                    return <ArticleCard key={index} data={article} />;
                  })
                : ""}
            </Container>
          </div>
        );
      }
}
