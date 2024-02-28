require('dotenv').config();
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

async function sendSMSMessage(sns, params) {
    const command = new PublishCommand(params);
    const message = await sns.send(command)
    return message
}
(async()=> {
    const params = {
        Message:`Your OTP code is ${Math.random().toString().substring(2,6)}`, // 6 digits code loading
        PhoneNumber: process.env.Phone,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'String'
            }
        }
    };
    const sns = new SNSClient({
        region: process.env.REGION || 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        }
    });
    await sendSMSMessage(sns, params);
})()