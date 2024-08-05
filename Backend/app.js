require('dotenv').config();
const express = require('express');
const blogs = require('./routes/blogs')
const mongoose = require('mongoose');
const morgan = require('morgan')
const user = require('./routes/user')


const app = express();

//meddleware
app.use(morgan('dev'))
app.use(express.json());


//api routes
app.use('/api/blog', blogs)
app.use('/api/post', user)

//connect to database && listen to a request
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server started on port ' + process.env.PORT);
        })
    })
    .catch(err => { console.log(err); })

