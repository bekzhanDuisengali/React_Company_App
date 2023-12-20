
class WeatherService{
    _apiKey = 'cc1a895873f1a1a0b911fa3dbaccec23';
    _apiKey2 = 'cc1a895873f1a1a0b911fa3dbaccec23';
    _apiKey3 = 'fb2c2e5712f84f8b2f2348503095cf99';
    _apiKey4 = '7b13a507138e7b02f93984bda1a85121';
    _apiKey5 = '40d6ae0424972e3f673fe79881c8a75c';
    _apiKey6 = '902d136d302c573035f07b3f4db17ea7';
    _apiKey7 = 'ca8b8eada0a4f94c6281c4caa6938bd1';
    // Запасные ключи для Апишки
    getResourse = async(url) =>{
        let res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        
        return await res.json();
    }

    getCityResourse = (city) =>{
        return this.getResourse(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${this._apiKey2}`); 
        
    }
    
    getWeekResourses = (city) =>{
        return this.getResourse (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this._apiKey2}`);
        
    }
    
}
export default WeatherService;