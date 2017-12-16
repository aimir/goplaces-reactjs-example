import React from "react";
import "whatwg-fetch";
import {Dropdown} from "semantic-ui-react"

export default class Country extends React.Component {

    constructor() {
        super();
        this.state = {
            isFetched: false,
            fetching: false,
            countries: []
        }
    }

    handleChange = (e, {value}) => {
        this.props.onChange(value);
    };

    componentDidMount() {
        if (!this.state.isFetched) {
            this.setState({fetching: true});
            fetch(`${process.env.REACT_APP_GOPLACES_URL}/api/v1/country`)
                .then(response => {
                    return response.json();
                }).then(data => {
                    const countries = data.map(country => {
                        return {
                            key: country.id,
                            text: country.name,
                            value: country.id
                        }
                    });
                    this.setState({isFetched: true, fetching: false, countries});
                }).catch(() => {
                    this.setState({isFetched: true, fetching: false});
                })
            ;
        }
    }

    render() {
        return (
            <Dropdown
                fluid
                loading={this.state.fetching}
                disabled={this.state.fetching}
                placeholder='Country'
                value={this.props.country}
                onChange={this.handleChange}
                search
                selection
                options={this.state.countries}
            />
        );
    }
}
