var express = require("express");

var router = express.Router();
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

router.get("/smartis", async function (req, res, next) {
  res.json({
    data: await showEntities(),
  });
});

async function showEntities() {
  let entitiesIter = client.listEntities();
  let entities = [];
  for await (const entity of entitiesIter) {
    entities.push(entity);
  }
  return entities;
}

router.post("/create", async function (req, res, next) {});

/* GET users listing. */
router.get("/tables", async function (req, res, next) {
  res.json({
    data: await getTables(),
  });
});

async function getTables() {
  //TODO get smartis table
  let tablesIter = serviceClient.listTables();
  let tables = [];
  for await (const table of tablesIter) {
    tables.push(table);
    console.log(table);
  }
  return tables;
}

module.exports = router;
