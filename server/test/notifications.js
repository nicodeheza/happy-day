require('dotenv').config();
const sinon= require('sinon');
const chai= require('chai');
const sinonChai= require('sinon-chai');
const expect= chai.expect;
const server= require('../server');
const chaiHttp= require('chai-http');
chai.use(chaiHttp);
chai.use(sinonChai);

const User= require('../models/User');
const Event= require('../models/Event');
const Reminder= require('../models/Reminder');
const Session= require('./api-routes-test');

const sendNotifiactions= require('../notifications/sendNotifiactions');
const transporter= require('../notifications/nodemailer-transporter');
const webpush= require('../notifications/webpush');


describe("Notifications test",()=>{
    const agent= chai.request.agent(server);
    let subscription= {sub:'subciprion data'};
    const testUser={
        email:'test@test.com',
        name:'Nicolas',
        birthday: new Date("4-5-1988"),
        password: '1234'
    };
    const eventsToAdd=[
        {
            event: 'birthday',
            type: '',
            personName: 'today',
            date: new Date(),
            reminders:[
                {title:'The Same Day', date: new Date()}
            ]
        },
        {
            event: 'anniversary',
            type: 'move',
            personName: 'tomorrow',
            date: new Date(Date.now() + 1000*60*60*24),
            reminders:[
                {title:'1 Days Before', date: new Date()}
            ]
        },
        {
            event: 'birthday',
            type: '',
            personName: 'nextWeek',
            date: new Date(Date.now() + 1000*60*60*24*7),
            reminders:[
                {title:'1 Weeks Before', date: new Date()}
            ]
        }];

    before(async()=>{
        try {
            await User.deleteMany({});
            await Event.deleteMany({});
            await Reminder.deleteMany({});
            await Session.deleteMany({});
   
               await agent
                .post('/api/singup')
                .send(testUser)
                .then(res=>console.log(res.body));
    
                await  agent
                .post('/api/noti-sub')
                .send(subscription)
                .then(res=>console.log(res.body));

            for(let i=0; i< eventsToAdd.length; i++){
                let event= eventsToAdd[i];
                await agent
                .post('/api/add')
                .send(event)
                .then(res=>console.log(res.body));
            };

      

        } catch (err) {
            throw err;
        }
    });

    after(()=>agent.close());

   describe("emial and push notifications",()=>{
       it("notifications must be sent correctly", async ()=>{
            let email= sinon.stub(transporter, 'sendMail');
            let push= sinon.stub(webpush, 'sendNotification');
            await sendNotifiactions();
            expect(email).to.have.callCount(3);
            expect(push).to.have.callCount(3);
            expect(push).to.always.have.been.calledWith(subscription);
            expect(email).to.always.have.been.calledWith(sinon.match({to: testUser.email}));
            expect(email).to.have.been.calledWith(sinon.match({subject: sinon.match(new RegExp(eventsToAdd[0].personName, 'gi'))}));
            expect(email).to.have.been.calledWith(sinon.match({subject: sinon.match(new RegExp(eventsToAdd[1].personName, 'gi'))}));
            expect(email).to.have.been.calledWith(sinon.match({subject: sinon.match(new RegExp(eventsToAdd[2].personName, 'gi'))}));
            expect(email).to.have.been.calledWith(sinon.match({subject: sinon.match(new RegExp(eventsToAdd[0].event, 'gi'))}));
            expect(email).to.have.been.calledWith(sinon.match({subject: sinon.match(new RegExp(eventsToAdd[1].event, 'gi'))}));
            expect(email).to.have.been.calledWith(sinon.match({subject: sinon.match(new RegExp(eventsToAdd[2].event, 'gi'))}));
            
            email.restore();
            push.restore();
       });
       it("if email is false and push true only send push", async()=>{
            await agent.put('/api/emailNotification').then(res=>console.log(res.body));

            let email= sinon.stub(transporter, 'sendMail');
            let push= sinon.stub(webpush, 'sendNotification');
            await sendNotifiactions();
            expect(email).to.have.callCount(0);
            expect(push).to.have.callCount(3);

            email.restore();
            push.restore();
       });
       it("if email is true and push false only send email", async()=>{
        await agent.put('/api/emailNotification').then(res=>console.log(res.body));

        const user= await User.findOne({email: 'test@test.com'});
        user.browserNotification= null;
        await user.save();

        let email= sinon.stub(transporter, 'sendMail');
        let push= sinon.stub(webpush, 'sendNotification');
        await sendNotifiactions();
        expect(email).to.have.callCount(3);
        expect(push).to.have.callCount(0);

        email.restore();
        push.restore();
   });
   
   });
});

