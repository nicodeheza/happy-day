const sinon= require('sinon');
const chai= require('chai');
const sinonChai= require('sinon-chai');
const expect= chai.expect;
const server= require('../server');
const chaiHttp= require('chai-http');
chai.use(chaiHttp);
chai.use(sinonChai);

const User= require('../models/User');
const Session= require('./api-routes-test');
const Recover= require('../models/Recover');

const transporter= require('../notifications/nodemailer-transporter');

describe("recover tests",()=>{
    const agent= chai.request.agent(server);
    const testUser={
        email:'test@test.com',
        name:'Nicolas',
        birthday: new Date("4-5-1988"),
        password: '1234'
    }
    before(async()=>{
        try {
            await User.deleteMany({});
            await Session.deleteMany({});
            await Recover.deleteMany({});

            await agent
                 .post('/api/singup')
                 .send(testUser);

        } catch (err) {
            throw err;
        }
    });
    after(()=>agent.close());

    let recoverId;

    describe("Post: /recover", ()=>{
        it("The recover must be saved in the database correctly and the mail must be sent correctly", async()=>{
            try {
                let emailNoti= sinon.stub(transporter, 'sendMail');
                await agent
                .post('/recover')
                .send({email: testUser.email})
                .then(res=>{
                    expect(res.body.message).to.equal("Email sended");
                });
                const recover= await Recover.findOne({email: testUser.email});
                recoverId= recover._id;
                expect(new Date(recover.expire).getTime()).to.be.greaterThan(new Date().getTime());
                expect(recover.email).to.equal(testUser.email);
                expect(emailNoti).to.have.been.calledOnce;
                expect(emailNoti).to.have.been.calledWith(sinon.match({to: testUser.email}));
                expect(emailNoti).to.have.been.calledWith(sinon.match({html: sinon.match(new RegExp(recover._id,'gi'))}));
                
            } catch (err) {
                throw err;
            }
        });
    });
    describe("Get: /recover/:id - success",()=>{
        it("if recover exist and si not expire return recover form",(done)=>{
            agent
            .get(`/recover/${recoverId}`)
            .end((err,res)=>{
                expect(res.type).to.equal('text/html');
                done();
            });
        });
    });
    describe("Put: /recover/:id - success",()=>{
        const newPassword= '4321';
        it("Password must be updat",(done)=>{
            agent
            .put(`/recover/${recoverId}`)
            .send({password: newPassword})
            .end((err,res)=>{
                expect(res.body.message).to.equal('Password updated');
                done();
            });
        });
        it("recover must be deleted form db", async()=>{
            const recover= await Recover.findById(recoverId);
            expect(recover).to.equal(null);
        });
        it("log in with new password",(done)=>{
            agent
            .post('/api/login')
            .send({
                email:testUser.email,
                password: newPassword
            })
            .end((err, res)=>{
               expect(res.status).to.equal(200);
               expect(res.type).to.equal('application/json');
               expect(res.body.auth).to.equal(true);
                done();
            });
        });
    });
    describe("Get: /recover/:id - unsuccess",()=>{
        let rid;
        it("if recover don't exist send message",(done)=>{
            agent
            .get(`/recover/${recoverId}`)
            .end((err,res)=>{
                expect(res.type).to.equal('text/html');
                expect(res.text).to.equal('Link expires, get a new one');
                done();
            });
        });
        it("if recover exist but is expire",async()=>{
            try {
                await agent
                .post('/recover')
                .send({email: testUser.email})
                .then(res=>{
                    expect(res.body.message).to.equal("Email sended");
                });
                const recover= await Recover.findOne({email: testUser.email});
                rid=recover._id;
                recover.expire= new Date(Date.now() - 1000*60*60*24);
                await recover.save();

                await agent
                .get(`/recover/${rid}`)
                .then( res=>{
                expect(res.type).to.equal('text/html');
                expect(res.text).to.equal('Link expires, get a new one');
            });  
            } catch (err) {
                throw err;
            }

        });
        it("recover must be deleted form db", async()=>{
            const recover= await Recover.findById(rid);
            expect(recover).to.equal(null);
        });
        
    });

    describe("Put: recover/:id - unsuccess", ()=>{
        let rrid;
        it("recover is expire", async()=>{
            try {
                await agent
                .post('/recover')
                .send({email: testUser.email})
                .then(res=>{
                    expect(res.body.message).to.equal("Email sended");
                });
                const recover= await Recover.findOne({email: testUser.email});
                rrid= recover._id;
                recover.expire= new Date(Date.now() - 1000*60*60*24);
                await recover.save();

                await agent
                .put(`/recover/${rrid}`)
                .send({password: "5555"})
                .then( res=>{
                expect(res.body.message).to.equal('Link expires, get a new one');
            });  
            } catch (err) {
                throw err;
            }
        });
        it("recover must be deleted form db", async()=>{
            const recover= await Recover.findById(rrid);
            expect(recover).to.equal(null);
        });
    });
});


