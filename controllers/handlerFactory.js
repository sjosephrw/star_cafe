const tcWrapper = require('../utils/reusableTryCatchUtils');
const ErrorHandler = require('../utils/errorUtils');
const APIFeatures = require('../utils/apiFeaturesUtils');
const { prepareDataForDbInsertion } = require('../utils/dataUtils');

const groupedFunctionsObj = {
    deleteOne: Model => tcWrapper(async (req, res, next) => {

        const doc = await Model.findByIdAndDelete(req.params.id);
    
        if(!doc){
            //when next receives anything it will jump directly into the global error handling MW
            return next(new ErrorHandler(404, 'No document was found with that ID'));
        }
    
        res.status(204).json(
        {
            status: 'success', 
            //when we are deleting we don't send data back we send null and status 204
            data: null
        });
        
    }), 

    updateOne: Model => tcWrapper( async (req, res, next) => {
        
        const data = prepareDataForDbInsertion(req, null, next);

        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //This will return the updated document, rather than the original
            runValidators: true//check for validation as specified in mongoose model
        });
    
        if(!doc){
            //when next receives anything it will jump directly into the global error handling MW
            return next(new ErrorHandler(404, 'No document was found with that ID'));
        }
    
        res.status(200).json(
            {
            status: 'success', 
            data: {
                data: doc
            }
        });
    }),

    createOne: Model => tcWrapper( async (req, res, next) => {

        const data = prepareDataForDbInsertion(req, null, next);

        console.log(data, '?????????????????');
        console.log(req.body, '>>>>>>>>>>>>>>>>>>')

        const doc = await Model.create(req.body);
    
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    
    }),

    getOne: (Model/*, popOptions*/) => tcWrapper( async (req, res, next) => {

        // let query = Model.findById(req.params.id);
        // if (popOptions) query.populate(popOptions);

        // const doc = await query;

        // const doc = await Model.findById(req.params.id).populate('reviews');//display the reviews only when getting one tour

        const doc = await Model.findById(req.params.id);

        if(!doc){
            //when next receives anything it will jump directly into the global error handling MW
            return next(new ErrorHandler(404, 'No document was found with that ID'));
        }

        res.status(200).json(
            {
            status: 'success', 
            data: {
                data: doc
            }
        });

    }),
    
    getAll: (Model) => tcWrapper( async (req, res, next) => {

        //to allow nested GET Reviews on tour
        let filter = {};
        // if (req.params.tourId) filter = { tour: req.params.tourId };
    
        const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();
            
        // const tours = await query;
        const doc = await features.query;
    
    
        res.status(200).json(
            {
            status: 'success', 
            requestedAt: req.requestTime,
            results: doc.length,
            data: {
                data: doc
            }
        });
    
    })
}


const factory = groupedFunctionsObj;

module.exports = factory;
