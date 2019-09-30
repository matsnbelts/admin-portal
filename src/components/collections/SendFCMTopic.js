import request from 'request';

const sendMsgTopic = async (topic) => {
    var post_data = {"notification": {"title": "Finish",
    "body": "cleaning"},
    "to": "/topics/" + topic};
    console.log(JSON.stringify(post_data));
    request({
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: "POST",
        headers: {
            'content-type': 'application/json',
            "Authorization": "key=AAAAj_Lpq38:APA91bF8jDd9nUXpDNn8n2SQcXvSQwZV2ibGlxlbN_huuC1X3Pti3OfZvWAPf9Zr2jR9iMqrOnPbGZIqsGNz6GVflZoTa73x6jqxq6D8nBRBGJ9cgB7-d6llEXzj7CJN0-xjC7sX14SM"
        },
        body: JSON.stringify(post_data)
    }, function (error, response, body){
        if (error) {
            console.error(error)
            return
          }
        console.log(response.statusCode);
    });
}

export default sendMsgTopic;