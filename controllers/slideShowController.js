//models
const SlideShow = require('../models/slideShowModel');

//controllers
const factory = require('./handlerFactory');

exports.getAllSlides = factory.getAll(SlideShow);

exports.createSlide = factory.createOne(SlideShow);

exports.getSlide = factory.getOne(SlideShow);

exports.updateSlide = factory.updateOne(SlideShow);

exports.deleteSlide = factory.deleteOne(SlideShow);


// const { prepareDataForDbInsertion } = require('../utils/dataUtils');
 
// const loopAndWrapTryCatch = require('../utils/reusableTryCatchUtils');

// const { ErrorHandler } = require('../utils/errorUtils');


//grouping the contoleer functions into a single object to loop through the functions and 
//wrap them in the reusable try catch block
// const groupedFunctionsObj = {

//     getAllSlides: async (req, res, next) => {

//         //throw new Error('ABC');

//         const slides = await SlideShow.find();

//         res.status(200).json({
//             status: 'success',
//             requestedAt: req.requestTime,
//             results: slides.length,
//             data: {
//                 slides
//             }
//         });
//     },

//     createSlide : async (req, res, next)=>{//***IMPORTANT - the next parameter is necessary here

            
//         const data = await prepareDataForDbInsertion(req, null, next);
//         console.log(data)
//         const newSlide = await SlideShow.create(data);

//         res.status(201).json({
//             status: 'success',
//             data: {
//                 slide: newSlide
//             }
//         });            
    
//     },
//     getSlide : async (req, res, next) => {

//         const slide = await SlideShow.findById(req.params.id);

//         if (!slide){
//             return next(new ErrorHandler(404, `No slide found with that ID`))
//         }

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 slide
//             }
//         });


//     },updateSlide : async (req, res, next) => {
        
//         const data = await prepareDataForDbInsertion(req, null, next);

//         const updatedSlide = await SlideShow.findByIdAndUpdate(req.params.id, data, {
//             new: true,
//             runValidators: true
//         });

//         if (!updatedSlide){
//             return next(new ErrorHandler(404, `No Slide found with that ID`))
//         }

//         res.status(200).json({
//             status: 'success',
//             data: updatedSlide
//         }); 

//     },deleteSlide : async (req, res, next) => {

//         const slide = await SlideShow.findByIdAndDelete(req.params.id);

//         if (!slide){
//             return next(new ErrorHandler(404, `No slide found with that ID`))
//         }

//         res.status(204).json({
//             status: 'success',
//             data: null
//         });         
        
//     }

// }


// const slideShowController = loopAndWrapTryCatch(groupedFunctionsObj);

// module.exports = slideShowController;

