const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');



module.exports = function auth(req, res, next){
	const token = req.cookies.xauthtoken

	if(!token) return res.status(401).redirect('/login')

	

try {
const decoded = jwt.verify(token, 'jwtPrivateKey');
	req.user= decoded;
	next();
}


catch (ex){
	res.status(400).send('Invalid token.');
}
}

