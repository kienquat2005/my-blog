import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ArticleCard from "../../../components/articleCard/articleCard";
import firebase from "../../../Config/firebase";
import "./main.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
const db = firebase.firestore();
export default class Main extends Component {
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
      .limit(5)
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
                isLoader: true
              });
            }
          );
        }
      });
  };

  render() {
    return (
      <div>
        <div className="banner_bg">
          <Container>
            <Row>
              <Col sm="7">
                <Carousel className="carousel">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://botoquanmoc.com/upload_images/images/2019/10/09/IMG_0342-2(1).jpg"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://botoquanmoc.com/upload_images/images/2019/10/09/IMG_0098-2.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://botoquanmoc.com/upload_images/images/2019/10/09/IMG_0260.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>

              <Col sm="5">
                <div className="slider_cont_section">
                 
                  <h3>Blog ẩm thực</h3>
                  <p>
                  Ẩm thực Việt Nam ngày càng đa dạng,
                  phong phú khi vừa tiếp thu những tinh hoa của thế giới vừa kế thừa và phát huy những đặc trưng nổi bật của dân tộc.
                  Cũng chính nhờ điều này, mà ẩm thực nước ta ngày càng khẳng định vị thế của mình trong nền ẩm thực của thế giới,
                  khi liên tiếp có những món ăn được xếp hạng cao trong những danh sách bình chọn uy tín.
                  </p>
                  <div className="button-section">
                    <Link to="#">Read More</Link>
                    <Link to={{pathname: '/contact'}}>Contact Us</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <h3 className="aboutUs">
          </h3>
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
