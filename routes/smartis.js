const express = require("express");
const { v4: uuuidv4 } = require("uuid");

const router = express.Router();
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

router.get("/smartis/:id", async function (req, res, next) {
  res.json({
    data: await showUserEntities(req.params.id),
  });
});

router.post("/create", async function (req, res, next) {
  createEntity(req.body.from, req.body.to, req.body.message);
});

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

async function showEntities() {
  let entitiesIter = client.listEntities();
  let entities = [];
  for await (const entity of entitiesIter) {
    entities.push(entity);
  }
  return entities;
}

async function showUserEntities(from) {
  let entitiesIter = client.listEntities();
  let entities = [];
  for await (const entity of entitiesIter) {
    if (entity.partitionKey === from) {
      entities.push(entity);
    }
  }
  return entities;
}

async function createEntity(from, to, message) {
  const testEntity = {
    partitionKey: to,
    rowKey: uuuidv4(),
    message: message,
    used: false,
    from: from,
  };
  await client.createEntity(testEntity);
}
module.exports = router;
