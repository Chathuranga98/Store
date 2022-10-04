const router = require('express').Router();
let news_category_schema = require('../models/news.category');

//Add New Category
router.route('/add_News_category').post((req,res) => {
    const name = req.body.name;
    const image = req.body.image;
    const category = new news_category_schema({name , image});

    category.save()
        .then(() => res.json('Vehicle category Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

//Retrieve All Category
router.route("/allNewsCategory").get(async (req, res) => {
        news_category_schema.find()
                .then(NewsCategory => res.json(NewsCategory))
                .catch(err => res.status(400).json('No Data'))
});

//Delete Category
router.route("/deleteCategory/:name").delete(async (req, res) => {
        let name = req.params.name;
        news_category_schema.findOneAndDelete({name : name}).then(() => {
                res.status(200).send({status :"Category Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

module.exports = router;