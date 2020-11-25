import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Row, Col } from "reactstrap"
import storeTime from "../../../reducers/storeTime";
import { changeTime } from "../../../actions/storeTime";

class StoreHours extends Component {
    state = {
        timeData: [
            { id: 1, time: "12:00 AM" },
            { id: 2, time: "01:00 AM" },
            { id: 3, time: "02:00 AM" },
            { id: 4, time: "03:00 AM" },
            { id: 5, time: "04:00 AM" },
            { id: 6, time: "05:00 AM" },
            { id: 7, time: "06:00 AM" },
            { id: 8, time: "07:00 AM" },
            { id: 9, time: "08:00 AM" },
            { id: 10, time: "09:00 AM" },
            { id: 11, time: "10:00 AM" },
            { id: 12, time: "11:00 AM" },
            { id: 13, time: "12:00 PM" },
            { id: 14, time: "01:00 PM" },
            { id: 15, time: "02:00 PM" },
            { id: 16, time: "03:00 PM" },
            { id: 17, time: "04:00 PM" },
            { id: 18, time: "05:00 PM" },
            { id: 19, time: "06:00 PM" },
            { id: 20, time: "07:00 PM" },
            { id: 21, time: "08:00 PM" },
            { id: 22, time: "09:00 PM" },
            { id: 23, time: "10:00 PM" },
            { id: 24, time: "11:00 PM" },
        ]
    }

    handleChange = (event) => {
        const storeTime = this.props.storeTime.storeTime
        const data = storeTime.filter(item => item.day === this.props.day)[0]
        data.startTime = event.target.value
        this.props.changeTime(storeTime)
    }

    handleChange2 = (event) => {
        const storeTime = this.props.storeTime.storeTime
        const data = storeTime.filter(item => item.day === this.props.day)[0]
        data.endTime = event.target.value
        this.props.changeTime(storeTime)
    }

    render() {
        const { age, timeData } = this.state
        const { storeTime } = this.props.storeTime

        const startTime = storeTime.filter(item => item.day === this.props.day)[0].startTime
        const endTime = storeTime.filter(item => item.day === this.props.day)[0].endTime


        return <div className="container">
            <br />
            <Row>
                <Col><h5>{this.props.day}</h5></Col>
                <Col>

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Start Time</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={startTime}
                            onChange={this.handleChange}
                            label="Start Time"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {timeData.map(item => <MenuItem value={item.time} key={item.id}>{item.time}</MenuItem>)}
                        </Select>
                    </FormControl>

                </Col>
                <Col>

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">End Time</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={endTime}
                            onChange={this.handleChange2}
                            label="End Time"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {timeData.map(item => <MenuItem value={item.time} key={item.id}>{item.time}</MenuItem>)}
                        </Select>
                    </FormControl>

                </Col>
            </Row>
            <br />
        </div>
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    storeTime: state.storeTime,
});

export default connect(mapStateToProps, { changeTime })(StoreHours);
