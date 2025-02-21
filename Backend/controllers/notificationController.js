const notificationService = require('../Service/NotificationService');
const user = require('../model/userModel');


const sendFirebaseNotification = async (req, res) => {
    try{
        const {title,body,deviceToken} = req.body;
        await notificationService.sendNotification(deviceToken,title,body);
        res.status(200).json({message:"Notification sent successfully",success:true});
    }
    catch(err){
        res.status(500).json({message:"Error sending notification",success:false});
    }
};


// const sendCanteenStatus = async (req, res) => {
//     try{
//         const {title,body} = req.body;
//         console.log(title,body);
//         const devicetokens = await user.find({},{FCMToken:1,_id:0});
//         const deviceTokensArray = devicetokens.map(token => token.FCMToken );
//         console.log(deviceTokensArray);
//         await notificationService.sendMultipleNotification(devicetokens,title,body);
//         res.status(200).json({message:"Notification sent successfully",success:true});
//     }
//     catch(err){
//         res.status(500).json({message:"Error sending notification",success:false});
//     }
// }

const sendCanteenStatus = async (req, res) => {
    try {
        const { title, body } = req.body;
        console.log(title, body);
        
        // Retrieve all users' FCM tokens
        const devicetokens = await user.find({}, { FCMToken: 1, _id: 0 });
        
        // Extract non-empty tokens
        const deviceTokensArray = devicetokens
            .map(tokenObj => tokenObj.FCMToken)
            .filter(token => token);  // Remove empty tokens

        console.log("Valid Tokens:", deviceTokensArray);

        if (deviceTokensArray.length === 0) {
            return res.status(400).json({ message: "No valid device tokens found", success: false });
        }

        // Send notifications
        await notificationService.sendMultipleNotification(deviceTokensArray, title, body);

        res.status(200).json({ message: "Notification sent successfully", success: true });
    } catch (err) {
        console.error("Error sending notification:", err);
        res.status(500).json({ message: "Error sending notification", success: false });
    }
};



module.exports = {
    sendFirebaseNotification,
    sendCanteenStatus
};