import express from 'express';
import http from 'http';
import fs from 'fs';
import colour from 'colour';
// import './models'
import Person from 'person-service';
import Accounting from './controllers/accHead';
import database from './database';

const app = express();
const server = http.createServer(app);

const options = JSON.parse(fs.readFileSync('package.json'));

database.connect('mongodb://mongodb/test-db', (err) => { if (err) throw err; });


setTimeout(() => {
	Person.addPerson({ name: 'Zubair', age: 30 });
	Person.addPerson({ name: 'Saleem', age: 31 });

	Accounting.gettypeHead('Expense')
		.then((data) => {
			Accounting.addChildHead({ name: 'Petrol', type: data[0]._id, openingBalance: 2000 });
			Accounting.addChildHead({ name: 'Food', type: data[0]._id, openingBalance: 300 });
		})
		.catch(err => console.log(err));

	Accounting.gettypeHead('Income')
		.then((data) => {
			Accounting.addChildHead({ name: 'Sales', type: data[0]._id, openingBalance: 2000 });
		})
		.catch(err => console.log(err));
}, 3000);


app.get('/acc-type-head', (req, res) => {
	Accounting.gettypeHead()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			throw err;
		});
});

app.get('/acc-child-head/:type', (req, res) => {
	Accounting.getChildHead(req.params.type)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			throw err;
		});
});
app.get('/', (req, res) => {
	Person.getPerson()
		.then((data) => {
			console.log(colour.green('[web] Hello Docker'));
			res.send({ cound: data.length, data });
		})
		.catch((err) => {
			throw err;
		});
});

server.listen(options.webServer.port, () => {
	console.log('Listening on port 3000');
});
