'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
AWS.config.update({
    region: 'ap-southeast-2'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const isLambda = !!(process.env.LAMBDA_TASK_ROOT || false);
if (!isLambda) {
  require('dotenv').config();
}
const tableName = process.env.COMMENTS_TABLE;

async function getComments() {
    try {
        let params = {
            TableName: tableName,
        };
        let data = await dynamodb.scan(params).promise();
        console.log(data)
        return data.Items;
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            body: JSON.stringify({
                tableName: tableName
            })
        };
    }
}

async function createComment(text) {
  try {
      let item = {
          Id: uuid.v4(),
          text: text,
      }
      let params = {
          TableName: tableName,
          Item: item
      };
      await dynamodb.put(params).promise();
      return item;
  } catch (err) {
      console.log("Error", err);
      return {
          statusCode: err.statusCode ? err.statusCode : 500,
          body: JSON.stringify({
              message: "error"
          })
      };
  }
}

const resolvers = {
  Query: {
    helloWorld: () => 'Hello world!test!',
    comments: () => getComments(),
  },
  Mutation: {
    createComment: (parent, args) => createComment(args.text)
  }
};

module.exports = { resolvers }