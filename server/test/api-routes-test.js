const chai= require('chai');
const expect= chai.expect;

const server= require('../server');

const chaiHttp=require('chai-http');
chai.use(chaiHttp);

const mongoose= require('mongoose');
const User= require('../models/User');
const Event= require('../models/Event');
const Reminder= require('../models/Reminder');

const Session= mongoose.model('Session', new mongoose.Schema({}, { strict: false }));


const newUser={
    email:'nicolasdeheza@hotmil.com',
    name:'Nicolas',
    birthday: new Date("4-5-1988"),
    password: '1234'
}

describe("Routes Testing", ()=>{
    before( ()=>{
        User.deleteMany({}, (err, data)=>{
            if(err)console.log(err);
        });
        Event.deleteMany({}, (err, data)=>{
            if(err)console.log(err);
        });
        Reminder.deleteMany({}, (err, data)=>{
            if(err)console.log(err);
        });

        
        Session.deleteMany({}, (err, data)=>{
            if(err)console.log(err);
        });
        
    });
    const agent= chai.request.agent(server);
    after(()=>agent.close());

    describe("Post to: /api/singup", ()=>{
        it("Add new user",  (done)=>{
          
                agent
                .post('/api/singup')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newUser)
                .end((err, res)=>{
                    expect(res.type).to.equal('application/json');
                    expect(res.body.auth).to.equal(true);
                    done();
                });
        });

        it("get a message if the user already exists", (done)=>{
            agent
            .post('/api/singup')
            .send(newUser)
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.message).to.equal('There is already an account  with this email');
                done();
            });
        });

        it("the user should be loaded correctly in the db", async()=>{
            user= await User.findOne({email: newUser.email});
            expect(user).to.have.property('_id');
            expect(user.name).to.equal(newUser.name);
            expect(new Date(user.birthday).getTime()).to.equal(newUser.birthday.getTime());
            expect(user.password).to.not.be.equal(newUser.password);
            
        });
    });

    describe("Get to: /api - loged", ()=>{
        it("retun auth true if you are auth",(done)=>{
            agent
            .get('/api')
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.auth).to.equal(true);
                done();
            });
        });
    });

    describe("Get to: /api/logout", ()=>{
        it("logout",(done)=>{
            agent
            .get('/api/logout')
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.auth).to.equal(false);
                done();
            });
        });
        it("logout if you are logout",(done)=>{
            agent
            .get('/api/logout')
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.auth).to.equal(false);
                done();
            });
        });

    });
    describe("Get to: /api - logout", ()=>{
        it("retun auth true if you are auth",(done)=>{
            agent
            .get('/api')
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.auth).to.equal(false);
                done();
            });
        });
    });
    describe("Post to: /api/login",()=>{
        it("login unsuccessfully with rong password",(done)=>{
            agent
            .post('/api/login')
            .send({
                email:newUser.email,
                password: 'rongPassword'
            })
            .end((err, res)=>{
               expect(res.status).to.equal(401);
                done();
            });
        });
        it("login unsuccessfully with rong user",(done)=>{
            agent
            .post('/api/login')
            .send({
                email:'test@test.com',
                password: newUser.password
            })
            .end((err, res)=>{
               expect(res.status).to.equal(401);
                done();
            });
        });
        it("login unsuccessfully with rong user and password",(done)=>{
            agent
            .post('/api/login')
            .send({
                email:'test@test.com',
                password: 'rongPassword'
            })
            .end((err, res)=>{
               expect(res.status).to.equal(401);
                done();
            });
        });
        it("login successfully",(done)=>{
            agent
            .post('/api/login')
            .send({
                email:newUser.email,
                password: newUser.password
            })
            .end((err, res)=>{
               expect(res.status).to.equal(200);
               expect(res.type).to.equal('application/json');
               expect(res.body.auth).to.equal(true);
                done();
            });
        });
    });

    describe("Post to: /api/add",()=>{
        const EventDate= new Date('5-20-1999');
        const newEvent={
            event: 'birthday',
            type: '',
            personName: 'Test',
            date: EventDate,
            reminders:[
                {title:'The Same Day', date: EventDate},
                {title:'1 Days Before', date:new Date( EventDate.getTime() - 1000*60*60*24)},
                {title:'1 Weeks Before', date:new Date(EventDate.getTime() - 1000*60*60*24*7)},
            ]
        };
        it("Add new event successfully", (done)=>{
            agent
            .post('/api/add')
            .send(newEvent)
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.message).to.equal('Event Added');
                done();
            });
        });
        it("Data must be saved corectly in db", async()=>{
            try {
                const user= await User.findOne({email: 'nicolasdeheza@hotmil.com'});
                const event= await Event.findOne({user: user._id}).populate('reminders').exec();

                expect(event).to.have.property('_id');
                expect(event).to.have.property('type', 'birthday');
                expect(event).to.have.property('AnniversaryType','');
                expect(event).to.have.property('personName','Test');
                expect(event.date.getTime()).to.equal(EventDate.getTime());
                expect(event.reminders).to.have.lengthOf(newEvent.reminders.length);
                for(let i=0; i<event.reminders.length; i++){
                    const reminder= event.reminders[i];
                    expect(reminder).to.have.property('_id');
                    expect(reminder.name).to.be.a('string');
                    expect(reminder.date).to.be.a('date');
                    expect(reminder.event.toString()).to.equal(event._id.toString());
                }

            } catch (err) {
                throw err
            }
        });
    });
    describe("Put to: /api/edit",async()=>{
        let eventEdited;
        before(async()=>{
            try {
                const user= await User.findOne({email: 'nicolasdeheza@hotmil.com'});
                const event= await Event.findOne({user: user._id}).populate('reminders').exec();
                eventEdited={
                    _id: event._id,
                    event: 'anniversary',
                    type: 'Move',
                    personName: 'tets-edited',
                    date: new Date('5-5-1995'),
                    reminders:[event.reminders[0], 
                    { 
                     name:"2 Days Before",
                     date: new Date( new Date(event.date).getTime() - 1000*60*60*48 ),
                     event: event._id
                    }],
                    removeReminders: []
                }
                for(let i=1; i<event.reminders.length; i++){
                    eventEdited.removeReminders.push(event.reminders[i]._id);
                }
            } catch (err) {
                throw err;
            }
        });

        it("edit event successfully", (done)=>{
            agent
            .put('/api/edit')
            .send(eventEdited)
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.message).to.equal('Event Edited');
                done();
            });
        });
        it("event updated corectly in db", async()=>{
            try {
                const user= await User.findOne({email: 'nicolasdeheza@hotmil.com'});
                const event= await Event.findOne({user: user._id}).populate('reminders').exec();
                expect(event.type).to.equal(eventEdited.event);
                expect(event.AnniversaryType).to.equal(eventEdited.type);
                expect(event.personName).to.equal(eventEdited.personName);
                expect(new Date(event.date).getTime()).to.equal(eventEdited.date.getTime());
                expect(event.user.toString()).to.equal(user._id.toString());
                expect(event._id.toString()).to.equal(eventEdited._id.toString());
                expect(event.reminders).to.have.lengthOf(eventEdited.reminders.length);
                for(let i=0; i<event.reminders.length; i++){
                    expect(event.reminders[i].name).to.equal(eventEdited.reminders[i].name);
                    expect(event.reminders[i].date).to.be.a('date');
                    expect(event.reminders[i].event.toString()).to.equal(event._id.toString());
                }
            } catch (err) {
                throw err;
            }
        });
    });
    describe("Get to: /api/events",()=>{
        before((done)=>{
            for(let i=1; i<13; i++){
                const newEvent={
                    event: 'birthday',
                    type: '',
                    personName: `Test${i}`,
                    date: new Date(`${i}-20-1999`),
                    reminders:[
                        {title:'The Same Day', date: new Date(`${i}-20-1999`)}
                    ]
                };

                agent
                .post('/api/add')
                .send(newEvent)
                .end((err, res)=>{
                    if(i===12){
                        done();
                    }
                });
        
            }

        });

        it("must retun an object",(done)=>{
            agent
            .get('/api/events')
            .end((err, res)=>{
                //console.log(res.body);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.be.a('object');
                done();
            });
        });
        it("the object must have the correct structure",(done)=>{
            agent
            .get('/api/events')
            .end((err, res)=>{
                for(let month in res.body){
                    expect(parseInt(month)).to.be.a('number');
                    for(let day in res.body[month]){
                        expect(parseInt(day)).to.be.a('number');
                        expect(res.body[month][day]).to.be.an('array');
                        expect(res.body[month][day][0]).to.be.an('object');
                        expect(res.body[month][day][0]).to.have.property('_id');
                        expect(res.body[month][day][0]).to.have.property('type');                    
                        expect(res.body[month][day][0]).to.have.property('AnniversaryType');                       
                        expect(res.body[month][day][0]).to.have.property('personName');
                        expect(res.body[month][day][0]).to.have.property('date');
                        expect(res.body[month][day][0]).to.have.property('user');
                        expect(res.body[month][day][0]).to.have.property('reminders');
                    }
                }
                done();
            });
        });
    });

    describe("Delete to: /api/delete",()=>{
        let eventToDelete;
        before(async()=>{
            const event= await Event.findOne({type: "birthday"});
            eventToDelete={
                eventId: event._id,
                remindersId: event.reminders
            };
        });
        it("delete element",(done)=>{
            agent
            .delete('/api/delete')
            .send(eventToDelete)
            .end((err,res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.message).to.equal('Event Deleted');
                done();
            });
        });
        it("event and reminders must be deleted form the db", async()=>{
            try {
                const event= await Event.findById(eventToDelete.eventId);
                let reminders= await Reminder.find({event: eventToDelete.eventId});
                expect(event).to.equal(null);
                expect(reminders).to.have.lengthOf(0);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Get: /api/emailNotification", ()=>{
        it("get email notification estatus",(done)=>{
            agent
            .get('/api/emailNotification')
            .end((err, res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.mailNotification).to.equal(true);
                done();
            });
        });
    });
    describe("Put: /api/emailNotification", ()=>{
        it("emailNotification must be false",(done)=>{
            agent
            .put('/api/emailNotification')
            .end((err,res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.mailNotification).to.equal(false);
                done();
            });
        });
        it("emailNotification must be true",(done)=>{
            agent
            .put('/api/emailNotification')
            .end((err,res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.mailNotification).to.equal(true);
                done();
            });
        });
    });

    describe("Post: /api/noti-sub",()=>{
        let notiSub={sub: "ok"};

        it("add subcription", (done)=>{
            agent
            .post('/api/noti-sub')
            .send(notiSub)
            .end((err,res)=>{
                expect(res.type).to.equal('application/json');
                expect(res.body.message).to.equal('subscription added');
                done();
            });
        });
        it("data must added corectly in db", async()=>{
            try {
                const user= await User.findOne({email: newUser.email});
                expect(user.browserNotification).to.be.an('object');
                expect(user.browserNotification).to.have.property('sub', "ok");
            } catch (err) {
                throw err;
            }
        });
    });

});

module.exports= Session;