import React from "react";
import "whatwg-fetch";
import {Dropdown} from 'semantic-ui-react';

export default class Region extends React.Component {

    constructor() {
        super();
        this.state = {
            isFetched: false,
            fetching: false,
            regions: []
        }
    }

    handleChange = (e, {value}) => {
        this.props.onChange(value);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.country === null) {
            this.setState({regions: [], isFetched: false});
        } else if (!this.state.isFetched || nextProps.country !== this.props.country) {
            this.fetchRegions(nextProps.country)
        }
    }

    componentDidMount() {
        if (!this.state.isFetched && this.props.country) {
            this.fetchRegions(this.props.country);
        }
    }

    render() {
        return (
            <Dropdown
                fluid
                loading={this.state.fetching}
                disabled={this.state.fetching}
                placeholder='Region'
                value={this.props.region}
                onChange={this.handleChange}
                search
                selection
                options={this.state.regions}
            />
        );
    }

    fetchRegions(country) {
        this.setState({fetching: true});
        fetch(`${process.env.REACT_APP_GOPLACES_URL}/api/v1/country/${country}/region`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const regions = data.map(region => {
                    return {
                        key: region.id,
                        text: region.name,
                        value: region.id
                    }
                });
                regions.unshift({
                    key: 'all',
                    text: 'All Regions',
                    value: '__ALL__'
                });
                this.setState({isFetched: true, fetching: false, regions});
            }).catch(() => {
                this.setState({isFetched: true, fetching: false});
            })
        ;
    }

}