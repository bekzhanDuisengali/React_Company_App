import './cityChange.scss';
import React, { Component } from 'react';

class CityChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ''
        };
    }

    onValueChange = (e) => {
        this.setState({
            city: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCityChange(this.state.city);
        this.setState({
            city: ''
        });
    }


    render() {
        return (
            <div className="add">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <path d="M70.7841 62.0517L56.8095 48.0771C56.1787 47.4464 55.3237 47.0959 54.4267 47.0959H52.1419C56.0105 42.1481 58.3093 35.9247 58.3093 29.1546C58.3093 13.0495 45.2598 0 29.1546 0C13.0495 0 0 13.0495 0 29.1546C0 45.2598 13.0495 58.3093 29.1546 58.3093C35.9247 58.3093 42.1481 56.0105 47.0959 52.1419V54.4267C47.0959 55.3237 47.4464 56.1787 48.0771 56.8095L62.0517 70.7841C63.3693 72.1017 65.4998 72.1017 66.8034 70.7841L70.7701 66.8174C72.0876 65.4998 72.0876 63.3693 70.7841 62.0517ZM29.1546 47.0959C19.2449 47.0959 11.2133 39.0784 11.2133 29.1546C11.2133 19.2449 19.2308 11.2133 29.1546 11.2133C39.0644 11.2133 47.0959 19.2308 47.0959 29.1546C47.0959 39.0644 39.0784 47.0959 29.1546 47.0959Z" fill="white"/>
                    </svg>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit} className='add__form'>
                        <input
                            type="text"
                            placeholder='press option and start search'
                            onChange={this.onValueChange}
                            value={this.state.city}
                        />
                    </form>

                </div>
                
            </div>
            
        );
    }
}

export default CityChange;
