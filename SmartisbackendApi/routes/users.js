var express = require('express');
var router = express.Router();
const { TableServiceClient, AzureNamedKeyCredential } = require("@azure/data-tables");

/* GET users listing. */
router.get('/', function(req, res, next) {
  let dataArry = [{ name: "Martin", id: 1, counter: 0 },
  { name: "Jonas", id: 2, counter: 0},
  { name: "Thomas", id: 3, counter: 0},
  { name: "Tamara", id: 4, counter: 0},
  { name: "Marlon", id: 5, counter: 0},
  { name: "Johanna", id: 6, counter: 0},
  { name: "Noah", id: 7, counter: 0},
  { name: "Kevin", id: 8, counter: 2},
  { name: "Christian", id: 9, counter: 5}];

  res.json({
    data: dataArry
  });


  const account = "smartisapp";
const accountKey = "i09wa/MHV425XvSyrqPNzXX36XESXwW8LeBPbxfwdppwHmuvbs04a0xR4IVy7wuenNcFegwMBe4PR66TMiRgrA==";

const credential = new AzureNamedKeyCredential(account, accountKey);
const serviceClient = new TableServiceClient(
  `https://smartisapp.table.core.windows.net/`,
  credential
);

async function main() {
  console.log("hi there")
  let tablesIter = serviceClient.listTables();
  let i = 1;
  for await (const table of tablesIter) {
    console.log(`Table${i}: ${table.name}`);
    i++;
    // Output:
    // Table1: testTable1
    // Table1: testTable2
    // Table1: testTable3
    // Table1: testTable4
    // Table1: testTable5
  }
}

main();
});

module.exports = router;
