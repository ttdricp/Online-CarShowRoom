const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser=require('body-parser');
const PurchaseRoute = require('./app/router/Purchase');
const regRoute = require('./app/router/regRouter')
const AdminRoute = require('./app/router/Admin')
const PORT = process.env.PORT || 3000
const app = express()

const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

app.use('/purchase',PurchaseRoute)
app.use('/auth', regRoute)
app.use('/admin', AdminRoute)



app.use(express.static("views"))

app.set('view engine', 'ejs')
app.use('/styles',express.static(__dirname +'/styles'));
app.use('/fonts',express.static(__dirname +'/fonts'));
app.use('/images',express.static(__dirname +'/images'));

app.use("/", require("./routes/"));

app.use("/accessories", require("./routes/accessories"));
app.use("/about", require("./routes/about"));
app.use("/SignUp", require("./routes/registration"));
app.use("/SignIn", require("./routes/login"));

app
    .get("/", (req, res) => {
        res.render("index");
    })
    .get("/login", (req, res) => {
        res.render("login");
    })
    .get("/registration", (req, res) => {
        res.render("registration");
    })



    .get('/create',function (req,res){
    res.render('create')
})
    .get('/update',function (req,res){
    res.render('update')

})
    .get('/delete',function (req,res){
    res.render('delete')

})
    .get('/results',function (req,res){
    res.render('results')

})
    .get('/find',function (req,res) {
        res.render('find')
    });

const start = async () => {
    try{
        await mongoose.connect('mongodb+srv://tditp:Asd74625@cluster0.oc6qnml.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () =>
            console.log(`App listening at http://localhost:${PORT}`)
        );}
    catch (e) {
        console.log(e)
    }

}
start()

//CREATIONAL
//constructor with singleton

class Database {
    constructor(data) {
        if (Database.exists) {
            return Database.instance
        }
        Database.instance = this
        Database.exists = true
        this.data = data
    }

    getData() {
        return this.data
    }
}

const mongo = new Database('MongoDB: mongodb+srv://tditp:Asd74625@cluster0.oc6qnml.mongodb.net/?retryWrites=true&w=majority')
console.log(mongo.getData())

const postgresql = new Database('PostgreSQL')
console.log(postgresql.getData())






class Server {
    constructor(ip, port) {
        this.ip = ip
        this.port = port
    }

    get url() {
        return `http://${this.ip}:${this.port}`
    }
}

function aws(server) {
    server.isAWS = true
    server.awsInfo = function() {
        return server.url
    }
    return server
}

function azure(server) {
    server.isAzure = true
    server.port += 500
    return server
}

const s1 = aws(new Server('localhost', 3000))
console.log(s1.isAWS)
console.log(s1.awsInfo())

const s2 = azure(new Server('98.87.76.12', 1000))
console.log(s2.isAzure)
console.log(s2.url)






//factory

class StandardMembership {
    constructor(name) {
        this.name = name
        this.cost = 0
    }
}

class PremiumMembership {
    constructor(name) {
        this.name = name
        this.cost = 500
    }
}

class MemberFactory {
    static list = {
        standard: StandardMembership,
        premium: PremiumMembership
    }

    create(name, type = 'standard') {
        const Membership = MemberFactory.list[type] || MemberFactory.list.standard
        const member = new Membership(name)
        member.type = type
        member.define = function() {
            console.log(`${this.name} (${this.type}): ${this.cost}`)
        }
        return member
    }
}

const factory = new MemberFactory()

const members = [,
    factory.create('Slava', 'premium'),
    factory.create('guest', 'standard'),
    factory.create('Madiyar', 'premium'),
    factory.create('Petr')
]

console.log(members)

members.forEach(m => {
    m.define()
})

//prototype
const car = {
    model: 'Nissan Stegea',

    init() {
        console.log(`Customer ${this.customer} would like to look at ${this.model}`)
    }
}

// const carWithModel = Object.create(car,{
//     model: {
//         value: 'Nissan Stagea'
//     }
// })

const carWithCustomer = Object.create(car, {
    customer: {
        value: 'Vyacheslav'
    }
})

console.log(carWithCustomer.__proto__ === car)

carWithCustomer.init()



// STRUCTURAL
// flyweight -- like a cache

class Car {
    constructor(model, price) {
        this.model = model
        this.price = price
    }
}

class CarFactory {
    constructor() {
        this.cars = []
    }

    create(model, price) {
        const candidate = this.getCar(model)
        if (candidate) {
            return candidate
        }

        const newCar = new Car(model, price)
        this.cars.push(newCar)
        return newCar
    }

    getCar(model) {
        return this.cars.find(car => car.model === model)
    }
}
// it will be changed on pictures
const Cfactory = new CarFactory()

const bmwX6 = Cfactory.create('bmw', 10000)
const audi = Cfactory.create('audi', 12000)
const bmwX3 = Cfactory.create('bmw', 8000)

console.log(bmwX3 === bmwX6)