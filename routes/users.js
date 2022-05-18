var express = require("express");
var router = express.Router();
const { v4: uuuidv4 } = require("uuid");
const {
  TableServiceClient,
  TableClient,
  AzureNamedKeyCredential,
} = require("@azure/data-tables");
const account = "smartisapp";
const accountKey = process.env.Key;
const tableName = "smartis";

const credential = new AzureNamedKeyCredential(account, accountKey);
const serviceClient = new TableServiceClient(
  `https://smartisapp.table.core.windows.net/`,
  credential
);
const client = new TableClient(
  `https://smartisapp.table.core.windows.net`,
  tableName,
  credential
);

async function showEntities() {
  let entitiesIter = client.listEntities();
  let entities = [];
  for await (const entity of entitiesIter) {
    entities.push(entity);
  }
  return entities;
}

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let userList = await showEntities();
  res.json({
    data: userList,
  });
});

/* let userList = [{ name: "Thomas", id: userId, counter: 1 }];
  async function showEntities() {
    let entitiesIter = client.listEntities();
    for await (const entity of entitiesIter) {
      userList.find((obj) => {
        if (
          obj.name.toString().toLowerCase() ===
          entity.partitionKey.toString().toLowerCase()
        ) {
          obj.counter += 1;
        } /* else {
          userId = uuuidv4();
          userList.push({
            name: entity.partitionKey,
            id: userId,
            counter: 1,
          });
        } 
      });
    }
    let dataArry = [
    { name: "Martin", id: 1, counter: 0 },
    { name: "Jonas", id: 2, counter: 0 },
    { name: "Thomas", id: 3, counter: 0 },
    { name: "Tamara", id: 4, counter: 0 },
    { name: "Marlon", id: 5, counter: 0 },
    { name: "Johanna", id: 6, counter: 0 },
    { name: "Noah", id: 7, counter: 0 },
    { name: "Kevin", id: 8, counter: 0 },
    { name: "Christian", id: 9, counter: 0 },
  ];
   dataArry = showEntities()
    .then(console.log(dataArry))
    .then(
      res.json({
        data: dataArry,
      })
    ); */
module.exports = router;
