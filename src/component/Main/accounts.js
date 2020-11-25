import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, login } from "../../actions/auth";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../css/accountPopUp.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import endpoint from "../../endpoint";
import { guestAxios } from "../../utils";

const styles = (theme) => ({
    loginpaper: {
        margin: theme.spacing(0),
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.paper,
    },

    root: {
        background: "linear-gradient(to right, #0099cc, #0086b3)",
        border: 0,
        color: "white",
        height: 48,
        fontSize: "16px",
        fontWeight: "700",
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px #f3f3f3",
    },

    avatar: {
        margin: theme.spacing(1),
        background: "linear-gradient(to right, #0099cc, #0086b3)",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
});

class Account extends Component {
    state = {
        value: 0,
        openLogin: true,
        username: "",
        password: "",
        password2: "",
        email: "",
        name: "",
        otp: "",
        status: this.props.status,
        err: "",
        colorOfError: "forestgreen",
        statusForForgetPassword: false,
        loading: false,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        this.setState({
            loading: true,
        });

        // Request Body
        const body = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });

        guestAxios
            .post(`${endpoint}/api/auth/login`, body)
            .then((res) => {
                this.setState({
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                    loading: false,
                    openLogin: false,
                });
                this.props.funcToChange(null);
            })
            .catch((err) => {
                this.setState({
                    err: "Incorrect Credientials",
                    colorOfError: "red",
                    loading: false,
                });
            });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    toggle = () => {
        this.setState({
            openLogin: !this.state.openLogin,
            otp: "",
            username: "",
            password: "",
            name: "",
            email: "",
            err: "",
            statusForForgetPassword: false,
        });
        this.props.funcToChange(null);
    };

    render() {
        const { classes } = this.props;
        return (
            <Modal isOpen={this.state.openLogin} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.loginpaper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <p style={{ color: this.state.colorOfError }}>{this.state.err}</p>
                            <>
                                <Typography component="h1" variant="h5">
                                    Login
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="number"
                                        rows="number"
                                        label="Phone No"
                                        name="username"
                                        onChange={this.onChange}
                                        value={this.state.username}
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <br />
                                    <br />
                                    {this.state.loading ? (
                                        <div style={{ marginLeft: "45%" }}>
                                            <CircularProgress />
                                        </div>
                                    ) : (
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                classes={{ root: classes.root }}
                                                onClick={this.onSubmit}
                                            >
                                                Login
                                            </Button>
                                        )}
                                    <br />
                                    <br />
                                </form>
                            </>
                        </div>
                    </Container>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { login, logout })(
    withStyles(styles)(Account)
);
