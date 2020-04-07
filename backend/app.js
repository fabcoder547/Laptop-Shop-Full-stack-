require('dotenv').config()


const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require("cors");
//myroutes
const authRouters = require('./routes/auth');
const userRoutes = require('./routes/user');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');



// connecting to the Database....
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(() => {
    console.log('connected successfully');
}).catch(err => {
    console.log('not connected');

})

// MIDDLEWARES ARE HERE
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors())
app.use('/api', authRouters);
app.use('/api', userRoutes);
app.use('/api', brandRoutes);
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.send('Hey Laptop shop');
})

app.listen(PORT, () => {
    console.log('server is running at 5000');
})