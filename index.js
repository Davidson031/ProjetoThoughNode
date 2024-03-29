const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const thoughtsRouter = require("./routes/thoughtsRoutes");
const authRouter = require("./routes/authRoutes");
const ThoughtController = require("./controllers/ThoughtsController");

const app = express();
const conn = require("./db/conn");

//chamando models
const Thought = require("./models/Thought");
const User = require("./models/User");

//----configurando engine do handlebars------
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


//-----para receber respostas do body--------//
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());


//-------------onde guardar as sessions-----------
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require("path").join(require("os").tmpdir(), "sessions"),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
);


//-----configuração flash messages----------------
app.use(flash());


//configurando public para usar css e outros estaticos
app.use(express.static("public"));


//pegando a session da requisição e mandando para os res
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
})

app.use("/thoughts", thoughtsRouter);
app.use("/", authRouter);
app.use("/", ThoughtController.showThoughts);


conn.sync().then(() => {
    app.listen(3000);
}).catch((err) => console.log(err));