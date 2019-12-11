import React, {Component} from 'react';

import Titles from "./component/Titles";
import Form from "./component/Form";
import Weather from "./component/Weather";
import ISOCity from "../src/component/ISO-city";
import convertValueAndKey from "../src/component/Object-Map";

const API_KEY = "400c31feb64291964c32eebeaa752611";
const ISOMap = convertValueAndKey(ISOCity)


export default class App extends Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description:undefined,
        error: "Please enter the value.",
        wrongInfo:""
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value.toUpperCase();
        
        let countryCode = ISOMap.get(country)
        

        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        console.log(data)
        if (data.cod === '404') {
            this.setState({ 
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "",
                wrongInfo:"Please enter correct information."
            })
        }
        else if (city && country) {
            if ( !ISOMap.has(country)) {
                this.setState({ 
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "",
                    wrongInfo:"Please enter correct information."
                })
            } else {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: "",
                wrongInfo:""
            })
        };
        } else {
            this.setState({ 
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "",
                wrongInfo:"Please enter correct information."
            })
        }
    };
    render(){
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                  <Titles />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather}/>
                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                        wrongInfo={this.state.wrongInfo}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

