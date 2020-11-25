import React, { Component } from "react";
import { connect } from "react-redux";
import { authAxios } from "../../utils";
import { TextField, Button } from '@material-ui/core';
import { Row, Col } from "reactstrap"
import StoreHours from "./newStore/storeHours"
import { createStore, host } from "../../constants"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { withStyles } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
    upload: {
        backgroundColor: "inherit",
        borderRadius: "5px",
        border: "1px dashed #9D9D9D",
        display: "flex",
        flexDirection: "column",
        width: "100px",
        height: "100px",
        justifyContent: "center",
        margin: "0px 10px",
        "& > p": {
            fontSize: "11px",
            fontWeight: "600",
            margin: "10px 10px",
        },
    },
    addImages: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        "& > div > p": {
            fontSize: "11px",
        },

        "& > div": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
    },
    input: {
        display: "none",
    },
    customfileupload: {
        color: "#0086b3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 6px",
        cursor: "pointer",
        "& > p": {
            fontSize: "12px",
            fontWeight: "600",
        },
    },
    imageHandler: {
        display: "flex",
    },
    images1: {
        borderRadius: "5px",
        width: "100px",
        height: "110px",
        display: "flex",
        alignItems: "center",
        margin: "0px 10px",
    },
    imgPreview: {
        "& > img": {
            width: "100%",
            height: "100%",
        },
    },
})

class NewStore extends Component {
    state = {
        name: "",
        about: "",
        lon: "",
        lat: "",
        error: "",
        open: false,
        storeImage: null,
        storeImageUpload: null,
        loading: false,
        days: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thrusday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    }

    onSubmit = () => {
        const { name, about, lon, lat, storeImageUpload } = this.state
        const data = this.props.storeTime.storeTime
        if (name && about && lon && lat && storeImageUpload) {


            let form_data = new FormData();
            form_data.append("coverPhoto", storeImageUpload, storeImageUpload.name);
            form_data.append("name", name);
            form_data.append("about", about);
            form_data.append("lon", lon);
            form_data.append("lat", lat);

            authAxios(this.props.auth.token).post(`${createStore}`, form_data).then(res => {
                this.setState({
                    name: "",
                    about: "",
                    lon: "",
                    lat: "",
                    storeImageUpload: null,
                    storeImage: null
                })

                authAxios(this.props.auth.token).post(`${host}/api/auth/saveHour`, { data: data, id: res.data }).then(res1 => this.setState({
                    loading: false
                }))
            })

        }
        else {
            this.setState({
                open: true,
                error: "Fill all required fields."
            })
        }
    }

    handleClose = () => {
        this.setState({
            error: "",
            open: false
        })
    }



    storeImageChanged = (event) => {
        this.setState({
            storeImage: URL.createObjectURL(event.target.files[0]),
            storeImageUpload: event.target.files[0]
        })
    }

    render() {
        const { days, name, about, lon, lat, open, error, storeImage, loading } = this.state
        const { classes } = this.props;

        return <div className="container">
            <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert severity="error" onClose={this.handleClose}>
                    {error}
                </Alert>
            </Snackbar>
            <br />
            <h3>Add Store</h3>
            <br />
            <TextField fullWidth value={name} onChange={(e) => this.setState({ name: e.target.value })} name="name" label="Name" variant="outlined" />
            <br />
            <br />
            <TextField fullWidth value={about} onChange={(e) => this.setState({ about: e.target.value })} label="About Us" variant="outlined" />
            <br />
            <br />
            <Row>
                <Col><TextField value={lat} onChange={(e) => this.setState({ lat: e.target.value })} fullWidth label="Latitude" variant="outlined" /></Col>
                <Col><TextField fullWidth value={lon} onChange={(e) => this.setState({ lon: e.target.value })} label="Longitude" variant="outlined" /></Col>
            </Row>
            <br />
            <h4>Store Hours</h4>
            <br />
            {days.map(item => <StoreHours day={item} />)}

            <div style={{ textAlign: "center" }}>
                <div className={classes.imageHandler}>
                    <div className={classes.upload}>
                        <div className={classes.addImages}>
                            <CameraAltIcon />
                            <div>
                                <input
                                    id="kmImage"
                                    className={classes.input}
                                    type="file"
                                    onChange={this.storeImageChanged}
                                    accept="image/*"
                                    capture="camera"
                                />
                                <label
                                    for="kmImage"
                                    className={classes.customfileupload}
                                >
                                    <p>Add images</p>
                                </label>
                            </div>
                        </div>
                    </div>


                    {storeImage && (
                        <div className={classes.images1}>
                            <div className={classes.imgPreview}>
                                <img
                                    src={storeImage}
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {loading ? <Button variant="contained" color="primary">
                    Loading
                </Button> : <Button variant="contained" onClick={() => {
                        this.setState({
                            loading: true
                        })
                        this.onSubmit()
                    }} color="primary">
                        Create
                </Button>}

            </div>
            <br />
            <br />
        </div>
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    storeTime: state.storeTime,
});


export default connect(mapStateToProps, {})(withStyles(styles)(NewStore));