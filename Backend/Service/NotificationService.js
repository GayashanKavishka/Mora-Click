const admin = require('../utils/firebase');

class NotificationService {
    static async sendNotification(deviceToken, title, body) {
        const message = {
              notification:{
                   title,body
              },

              token : deviceToken
        }
        try{
            const response = await admin.messaging().send(message);
            console.log("Notification sent successfully:", response);
            return response;
        }
        catch(err){
            console.error("Error sending notification:", err);
            throw err;
        }
    }


    // static async sendMultipleNotification(deviceTokens, title, body) {
    //     const messages = deviceTokens.map((Token) => ({
    //          notification:{
    //                 title,body
    //             },
    //             token: Token
    //     }));
    //     console.log(messages);
    //     try{
    //         const response = await admin.messaging().sendEach(messages);
    //         console.log("Notification sent successfully:", response);
    //         return response;
    //     }
    //     catch(err){
    //         console.error("Error sending notification:", err);
    //         throw err;
    //     }
    // }

    static async sendMultipleNotification(deviceTokens, title, body) {
        const message = {
            notification: { title, body },
            tokens: deviceTokens  // Use "tokens" instead of mapping each one separately
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log("Notification sent successfully:", response);
            return response;
        } catch (err) {
            console.error("Error sending notification:", err);
            throw err;
        }
    }
}


module.exports = NotificationService;