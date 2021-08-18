import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';

chai.use(chaiHttp);

describe('App', () => {
	it('Should display Welcome to the MediaMall backend API', (done) => {
		chai.request(app).get('/api/v1').end((err, res) => {
			expect(res.status).eql(200);
			expect(res.body).to.be.an('object');
			expect(res.body.status).to.eql('success');
			expect(res.body.data).to.eql('Welcome to the MediaMall backend API');
			done();
		});
	});
});
