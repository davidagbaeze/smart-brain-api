const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '9e3bf74ca40948dfac7e3d3622cc9260'
 });

const handleApiCall = (req, res) => {
  const {input} = req.body;
  app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('no data avaliable'))
}

const handleImage = (req, res, db)=>{
  const {id} = req.body;
  db('users').where({id})
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries)
  })
  .catch(err => res.status(400).json('unable to get entries'))
}


module.exports ={
  handleImage: handleImage,
  handleApiCall: handleApiCall
}