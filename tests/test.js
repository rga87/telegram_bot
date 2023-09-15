const chai = require('chai');
const chaiHttp = require('chai-http');
//------------------------------------------------------------------------------------------------
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
//------------------------------------------------------------------------------------------------
before(done => {
    console.log('  START TESTS\n-------------------------');
    done();
});
//------------------------------------------------------------------------------------------------
describe('/TEST BOT REQUESTS', () => {
    it('check "/sendMessage" without value', (done) => {
      chai.request(server)
        .post('/bot/sendMessage')
        .end((error, res) => {
          if(error){
                  console.log(error);
              }
              res.should.have.status(422);
              res.body.should.have.property('errors')
              done();
            });
    });
    it('check "/sendMessage" without name user', (done) => {
        chai.request(server)
          .post('/bot/sendMessage')
          .send({'phone': '89111111111', 'text': 'text'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(422);
            res.body.should.have.property('errors')
            done();
          });
    });
    it('check "/sendMessage" without phone user', (done) => {
        chai.request(server)
          .post('/bot/sendMessage')
          .send({'name': 'name', 'text': 'text'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(422);
            res.body.should.have.property('errors')
            done();
          });
    });
    it('check "/sendMessage" without text user', (done) => {
        chai.request(server)
          .post('/bot/sendMessage')
          .send({'name': 'name', 'phone': '89111111111'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(422);
            res.body.should.have.property('errors')
            done();
          });
    });
    it('check "/sendMessage" correct request', (done) => {
      chai.request(server)
        .post('/bot/sendMessage')
        .send({'name': 'name', 'phone': '89111111111','text':'text'})
        .end((error, res) => {
          if(error){
              console.log(error);
          }
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Ваше обращение принято в работу.Мы обязательно свяжемся с Вами в ближайшее время');
          done();
        });
    });
});
//------------------------------------------------------------------------------------------------
after(done => {
  console.log('-------------------------\n   END TESTS');
  done();
});