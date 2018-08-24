import React, { Component } from 'react';
import './App.css';

// https://github.com/foursquare/react-foursquare
var foursquare = require('react-foursquare')({
  clientID: 'CYC5MILNA4YYPDIFYQ5RBP1TNNMYNPUQ3ZYHRQ24SDIQRFSF',
  clientSecret: '23CALIDJKRAAMPEZMKODMBZQ4UV5GXL043ZK3FKDPWW5ZG5M'
});

class Foursquare extends Component {

  constructor(props) {
     super(props);
     this.state = {
       items: null,
       // state passed in from app component
       latlng: {'ll': this.props.lattitude.toString() + ',' + this.props.longitude.toString(),
     'query': this.props.titleQuery},
      // venue id
      venid: { 'venue_id': this.props.theVenueID }
    };
   }

   // make venue detail api request and set as item state
  componentDidMount() {
    foursquare.venues.getVenue(this.state.venid)
      .then(res => {
        this.setState({ items: res.response.venue });
      }).catch(err => {
        alert(err)
      });
  }

  render() {
    if (!this.state.items) {
      let formattedAddress = null
      return 'Loading..';
    } else {
      let formattedAddress = this.state.items.location.address
      return (
      <div>
        <div ref='testin'></div>
          <div key={this.state.items.id}>
          <h3>{this.state.items.name}</h3>
          <p><strong>Address:</strong>  {formattedAddress}</p>
          <p>This information was pulled from Foursquare</p>
        </div>
      </div>
    )
    }
  }
}

export default Foursquare
