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

console.log("\n                     SINGLETON")

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





console.log("\n                     CONSTRUCTOR")

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


console.log("\n                     FACTORY")

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


console.log("\n                     PROTOTYPE")

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


console.log("\n                     FLYWEIGHT")

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


// chain of responsibility
class CarConfig {
    constructor(initialCOST = 19000000) {
        this.sum = initialCOST
    }

    add(supplement) {
        this.sum += supplement
        return this
    }
}

const leather = new CarConfig()
console.log(leather.add(200000).add(25000).add(45000).add(5500).sum)
// front and rear heating individually

const heating = new CarConfig(0)
console.log(heating.add(530000).add(46500).sum)


// iterator


console.log("\n                     ITERATOR")

class MyIterator {
    constructor(data) {
        this.index = 0
        this.data = data
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return {
                        value: this.data[this.index++],
                        done: false
                    }
                    // end
                } else {
                    this.index = 0
                    return {
                        done: true,
                        value: void 0 //undefined
                    }
                }
            }
        }
    }
}

// we can do it easier using gen
function* generator(collection) {
    let index = 0

    while (index < collection.length) {
        yield collection[index++]
    }
}


const iterator = new MyIterator(['Audi', 'BMW', 'Mercedes', 'VolksWagen', 'KIA'])
const gen = generator(['Honda', 'Toyota', 'Nissan'])

for (const val of iterator) {
  console.log('Value: ', val)
}

for (const val of gen) {
    console.log('Value: ', val)
}
//
// console.log(gen.next().value)
// console.log(gen.next().value)
// console.log(gen.next().value)


// Mediator


console.log("\n                     MEDIATOR")

class User {
    constructor(name) {
        this.name = name
        this.room = null
    }

    send(message, to) {
        this.room.send(message, this, to)
    }

    receive(message, from) {
        console.log(`${from.name} => ${this.name}: ${message}`)
    }
}

class ChatRoom {
    constructor() {
        this.users = {}
    }

    register(user) {
        this.users[user.name] = user
        user.room = this
    }

    send(message, from, to) {
        if (to) {
            to.receive(message, from)
        } else {
            Object.keys(this.users).forEach(key => {
                if (this.users[key] !== from) {
                    this.users[key].receive(message, from)
                }
            })
        }
    }
}

const Slava = new User('Slava')
const Madiyar = new User('Madiyar')
const Customer = new User('Yowa')

const room = new ChatRoom()

room.register(Slava)
room.register(Madiyar)
room.register(Customer)

Slava.send('Hello! This is a technical support. Leave here your question', Customer)
Customer.send('Hello! Is someone here?', Madiyar)
Madiyar.send('Hello! Yes, What can I help you?', Customer)


// observer

console.log("\n                     OBSERVER")

class Subject {
    constructor() {
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer)
    }

    init(action) {
        this.observers.forEach(observer => {
            observer.update(action)
        })
    }
}

class Observer {
    constructor(state = 1) {
        this.state = state
        this.initialState = state
    }

    update(action) {
        switch (action.type) {
            case 'INCREMENT':
                this.state = ++this.state
                break
            case 'DECREMENT':
                this.state = --this.state
                break
            case 'ADD':
                this.state += action.payload
                break
            default:
                this.state = this.initialState
        }
    }
}

const stream$ = new Subject()

const car1 = new Observer(9500000)
const car2 = new Observer(4200000)

stream$.subscribe(car1)
stream$.subscribe(car2)

stream$.init({type: 'INCREMENT'})
stream$.init({type: 'DECREMENT'})
stream$.init({type: 'ADD', payload: 256000})

console.log('new price of the car1 is', car1.state)
console.log('new price of the car 2 is', car2.state)




// state


console.log("\n                     STATE")

class Wallet {
    constructor(wallet) {
        this.wallet = wallet
    }
}

class Business extends Wallet {
    constructor() {
        super('business')
    }

    sign() {
        return 'business'
    }
}

class Comfort extends Wallet {
    constructor() {
        super('comfort')
    }

    sign() {
        return 'comfort'
    }
}

class Economy extends Wallet {
    constructor() {
        super('economy')
    }

    sign() {
        return 'economy'
    }
}

class Category {
    constructor() {
        this.states = [
            new Economy(),
            new Comfort(),
            new Business()
        ]
        this.current = this.states[0]
    }

    change() {
        const total = this.states.length
        let index = this.states.findIndex(light => light === this.current)

        if (index + 1 < total) {
            this.current = this.states[index + 1]
        } else {
            this.current = this.states[0]
        }
    }

    sign() {
        return this.current.sign()
    }
}

const category = new Category()
console.log(category.sign())
category.change()

console.log(category.sign())
category.change()

console.log(category.sign())
category.change()


