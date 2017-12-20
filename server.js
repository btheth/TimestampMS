var express = require('express');
var logger = require('morgan');
var app = express();

//function for turning date into desited format for output
function dateToString(date) {
	date = date.toString();

	//if we got an invalid date, return null here
	if (date === "Invalid Date") return null;

	//otherwise keep parsing
	var month = date.split(' ')[1];
	var day = date.split(' ')[2];
	var year = date.split(' ')[3];

	switch (month){
		case "Jan": month = "January ";
					break;
		case "Feb": month = "February ";
					break;
		case "Mar": month = "March ";
					break;
		case "Apr": month = "April ";
					break;
		case "May": month = "May ";
					break;
		case "Jun": month = "June ";
					break;
		case "Jul": month = "July ";
					break;
		case "Aug": month = "August ";
					break;
		case "Sep": month = "September ";
					break;
		case "Oct": month = "October ";
					break;
		case "Nov": month = "November ";
					break;
		case "Dec": month = "December ";
					break;
	}

	return month + day + ", " +  year;
}

//set logger
app.use(logger());

//if we revieve GET request for '/ts', continue parsing query
app.get('/ts', function(req,res) {
	res.type('application/json');

	//arrays to make sure query is correctly formatted like '/ts?....'
	var arr = req.url.split('/')
	var queryArr = req.url.split('?')

	//if not correctly formatted, return object with null values
	if (arr.length !== 2 || queryArr.length !== 2) {
		res.status(405).json({unix: null, natural: null});
	} else {
		//if it is correctly formatted, parse query
		var query = queryArr[1];

		//return object variables
		var num;
		var str;

		//check if query is a number
		if (!isNaN(query)) {
			//if so parse it as a unix time, then call dateToString function on it and return result with status 200
			num = Number(query);
			str = dateToString(new Date(num * 1000));

			var obj = {
				unix: num,
				natural: str,
			}

			res.status(200).json(obj);
		} else {
			//if query is not a number, try to parse it like a date, first getting rid of any spaces
			str = new Date(query.split('%20').join(' '));
			num = str.getTime() / 1000;
			str = dateToString(str);

			//if date dateToString returned null, return object with null values and status of 405
			if (!str) {
				res.status(405).json({unix: null, natural: null});
			} else {
				//otherwise set object values
				var obj = {
					unix: num,
					natural: str,
				}

				//return valid object with status of 200
				res.status(200).json(obj);
			}
		}


	}
});

//otherwise, if we get any other kind of request, return status of 405 with fields in object null
app.use(function(req,res) {
	res.type('application/json');
	res.status(405).json({unix: null, natural: null});
});

//listen on port passed as 2nd param if not null, otherwise listen on port 1337
if (process.argv[2]) {
	app.listen(process.argv[2]);
} else {
	app.listen(1337);
}
