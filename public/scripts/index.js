$(() => {
  getAllResources().then(function( json ) {
    propertyListings.addProperties(json.properties);
    views_manager.show('listings');
  });
});

const getAllResources = function() {
  return pool
  .query(`SELECT *,
    FROM resources`)
          .then((result) => {
            console.log(result);
            return result.rows;
          })
          .catch((err) => {
            console.log(err.message);
          });
}


const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
