const getAllResources = require("../../db/queries/getAllResources");

$(() =>
  getAllResources().then((response) => {res.send({response}) })
)
