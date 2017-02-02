const app = require('../server');
const db = app.get('db');

module.exports = {
	addBadge:()=>{
		db.somequery([],(err, result)=>{
			
		})
	}
}
