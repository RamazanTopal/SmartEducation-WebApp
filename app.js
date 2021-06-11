const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride=require('method-override');
const app=express();
//method override
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//routes
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')
const categoryRoute=require('./routes/categoryRoute')
const userRoute=require('./routes/userRoute')
//template engine
app.set('view engine', 'ejs');
//global variable
global.userIN = null;
//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
//mongoose
mongoose.connect('mongodb://localhost/SmartEdu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
//session
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/SmartEdu' })//connect mongo session
  })
);
//flash message
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})


//route
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);
  app.get('/login', (req, res) => {
    res.status(200).render('login', {
      page_name: 'about',
    });
  });
  app.get('/register', (req, res) => {
    res.status(200).render('register', {
      page_name: 'about',
    });
  });
  app.get('/about', (req, res) => {
    res.status(200).render('about', {
      page_name: 'about',
    });
  });


app.listen(3000,()=>{
    console.log("3000 port listening");
})