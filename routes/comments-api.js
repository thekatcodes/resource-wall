router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  getResourceById(resourceId)
    .then((response) => {
      return res.json(response)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
});
