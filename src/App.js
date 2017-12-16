import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Location from './components/Location';
import {Header, Segment, Icon} from "semantic-ui-react";

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <Segment basic inverted color="grey">
                <Header as="h2">
                    geoplaces usage example
                </Header>
            </Segment>
            <Segment basic>
                <Segment basic>
                    <Location/>
                </Segment>
                <Segment basic textAlign="center">
                    <Icon name="github" /><a target="_blank" rel="noopener noreferrer" href="https://github.com/aimir/goplaces">goplaces</a>
                </Segment>
            </Segment>
        </React.Fragment>
    );
  }
}

export default App;
