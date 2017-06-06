const responseHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*'
};

const success_body = { 
       "message": "success"
};
   
const success_resp = {
  statusCode: 200,
  headers: responseHeaders,
  body: JSON.stringify(success_body)
};
    
exports.handler = (event, context, callback) => {
   console.log("Event Arrived from: ", getLambdaEventSource(event), event);
   callback(null, success_resp);
};



function getLambdaEventSource(event) {
    if (event.Records && event.Records[0].cf) return 'Cloudfront';

    if (event.configRuleId && event.configRuleName && event.configRuleArn) return 'AwsConfig';

    if (event.Records && (event.Records[0].eventSource === 'aws:codecommit')) return 'CodeCommit';

    if (event.authorizationToken === "incoming-client-token") return 'ApiGatewayAuthorizer';

    if (event.StackId && event.RequestType && event.ResourceType) return 'CloudFormation';

    if (event.Records && (event.Records[0].eventSource === 'aws:ses')) return 'SES';

    if (event.pathParameters && event.pathParameters.proxy) return 'ApiGatewayAwsProxy';

    if (event.source === 'aws.events') return 'ScheduledEvent';

    if (event.awslogs && event.awslogs.data) return 'CloudWatchLogs';

    if (event.Records && (event.Records[0].EventSource === 'aws:sns')) return 'SNS';

    if (event.Records && (event.Records[0].eventSource === 'aws:dynamodb')) return 'DynamoDb';

    if (event.records && event.records[0].approximateArrivalTimestamp) return 'KinesisFirehose';

    if (event.records && event.deliveryStreamArn && event.deliveryStreamArn.startsWith('arn:aws:kinesis:')) return 'KinesisFirehose';

    if (event.eventType === 'SyncTrigger' && event.identityId && event.identityPoolId) return 'CognitoSyncTrigger';

    if (event.Records && event.Records[0].eventSource === 'aws:kinesis') return 'Kinesis';

    if (event.Records && event.Records[0].eventSource === 'aws:s3') return 'S3';

    if (event.operation && event.message) return 'MobileBackend';

}
