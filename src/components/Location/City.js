import React from "react";
import "whatwg-fetch";
import {Dropdown} from "semantic-ui-react";

export default class Region extends React.Component {

    constructor() {
        super();
        this.state = {
            isFetched: false,
            fetching: false,
            cities: []
        }
    }

    handleChange = (e, {value}) => {
        this.props.onChange(value);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.region === null) {
            this.setState({cities: [], isFetched: false});
        } else if (!this.state.isFetched || nextProps.region !== this.props.region) {
            this.fetchCities(nextProps.country, nextProps.region)
        }
    }

    componentDidMount() {
        if (!this.state.isFetched && this.props.country && this.props.region) {
            this.fetchCities(this.props.country, this.props.region);
        }
    }

    render() {
        return (
            <Dropdown
                fluid
                loading={this.state.fetching}
                disabled={this.state.fetching}
                placeholder='City'
                value={this.props.city}
                onChange={this.handleChange}
                search
                selection
                options={this.state.cities}
            />
        );
    }

    fetchCities(country, region) {
        let url = process.env.REACT_APP_GOPLACES_URL;
        if (region !== "__ALL__") {
            url += `/api/v1/country/${country}/region/${region}/city`;
        } else {
            url += `/api/v1/country/${country}/city`;
        }
        this.setState({fetching: true});
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const cities = data.map(city => {
                    return {
                        key: city.id,
                        text: city.name,
                        value: city.id
                    }
                });
                this.setState({isFetched: true, fetching: false, cities});
            }).catch(() => {
                this.setState({isFetched: true, fetching: false});
            })
        ;
    }
}
