import { Component } from "react";
import WeatherService from "../../services/WeatherService";
import './wind.scss';
class Wind extends Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.timerId = null;
        this.state = {
            wind: null,
            winddeg: null
        }
    }
    
    componentDidMount(){
        this._isMounted = true;
        this.updateWindInfo(this.props.city);
    }
    componentDidUpdate(prevProps){
        if(prevProps!==this.props.city){
            this.updateWindInfo(this.props.city)
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timerId)
    }
    weatherService = new WeatherService();
    updateWindInfo = () =>{
        const city = this.props.city;
        this.weatherService
            .getCityResourse(city)
            .then(({wind})=>{
            if(this._isMounted){
                this.setState({
                    wind: wind.speed,
                    winddeg : wind.deg
                })
            }
        }).catch(error=>{
            console.error('Error fetching weather data: ', error);

        })
    }
    
    render(){
        const {wind, winddeg} = this.state;
        
        return(
            <div className="wind-card">
            <div className="wind-card__wind">{`Wind's speed: `} <b>{wind} m/s</b> </div>
            {/* <img src={gif} alt="" /> */}
            <div className="wind-card__winddeg">{'Wind`s degree: '} <b>{winddeg}</b> °C</div>
            </div>
        )
    }
}
export default Wind; 