'use strict'
// This is just an example app to import the files to Vue Storefront default index
const elasticsearch = require('elasticsearch');
const fs = require('fs');
const client = new elasticsearch.Client({
   hosts: [ 'https://search-squarefeet-xxxxx.ap-south-1.es.amazonaws.com/'],
   apiVersion: '7.4'
});

const fileName = process.argv[2]
const entityType = process.argv[3]
let indexName = process.argv[4]
indexName = indexName + '_' + entityType

if (!fileName || !entityType) {
    console.error('Please run `node import.js [fileName] [product|attribute|category] [indexName]')
}

const records = JSON.parse(fs.readFileSync(fileName))
for (const record of records) {
    console.log(`Importing ${entityType}`, record)
    client.index({
        index: indexName,
        id: record.id,
        body: record
    }, function(err, resp, status) {
        console.log(resp);
    });
}
