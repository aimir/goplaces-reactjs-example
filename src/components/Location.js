import React from "react";
import {Grid} from "semantic-ui-react";
import Country from "./Location/Country";
import Region from "./Location/Region";
import City from "./Location/City";

export default class Location extends React.Component {

    constructor() {
        super();
        this.state = {
            country: null,
            region: null,
            city: null
        };
    }

    handleChangeCountry = (country) => {
        this.setState({country, region: null, city: null});
    };

    handleChangeRegion = (region) => {
        this.setState({region, city: null});
    };

    handleChangeCity = (city) => {
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
}