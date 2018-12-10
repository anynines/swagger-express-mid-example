const router = ({ db, body: { data, collection } }, res, _next) => {
  const dbCollection = db.get(collection);

  dbCollection.insert(data, (err, _doc) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json({ message: `configuration for ${collection} successfully updated` });
    }
  });
};

export default router;
