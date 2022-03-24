const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name'],
    },
  }).then((catData) => res.json(catData));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['cateogry_id'],
    },
  }).then((catData) => {
    if (!catData) {
      res.status(404).json({ message: 'This id does not exist.' });
      return;
    }
    res.status(200).json(catData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    categoryName: req.body.categoryName,
  }).then((catData) => res.json(catData));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      categoryName: req.body.categoryName,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((catData) => {
    if (!catData) {
      res.status(404).json({ message: 'This id does not exist.' });
      return;
    }
    res.status(200).json(catData);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((catData) => {
    if (!catData) {
      res.status(404).json({ message: 'This id does not exist.' });
    }
  });
});

module.exports = router;
