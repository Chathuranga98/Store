const router = require('express').Router();
let news_model = require('../models/news');
const timestamp = require('time-stamp');

//Save All News
router.route('/addNews').post((req,res) => {
    const title = req.body.title;
    const category = req.body.category;
    const Trending = req.body.TrendingChecked;
    const Breaking = req.body.BreakingChecked;
    const SlidShow = req.body.SlidShowNewsChecked;
    const Top = req.body.TopNewsChecked;
    const description= req.body.description;
    const body = req.body.body;
    const image = req.body.image;

    const news_saving = new news_model({title, category, Trending, Breaking, SlidShow, Top, description, body, image});

    news_saving.save()
        .then(() => res.json('News Saving Done!'))
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});
  
//All News Retrieve
router.route("/allNews").get((req,res) => {
    
    news_model.find().sort({_id:-1}).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});  

//AllSlideShow News Retrieve
router.route("/allSlideShowNews").get((req,res) => {
    
    news_model.find({SlidShow : 'true'}).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});    

//All Trending News Retrieve
router.route("/allTrendingNews").get((req,res) => {
    
    news_model.find({Trending : 'true'}).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});   

//All Hot News Retrieve
router.route("/allHotNews").get((req,res) => {
    
    news_model.find({Top : 'true'}).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});  

//All News Category Wise
router.route("/allNewsCategoryWise/:Category").get((req,res) => {
    let Category= req.params.Category; 
    news_model.find({category : Category}).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});  


//All Breaking News
router.route("/allBreakingNews").get((req,res) => {
    
    news_model.find({Breaking : 'true'}).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});   

//One News
router.route("/oneNews/:ID").get((req,res) => {
    let ID = req.params.ID; 
    news_model.findById(ID).then((news) => {
        res.json(news);
    }).catch((err) => {
        console.log(err);
    });
});   


//Delete News
router.route("/deleteNews/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    news_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"News Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update News
router.route('/updateNews').put((req, res)=>{
    const NewsID = req.body.news_id;   
    const body = req.body.body;
    const title = req.body.title;
    const category = req.body.category;
    const Trending = req.body.TrendingChecked;
    const Breaking = req.body.BreakingChecked;
    const SlidShow = req.body.SlidShowNewsChecked;
    const Top = req.body.TopNewsChecked;
    const description= req.body.description;

    const updateNews={body,title,category,Trending,Breaking,SlidShow,Top,description}
    news_model.findByIdAndUpdate(NewsID,updateNews).then(() => {       
        res.status(200).send({status :"News updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});


module.exports = router;