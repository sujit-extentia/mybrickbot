(function() {
    $(document).ready(function() {
        $('#errorMsgId').hide();

        $("#new_user").submit(function(event) {
            // Stop form from submitting normally
            event.preventDefault();
            // Get some values from elements on the page:
            var $form = $(this),
                //user_name = $form.find("input[name='user_name']").val(),
                user_password = $form.find("input[name='user_password']").val(),
                user_email = $form.find("input[name='user_email']").val(),
                url = $form.attr("action");
            var stateParma = $.urlParam('state');
            var data = {
                'user_name': user_email,
                'user_password': user_password
            };
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: success,
                error: error
            });

            function success(data) {
                if (data.status == 'Success') {
                    var redirectUrl = "https://pitangui.amazon.com/spa/skill/account-linking-status.html?vendorId=MW2MCG1UV5LFL#state=" + stateParma +
                        "&access_token=" + data.token + "-"+user_email+"&token_type=Bearer";
                    $('#errorMsgId').hide();  
                    console.log('redirectUrl ' + redirectUrl);					
                    window.location.href = redirectUrl;
                } else {
                    $('#errorMsgId').text(data.message).show();
                }
            }

            function error(data) {
                $('#errorMsgId').text(data.message).show();
            }
        });
		
		$("#nouser_button").click(function() {
            var stateParma = $.urlParam('state');
            var redirectUrl = "https://pitangui.amazon.com/spa/skill/account-linking-status.html?vendorId=MW2MCG1UV5LFL#state=" + stateParma +
                "&access_token=testuser&token_type=Bearer";

            window.location.href = redirectUrl;
        });
        // function to parse url param
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
    });
})();
