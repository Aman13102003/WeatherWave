const { response } = require('express');
const  express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html");
    
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = '3d71f777edbeb5eece93b8d3296e54dd';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            const htmlContent = `
                <h1>The temperature in ${query} is ${temp} degrees Celsius</h1>
                <p>The weather is currently ${description}</p>
                <img src="${imgURL}" alt="Weather icon">
            `;
            res.send(htmlContent);
        });
    });
});
app.listen(3000, () => { console.log("our server is running at port 3000"); }
)