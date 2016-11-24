
jQuery.validator.addMethod("charonly", function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
}, "");

jQuery.validator.addMethod("numonly", function (value, element) {
        return this.optional(element) || /^[0-9]+$/i.test(value);
}, "");
		
		
$(document).ready(function(){
	$(".contact-header").click(function(){
		$(".contactSlide-form").toggle();
		$(".contact-header span").toggleClass("close-arrow");
	})

     $('a[href=#top]').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
        });

    $(window).scroll(function () {
            if ($(this).scrollTop() >= 400) {
                $('.totop a').fadeIn();
            } else {
                $('.totop a').fadeOut();
            }
    });
    
    $("#navbar-collapse1").children("li").click(function(){
        $("#navbar-collapse1").removeClass("in");
    })
	
	
	  $("#signupform").validate({
                rules: {

                    name: {
                        required: true,
                        //charonly: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    captcha: { required: true, remote: "captcha/process.php" }


                },
                messages: {
                    name: { required: "", charonly: "Only Characharaters allowed" },
                    email: {
                        required: "",
                        email: ""
                    },

                    captcha: { remote: "Please correct highlighted fields" }

                },
        errorPlacement: function(error, element) {
            //error.appendTo(element.parent());
			jQuery("#validation_errror").css('display','block');
        },
        errorClass: "error",
        errorElement: "div",
        submitHandler: function(form) {
		    jQuery('.loader1').show();
			var submitForm = form;
 
                        /*var name = jQuery("#signupform #name").val();
						var email = jQuery("#signupform #email").val();
                        //var company = jQuery("#signupform #company").val();
						var country = jQuery("#signupform #country").val();
						var phone = typeof(jQuery("#signupform #phone").val()) !== "undefined" && jQuery("#signupform #phone").val() ? jQuery("#signupform #phone").val() : '';
						//var designation = jQuery("#signupform #designation").val();                        
                        var comment = typeof(jQuery("#signupform #comments").val()) !== "undefined" && jQuery("#signupform #comments").val() ? jQuery("#signupform #comments").val() : '';
						
						var queryStringDetails = 'name=' + name + '&email=' + email + '&country=' + country + '&phone='+ phone +'&comment=' + comment;
						*/
                        jQuery.ajax({
                            url: "/contact-mail",
                            type: "POST",
							dataType: "json",
                            data: $("#signupform").serialize(),
                            success: function(data) {
								console.log("data>>");
								console.log(data);
                                jQuery('.loader1').hide();
                                if (data.success) {
                                    /*jQuery('.contact_success_mesg').css("display", "block");
                                    jQuery(".contact_success_mesg").fadeOut(6000);
                                    jQuery('#contact-form')[0].reset();
									//Refresh aptch once mail send
									$('#refreshimg').trigger( "click" );
									jQuery("#response_errror").css('display','none');*/
									window.location.href = window.location.href + "?contact-us-success";
									if(queryString.indexOf("contact-us-success") > -1) 
										$("#success-messege").show();
							        return true;
                                } else {
									/*jQuery(".contact_error_mesg").css("display", "block");
                                    jQuery(".contact_error_mesg").fadeOut(20000);
                                    jQuery('#contact-form')[0].reset();
									$('#refreshimg').trigger( "click" );*/
									$("#captcha_control_error2").show();
									window.location.href = window.location.href + "#contact-form"
                                    return false;
                                }
                            }
                        });
       
        }
            });
			
	 $("#contact-form").validate({
                rules: {

                    name: {
                        required: true,
                        //charonly: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
					 company: {
                        required: true                       
                    },
					 phone: {
                        required: true,
                        number: true,
						minlength: 10,
						maxlength: 12
										
                    },
                    //captcha: { required: true, remote: "captcha/process.php" }


                },
                messages: {
                    name: { required: "", charonly: "Only Characharaters allowed" },
                    email: {
                        required: "",
                        email: ""
                    },
					phone: {
						minlength:"",
						maxlength:""
					},
                    captcha: { remote: "Please correct highlighted fields" }

                },
        errorPlacement: function(error, element) {
            //error.appendTo(element.parent());
			jQuery("#response_errror").css('display','block');
        },
        errorClass: "error",
        errorElement: "div",
        submitHandler: function(form) {
		    jQuery('.loader1').show();
			//var submitForm = form;
			//var queryStringCaptcha = 'captcha='+jQuery("#contact-form #captcha").val();
            
                        var name = jQuery("#contact-form #name").val();
						var email = jQuery("#contact-form #email").val();
                        var company = jQuery("#contact-form #company").val();
						var country = jQuery("#contact-form #country").val();
						var phone = typeof(jQuery("#contact-form #phone").val()) !== "undefined" && jQuery("#contact-form #phone").val() ? jQuery("#contact-form #phone").val() : '';
						var designation = jQuery("#contact-form #designation").val();                        
                        var comment = typeof(jQuery("#contact-form #comments").val()) !== "undefined" && jQuery("#contact-form #comments").val() ? jQuery("#contact-form #comments").val() : '';
						
						/*var queryStringDetails = 'name=' + name + '&email=' + email + '&company=' + company + '&country=' + country + '&phone='+ phone +'&designation='+ designation +'&comment=' + comment;
                        */
						jQuery.ajax({
                            url: "/contact-mail",
                            type: "POST",
							dataType: "json",
                            data: $("#contact-form").serialize(),
                            success: function(data) {
								console.log("data>>");
								console.log(data);
                                jQuery('.loader1').hide();
                                if (data.success) {
                                    /*jQuery('.contact_success_mesg').css("display", "block");
                                    jQuery(".contact_success_mesg").fadeOut(6000);
                                    jQuery('#contact-form')[0].reset();
									//Refresh aptch once mail send
									$('#refreshimg').trigger( "click" );
									jQuery("#response_errror").css('display','none');*/
									window.location.href = window.location.href + "?contact-us-success";
									if(queryString.indexOf("contact-us-success") > -1) 
										$("#success-messege").show();
							        return true;
                                } else {
									/*jQuery(".contact_error_mesg").css("display", "block");
                                    jQuery(".contact_error_mesg").fadeOut(20000);
                                    jQuery('#contact-form')[0].reset();
									$('#refreshimg').trigger( "click" );*/
									$("#captcha_control_error1").show();
									window.location.href = window.location.href + "#contact-form"
                                    return false;
                                }
                            }
                        });
						//return false;
        }
            });
	
	var queryString = location.search;
	if(queryString.indexOf("contact-us-success") > -1) 
		$("#success-messege").show();
		
	
});


