import React, { Component } from "react";
import "./header.css";
import Logo from "../../../images/logo.png";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Collapse,
  NavbarToggler,
  DropdownToggle,
  Button,
  Col,
  Row,
} from "reactstrap";
import { Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import firebase from "../../../Config/firebase";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      type: "administrator",
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.auth.isEmpty) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((clain) => {});
    }
    return null;
  }

  render() {
    return (
      <Row>
        <Navbar className="navbar" expand="md" dark fixed="top">
          <Col md="3" className="logo-section">
            <NavbarBrand className="full" to="/">
              <img className="logo" src={Logo} alt="logo"></img>
            </NavbarBrand>
          </Col>

          <NavbarToggler onClick={this.toggle} />
          <Col md="9" className="head_right">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem className="navItem">
                  <Link className="navLink" to="/">
                    Trang chủ
                  </Link>
                </NavItem>
                <NavItem className="navItem">
                  <Link className="navLink" to="/about">
                    Blog
                  </Link>
                </NavItem>
                <NavItem className="navItem">
                  <Link className="navLink" to="/contact">
                    Liên hệ 
                  </Link>
                </NavItem>
                <Form inline className="form">
                  <FormControl
                    type="text"
                    placeholder="Bạn cần tìm..."
                    className="mr-sm-2"
                  />
                  <Button variant="outline-info">Tìm kiếm</Button>
                </Form>
              </Nav>

              <UncontrolledDropdown>
                <DropdownToggle nav>
                  <h5 className="user">
                    {this.props.auth.isEmpty ? "" : this.props.auth.displayName}
                    <i className="fas fa-user"></i>
                  </h5>
                </DropdownToggle>
                <DropdownMenu right>
                  {this.props.auth.isEmpty ? (
                    <DropdownItem>
                      <Link className="new_post" to="/login">
                        Đăng nhập
                      </Link>
                    </DropdownItem>
                  ) : (
                    <DropdownItem>
                      <Link
                        onClick={() => firebase.auth().signOut()}
                        className="new_post"
                      >
                        Đăng xuất
                      </Link>
                    </DropdownItem>
                  )}
                  {this.props.auth.uid === "1osNDqHyjsTecTHnsXiBsLmsPHp2" || this.props.auth.uid === "T9Mbzum7Y6a9AdL4Wo32tIFIOF92" ? (
                    <DropdownItem>
                      <Link className="new_post" to="/new-article">
                        Thêm bài viết
                      </Link>
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Collapse>
          </Col>
        </Navbar>
      </Row>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));
export default enhance(Header);
