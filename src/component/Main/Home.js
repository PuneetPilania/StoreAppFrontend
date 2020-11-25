import React, { Component } from "react";
import { connect } from "react-redux";
import { authAxios, guestAxios } from "../../utils";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap"
import { Button } from '@material-ui/core';

import { getStore } from "../../constants"
import "../css/home.css"

class Home extends Component {
    state = {
        stores: [],
        loading: true
    }
    componentDidMount() {
        guestAxios.get(`${getStore}`).then(res => {
            res.data.map(item => {
                const data = JSON.parse(item.extraData)
                item.extraData = JSON.parse(item.extraData)
                console.log(item.extraData)
                this.setState({
                    stores: [...this.state.stores, item],
                    loading: false
                })
            })
        })
    }

    render() {
        const { stores, loading } = this.state
        return <div>
            {loading ? <h1>Loading</h1> :
                <div className="container" style={{ marginTop: 40 }}>
                    {stores.map((data) => (
                        <div>
                            <div key={data[0]} className="innerContainer">
                                <Row>
                                    <Col>
                                        <h3>
                                            {data.extraData.name}
                                        </h3>
                                    </Col>
                                    <Col>
                                        <Link to={{
                                            pathname: '/detail',
                                            state: { data: data }
                                        }}>
                                            <Button>
                                                Select
                                </Button>
                                        </Link>

                                    </Col>
                                </Row>
                            </div>
                            <br />
                            <br />
                        </div>
                    ))}
                </div>
            }
        </div>
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps)(Home);
