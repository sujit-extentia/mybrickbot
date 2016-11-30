var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// api routers
app.use('/api', users);

// Render index file
app.use('/sign-up', function(req, res, next) {
    res.render('sign-up.html');
});



// Render readmore
app.use('/readmore', function(req, res, next) {
    res.render('readmore.html');
});

// Render readmore
app.use('/availability', function(req, res, next) {
    res.render('availability.html');
});

// Render readmore
app.use('/feature', function(req, res, next) {
    res.render('feature.html');
});

// Render readmore
app.use('/otherfeature', function(req, res, next) {
    res.render('otherfeature.html');
});

// Render readmore
app.use('/otherskills', function(req, res, next) {
    res.render('otherskills.html');
});

//Code for form submission
app.post('/contact-mail', function(req, res, next){

	try{
	var request = require('request');
		var recaptchaKey = 'g-recaptcha-response';
		var recaptcha1 = req.body[recaptchaKey];
		//console.log("recaptcha1 before encode>>" + recaptcha1);
		//console.log("recaptcha1 after encode>>" + encodeURIComponent(recaptcha1));
		
		request.get(
			'https://www.google.com/recaptcha/api/siteverify?secret=6LfyTAwUAAAAAOrYK-uJ7bkIKLe-N73un1tAoSNm&response=' + encodeURIComponent(recaptcha1),
			
			function (error, response, body) {
				if(error) {
					console.log('ERROR>>>>>>>: ' + error);
				}
				var temp = response.body;
				var parsed = JSON.parse(temp);
				console.log('Response2: ', parsed["success"]);
				if(parsed["success"]) {
					console.log("In Captcha Success>>");
					//Code to sendout email.
					sendMail(req.body);
					res.json({ success: true, message:"Captcha validation succedded & mail sent" });
					return true;
				} else {
					console.log("In Captcha Error>>");
					res.json({ success: false, message:"Captcha validation failed" });
					return true;
					//$(".captcha_control").append("Captcha Error!!!");
				}
			  
			}
		);
		
	}catch(e){
		console.log("Error caught:", e);
	}
	//res.render('index.html');
	return true;
	
});

// Render index file
app.use('/', function(req, res, next) {
    res.render('index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


var sendMail = function(params){
		try{
			var mailer = require("nodemailer");
			var fs = require("fs");
			var templateFilePath = "public/templates/sign_up_email_body.html";
			if(params.form_name != undefined && params.form_name == "contact-form")
				templateFilePath = "public/templates/contact_us_email_body.html";
			
			fs.readFile(templateFilePath, function(err, data){
				if(err) {
					console.log("Error while reading template>>", err);
				}
				var emailBody = data.toString();
				emailBody = emailBody.replace("#name", params.name);
				emailBody = emailBody.replace("#email", params.email);
				emailBody = emailBody.replace("#comments", params.comments);
				
				if(params.form_name != undefined && params.form_name == "contact-form") {
					emailBody = emailBody.replace("#country", params.country);
					emailBody = emailBody.replace("#phone", params.phone);
					emailBody = emailBody.replace("#designation", params.designation);
					emailBody = emailBody.replace("#company", params.company);
				}
				
				
				// Use Smtp Protocol to send Email
				var smtpConfig = {
					host: 'mail.extentia.com',
					port: 25,
					secure: true, // use SSL
					auth: {
						user: "codemail@extentia.com",
						pass: "$#codeauth261"
					}
				};
				var smtpTransport = mailer.createTransport("SMTP",smtpConfig);
				
				var mail = { 
					from: "MybrickBot Contact Us <info@mybrickbot.com",// + params.email + ">",
					to: "mybrickbot@yopmail.com",//"aj.extentia@gmail.com", //params.email,
					subject: "Contact Information for MyBrickBot Alexa app.",
					text: "We have received following contact-us request.",
					html: emailBody//"<b>Hope to have a nice relation with you.</b>"
				}

				smtpTransport.sendMail(mail, function(error, response){
					if(error){
						console.log("Mail error:>>");
						console.log(error);
					}else{
						console.log("Message sent: " + response.message);
					}

					smtpTransport.close();
				});
				
				
			});
			
			
		}catch(e){
			console.log("Error in sendMail", e);
		}
	}


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


 
module.exports = app;

app.listen(process.env.PORT || 3000, function(){
  console.log('listening on' + process.env.PORT);
});