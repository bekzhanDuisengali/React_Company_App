import { Component } from "react";
import WeatherService from "../../services/WeatherService";
import gifSecond from './rain-9315_128.gif';
import './pressure.scss';
class Pressure extends Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.timerId = null;
        this.state = {
            pressure: null
        }
    }
    
    componentDidMount(){
        this._isMounted = true;
        this.updatePressureInfo(this.props.city);
    }
    componentDidUpdate(prevProps){
        if(prevProps!==this.props.city){
            this.updatePressureInfo(this.props.city)
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timerId)
    }
    weatherService = new WeatherService();
    updatePressureInfo = () =>{
        const city = this.props.city;
        this.weatherService
            .getCityResourse(city)
            .then(({main})=>{
            if(this._isMounted){
                this.setState({
                    pressure: main.pressure
                })
            }
        }).catch(error=>{
            console.error('Error fetching weather data: ', error);

        })
    }
    
    render(){
        const {pressure} = this.state;
        
        return(
            <div className="pressure-card">
                <img src={gifSecond} alt="" />
                <h1>Pressure</h1>
                <h2>{pressure}PSI/</h2>
            </div>
        )
    }
}
export default Pressure; 