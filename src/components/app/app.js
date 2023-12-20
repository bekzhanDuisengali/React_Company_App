import React, { Component } from 'react';
import { Header } from '../header/header';
import WeatherService from '../../services/WeatherService';
import Card from '../card/card';
import CityChange from '../cityChange/cityChange';
import BlockList from '../blockList/blockList';
import './app.scss';
import clear_icon from '../../icons/clear.png';
import cloud_icon from '../../icons/cloud.png';
import drizzle_icon from '../../icons/drizzle.png';
import rain_icon from '../../icons/rain.png';
import snow_icon from '../../icons/snow.png';
import SunTime from '../sunTime/sunTime';
import Wind from '../wind/wind';
import {Routes, Link , Route , BrowserRouter as Router} from 'react-router-dom';
import Pressure from '../pressure/pressure';
import AboutMe from '../aboutMe/aboutMe';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentCity: localStorage.getItem('lastCity') || 'Almaty',
      blockData: [],
    };
    this.weatherService = new WeatherService();
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
  }

  componentDidMount() {
    this.updateBlockData(this.state.currentCity);
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.currentCity !== this.state.currentCity) {
      this.updateBlockData(this.state.currentCity);
    }
  }

  cityChanging = (newCity) => {
    this.setState({
      currentCity: newCity,
    });
    localStorage.setItem('lastCity', newCity);
  };

  updateBlockData = async (city) => {
    try {
      console.log("Updating block data for city:", city);
      const weekData = await this.weatherService.getWeekResourses(city);

      if (weekData.list && weekData) {
        const blockData = weekData.list
          .filter((item) => item.dt_txt.includes("00:00:00"))
          .map((item) => {
            let icon = cloud_icon;
            
            if (item.weather[0].icon === '01d' || item.weather[0].icon === '01n') {
              icon = clear_icon;
            } else if (item.weather[0].icon === '02d' || item.weather[0].icon === '02n') {
              icon = cloud_icon;
            } else if (item.weather[0].icon === '03d' || item.weather[0].icon === '03n') {
              icon = drizzle_icon;
            } else if (item.weather[0].icon === '04d' || item.weather[0].icon === '04n') {
              icon = drizzle_icon;
            } else if (item.weather[0].icon === '09d' || item.weather[0].icon === '09n') {
              icon = rain_icon;
            } else if (item.weather[0].icon === '10d' || item.weather[0].icon === '10n') {
              icon = rain_icon;
            } else if (item.weather[0].icon === '13d' || item.weather[0].icon === '13n') {
              icon = snow_icon;
            } else {
              icon = clear_icon;
            }

            return {
              cloud_icon: icon,
              title: `${this.days[new Date(item.dt_txt).getDay()]} ${new Date(item.dt_txt).getDate()}/${new Date(item.dt_txt).getMonth() + 1}`,
              content: `Temperature: ${(item.main.temp - 273).toFixed(0)}°C`,
              info: `Weather: ${item.weather[0].description}`,
              feel: `Feels like ${(item.main.feels_like-273).toFixed(0)}°C`
            };
          });

        console.log("Block data:", blockData);
        this.setState({ blockData });
      } else {
        console.error("Week data is undefined or does not have a list property.");
      }
    } catch (error) {
      console.error("Error fetching block data:", error);
    }
  };

  render() {
    const { currentCity, blockData  } = this.state;

    return (
      <div>
        <Header />
        <CityChange onCityChange={this.cityChanging}/>
        <Routes>
          <Route
            path="/"
            element={<Card city={currentCity} />}
          />
          <Route
            path="/add"
            element={
              <div>
                <BlockList blockData={blockData} />
                <div className="outside">Additional information about weather</div>
                <div className='other_info'>
                  <div className="left-side">
                    <SunTime city={currentCity} />
                  </div>
                  <div className="right-side">
                    <Wind city={currentCity} />
                    <Pressure city={currentCity} />
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/about"
            element={<AboutMe />}
          />
        </Routes>
      </div>
    );
    
    
    
  }
}

export default App;
