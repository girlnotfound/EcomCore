const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
   try {
    // include its associated products in the results
    const categories = await Category.findAll({
      include: [Product],
    });
     // respond with the fetched categories as JSON
    res.json(categories);
  } catch (err) {
    // error message
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
   try {
    // include its associated products in the results
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    // if no category is found, respond with status code and message
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // update the category with the specified id using the data from the request body
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    // if no category was updated, respond with status code and message
    if (!updated) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // delete the category with the specified id from the database
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    // if no category was deleted, respond with status code and message
    if (!deleted) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;