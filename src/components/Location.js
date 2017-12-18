import React from "react";
import {Grid} from "semantic-ui-react";
import Country from "./Location/Country";
import Region from "./Location/Region";
import City from "./Location/City";
import "whatwg-fetch";

export default class Location extends React.Component {

    constructor() {
        super();
        this.state = {
            country: null,
            region: null,
            city: null,
            cityData: {}
        };
    }

    handleChangeCountry = (country) => {
        this.setState({country, region: null, city: null, cityData: {}});
    };

    handleChangeRegion = (region) => {
        this.setState({region, city: null, cityData: {}});
    };

    handleChangeCity = (city) => {
        this.fetchCityData(city);
        this.setState({city});
    };

    render() {
        return (
            <Grid columns="equal">
                <Grid.Column>
                    <Country country={this.state.country} onChange={this.handleChangeCountry} />
                </Grid.Column>
                <Grid.Column>
                    <Region
                        country={this.state.country}
                        region={this.state.region}
                        onChange={this.handleChangeRegion}
                    />
                </Grid.Column>
                <Grid.Column>
                    <City
                        country={this.state.country}
                        region={this.state.region}
                        city={this.state.city}
                        onChange={this.handleChangeCity}
                    />
                </Grid.Column>
                <Grid.Row>
                    <Grid.Column>
                        <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    fetchCityData(id) {
        fetch(`${process.env.REACT_APP_GOPLACES_URL}/api/v1/city/${id}`)
            .then(response => response.json())
            .then(cityData => {
                this.setState({cityData})
            })
            .catch(() => {
                this.setState({cityData: {}})
            })
        ;
    }
}