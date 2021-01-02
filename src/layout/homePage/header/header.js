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
            <NavbarBrand className="full" href="/my-blog">
              <img className="logo" src={Logo} alt="logo"></img>
            </NavbarBrand>
          </Col>

          <NavbarToggler onClick={this.toggle} />
          <Col md="9" className="head_right">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem className="navItem">
                  <NavLink className="navLink" href="/my-blog">
                    Trang chủ
                  </NavLink>
                </NavItem>
                <NavItem className="navItem">
                  <NavLink className="navLink" href="/about">
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem className="navItem">
                  <NavLink className="navLink" href="/contact">
                    Liên hệ 
                  </NavLink>
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
                      <NavLink className="new_post" href="/login">
                        Đăng nhập
                      </NavLink>
                    </DropdownItem>
                  ) : (
                    <DropdownItem>
                      <NavLink
                        onClick={() => firebase.auth().signOut()}
                        className="new_post"
                      >
                        Đăng xuất
                      </NavLink>
                    </DropdownItem>
                  )}
                  {this.props.auth.uid === "1osNDqHyjsTecTHnsXiBsLmsPHp2" || this.props.auth.uid === "T9Mbzum7Y6a9AdL4Wo32tIFIOF92" ? (
                    <DropdownItem>
                      <NavLink className="new_post" href="/new-article">
                        Thêm bài viết
                      </NavLink>
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
