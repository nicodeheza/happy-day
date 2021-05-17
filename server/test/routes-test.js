const chai= require('chai');
const assert = chai.expect;

const server= require('../server');

const chaiHttp=require('chai-http');
chai.use(chaiHttp);

const User= require('../models/User');
const { expect } = require('chai');

const newUser={
    email:'nicolasdeheza@hotmil.com',
    name:'Nicolas',
    birthday: new Date("4-5-1988"),
    password: '1234'
}

describe("Routes Testing", ()=>{
    before(async ()=>{
        User.deleteMany({}, (err, data)=>{
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

});
