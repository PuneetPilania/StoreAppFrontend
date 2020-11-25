import React, { Component } from "react";
import { connect } from "react-redux";
import { authAxios, guestAxios } from "../../../utils";
import { Link } from "react-router-dom";
import { Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap"
import { Button } from '@material-ui/core';
import "../../css/detailPage.css"
import { getProduct, host } from "../../../constants"
import Axios from "axios";

class DetailPage extends Component {
    state = {
        data: this.props.location.state.data,
        source: "",
        productCategory: [],
        product: [],
        productModal: false,
        productFilter: []
    }
    componentDidMount() {
        this.setState({
            source: `https://maps.google.com/maps?q=${this.state.data.extraData.lat},${this.state.data.extraData.lon}&hl=es;z=14&output=embed`
        })
        guestAxios.post(`${getProduct}`, { id: this.state.data.id }).then(res => this.setState({
            productCategory: res.data.productCategory,
            product: res.data.product
        }))
    }

    toggle = () => this.setState({ productModal: !this.state.productModal });

    render() {
        const { data, source, productCategory, productModal, productFilter, product } = this.state
        return <div>
            {console.log(`${host}` + data.coverPhoto)}
            <img src={`${host}` + data.coverPhoto} style={{ width: "100%", height: "600px" }} />
            <br />
            <div style={{ textAlign: "center" }}>
                <h1
                    className="gradient-default"
                    style={{
                        fontFamily: "Rouge Script",
                        color: "#0086b3",
                        fontWeight: "bold",
                    }}
                >
                    About Us
                  </h1>

                <br />
                <h4>{data.extraData.about}</h4>
                <br />
                <br />

            </div>
            <div style={{ textAlign: "center" }}>
                <h1
                    className="gradient-default"
                    style={{
                        fontFamily: "Rouge Script",
                        color: "#0086b3",
                        fontWeight: "bold",
                    }}
                >
                    Product Range
                  </h1>

                <div style={{ marginTop: 60, marginBottom: 100 }}>
                    {productCategory.map(item =>
                        <span key={item.id} onClick={() => this.setState({
                            productFilter: product.filter(item1 => item1.category === item.id),
                            productModal: true
                        })} className="productCategory">
                            <span className="productName">{item.name}</span>
                        </span>
                    )}
                </div>

            </div>


            <div>
                <Row style={{ width: "90%", marginLeft: "5%" }}>
                    <Col className="mb-5 mb-lg-0" lg="6" md="6">
                        <h1
                            className="gradient-default"
                            style={{
                                fontFamily: "Rouge Script",
                                color: "#0086b3",
                                fontWeight: "bold",
                            }}
                        >
                            Photo Gallery
                  </h1>
                        <div
                            style={{
                                width: 90,
                                height: 3,
                                backgroundColor: "#0086b3",
                            }}
                        ></div>
                    </Col>
                    <Col className="mb-5 mb-lg-0" lg="6" md="6">
                        <h1
                            style={{
                                fontFamily: "Rouge Script",
                                color: "#0086b3",
                                fontWeight: "bold",
                            }}
                        >
                            Store Hours
                  </h1>
                        <div
                            style={{
                                width: 90,
                                height: 3,
                                backgroundColor: "#0086b3",
                            }}
                        ></div>
                        <br />
                        <Row>
                            <Col>
                                <h4
                                    style={{
                                        color: "#1a174d",
                                        fontFamily: "Great Vibes",
                                    }}
                                >
                                    {data.extraData.storeHour.map(item => <div>
                                        {item.day}<br />
                                    </div>)}
                                </h4>
                            </Col>
                            <Col>
                                <h4
                                    style={{
                                        color: "#1a174d",
                                        fontFamily: "Great Vibes",
                                    }}
                                >
                                    {data.extraData.storeHour.map(item => <div>
                                        {item.startTime} - {item.endTime}<br />
                                    </div>)}
                                </h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </div>
            <div>
                <iframe
                    src={source}
                    width="100%"
                    height="500px"
                    frameborder="0"
                    style={{ border: "0", marginBottom: -5 }}
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                ></iframe>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
                © {data.extraData.name}
            </div>
            <br />

            <Modal isOpen={productModal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Products</ModalHeader>
                <ModalBody>
                    {productFilter.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                backgroundColor: "ghostwhite",
                                marginTop: "5px",
                                borderRadius: "10px",
                                padding: "10px",
                                cursor: "pointer",
                                textAlign: "center",
                            }}
                        >
                            <span>{item.name}</span>
                        </div>
                    ))}
                </ModalBody>
            </Modal>

        </div >
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps)(DetailPage);
