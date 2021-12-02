const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places, url} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});
const sample = array => array[Math.floor(Math.random()*array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000) ;
        const price = Math.floor(Math.random() * 20) + 10 ;
        const camp = new Campground({
            author: '6192dfb1386f7a182fed2020',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: `${sample(url)}`,
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum delectus neque, consectetur ex cupiditate facere sapiente ut debitis laborum mollitia explicabo sint blanditiis necessitatibus pariatur adipisci doloremque dolorum a in?',
            price
        })
        await camp.save();
        
    }
}

seedDB().then(() => {
  mongoose.connection.close();  
})