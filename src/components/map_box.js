import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeDirections } from '../actions';

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      id: '',
      instructions: [],
      distance: [],
      draw_line: [],
    }
  }

  componentDidMount() {
    this.props.storeInstructions(this.state.instructions);
    window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2p6ZWxlZG9uIiwiYSI6ImNqOG5jdnlhODE5a3MycW11MWo1eGV2Y2QifQ.WZStz_i8Bt1B4OEZJMg_WA';

    //Adds the map
    this.map = new window.mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-80.8464, 35.2269], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    //Retreives the json of foodtrucks and returns the coordinates to the map in geojson.
    this.map.on('load', () => {
      fetch('https://desolate-lowlands-68945.herokuapp.com/foodtruck/all')
        .then(response => response.json())
        .then(response => {
          // All the points with a startTime
          const located = response
            .filter(item => item.location.startTime !== null)
            .map(item => {
              //console.log(item);
              return {  
                'type': 'Feature',
                'properties': {
                  id: item.yelpId,
                  description: item.name,
                  startTime: item.location.startTime,
                },
  
                'geometry': {
                  'type': 'Point',
                  'coordinates':[item.location.longitude,
                                 item.location.latitude]
                },
              };
            });

            this.map.addSource('located', {
              type: 'geojson',
              data: {
                'type': 'FeatureCollection',
                'features': located,
              },
            });

            this.map.addLayer({
              id: 'located',
              source: 'located',
              type: 'circle',
              paint: {
                "circle-radius": 7,
                "circle-color": "red"
              }
            });


            // All the points with a startTime
          const missing = response
          .filter(item => item.location.startTime === null)
          .map(item => {
            //console.log(item);
            return {  
              'type': 'Feature',
              'properties': {
                id: item.yelpId,
                description: item.name,
                startTime: item.location.startTime,
                // Boolean indicates whether the location is up to date
                updated: item.location.startTime !== undefined,
              },

              'geometry': {
                'type': 'Point',
                'coordinates':[item.location.longitude,
                               item.location.latitude]
              },
            };
          });

          console.log(missing);

          this.map.addSource('missing', {
            type: 'geojson',
            data: {
              'type': 'FeatureCollection',
              'features': missing,
            }
          });

          this.map.addLayer({
            id: 'missing',
            source: 'missing',
            type: 'circle',
            paint: {
              "circle-radius": 7,
              "circle-color": "black"
            }
          });

        })

      navigator.geolocation.watchPosition(function (position) {
        bigBrother(position);
      });

      // console.log(this.state.id);
      const bigBrother = (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          id: this.state.id,
          instructions: this.state.instructions,
        })
            this.map.addSource('movingAround', {
              type: 'geojson',
              data: {
                'type': 'FeatureCollection',
                'features': [{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      this.state.longitude,
                      this.state.latitude,
                    ],
                  }
                }]
              }
            });
      
            this.map.addLayer({
              id: 'currentLocation',
              source: 'movingAround',
              type: 'circle',
              paint: {
                "circle-radius": 7,
                "circle-color": "#007cbf"
              }
            });
          
        
      };
    });

    this.map.addControl(new window.mapboxgl.NavigationControl());

    //Centers the point the user selected on the map

    this.map.on('click', 'located', (e) => {
      // console.log('hi');
      // The flyTo needed to be an arrow function to not tie it to the the map.on function.
      this.map.flyTo({
        center: e.features[0].geometry.coordinates
      });

      this.setState({
        id: e.features[0].properties.id,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        instructions: this.state.instructions
      });

      new window.mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML(e.features[0].properties.description)
      .addTo(this.map)
      this.sendToGoogle();

    });

    this.map.on('click', 'missing', (e) => {
      
      // console.log('hi');
      // The flyTo needed to be an arrow function to not tie it to the the map.on function.
      this.map.flyTo({
        center: e.features[0].geometry.coordinates
      });

      this.setState({
        id: e.features[0].properties.id,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        instructions: this.state.instructions
      });

      new window.mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML(e.features[0].properties.description)
      .addTo(this.map)
      this.sendToGoogle();

    });
  }

  sendToGoogle() {
    let directions;
    let distance;
    let line;

    fetch('https://desolate-lowlands-68945.herokuapp.com/directions/' + this.state.id + '?origin=' + this.state.latitude + ',' + this.state.longitude)
      .then(response => response.json())
      .then(response => {
        const steps = response.routes[0].legs[0].steps;
        directions = steps.map(location => location.html_instructions);
        distance = steps.map(location => location.distance.text);

// This will place the coordiates in the correct format. The reduce function is needed
// it reduces the array of arrays of arrays from three deep to two deep. The concat wil
// not work without the reduce function.

        line = steps.map(location => [
         [location.start_location.lng,
          location.start_location.lat],
         [location.end_location.lng,
          location.end_location.lat]]).reduce(function (a, b) {
            return a.concat(b);
          });

            if (this.map.getLayer('route') !== undefined) {
              this.map.removeSource('route');
              this.map.removeLayer('route');

            }

            this.map.addLayer({
              "id": "route",
              "type": "line",
              "source": {
                "type": "geojson",
                "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "LineString",
                    "coordinates": line
                  }
                }
              },
              "layout": {
                "line-join": "round",
                "line-cap": "round"
              },
              "paint": {
                "line-color": "blue",
                "line-width": 6
              }
            })

        this.setState({
          instructions: directions,
          distance: distance,
          draw_line: line,
        }, () => {
          this.props.storeInstructions(this.state.instructions);
           });
      });
  };

  render() {
  //   console.log(this.state.longitude);
  //   console.log(this.state.id);
  //  console.log(this.state.instructions);
  //  console.log(this.state.distance);
  //  console.log(this.state.draw_line);

    return (
      <div className="mapbox">
        <div id="map" />
      </div>
    );
  };
};

  export function mapDispatch2Props(dispatch) {
    return {
      storeInstructions: function (instruction) {
        dispatch(storeDirections(instruction));
      },
    };
  };
//The first option on connect is mapState2Props, second is MapDispatch2Props
//if one option is not used it needs to be listed as null
export default connect(null, mapDispatch2Props)(MapBox);
