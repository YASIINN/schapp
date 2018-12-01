MailService = {
    AddMail: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/schapp/MailService/mail.php",
                datatype: 'application/json',
                data: json,
                success: function (data, status, xhr) {
                    if (!data.length) {
                        resolve(data.status);
                    } else {
                        resolve(data);
                    }
                },
                error: function (data, status, xhr) {
                    if (!data.responseText.trim().includes("status")) {
                        resolve("");
                    } else {
                        resolve(JSON.parse(data.responseText.trim()).status)
                    }
                }
            });
        });
        return deferred;
    }
}