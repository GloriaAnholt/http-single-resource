const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const httpserver = require('../lib/http-server');


describe('Single-resource http server', () => {

  let server = chai.request(httpserver);

  it('hits the root and gets a 200 Ok', done => {
    server
      .get('/')
      .end((err, res)=> {
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      })
  });

  it('retrieves all files in the data folder by name', done => {

    let testHtml = '<h2>The data store contains the following files: </h2><ul>\n\n' +
      '<li>boston.json</li>' +
      '<li>los_angeles.json</li>' +
      '<li>miami.json</li>' +
      '<li>new_york.json</li>' +
      '<li>san_francisco.json</li>' +
      '</ul>' +
      'To retrieve a file, please request by the file name (no extension)';

    server
      .get('/data')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, testHtml);
        done();
      })
  })


});

