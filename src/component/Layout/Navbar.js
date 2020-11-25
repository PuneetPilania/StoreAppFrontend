import React, { Component } from "react";
import { connect } from "react-redux";
import { authAxios, guestAxios } from "../../utils";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap"
import Account from "../Main/accounts"
import { logout } from "../../actions/auth";

class Header extends Component {
    state = {
        account: null
    }

    funcToChangeData = (a) => {
        this.setState({
            account: null,
        });
    };

    render() {
        const { isAuthenticated } = this.props.auth
        return <div>
            {this.state.account && (
                <Account
                    funcToChange={this.funcToChangeData}
                />
            )}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/">Our Stores</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {isAuthenticated ? <><Nav.Link><Link to="/addStore">New Store</Link></Nav.Link>
                            <Nav.Link><Link onClick={this.props.logout}>Logout</Link></Nav.Link>
                        </> :
                            <Nav.Link onClick={() => this.setState({
                                account: 1
                            })}>Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
