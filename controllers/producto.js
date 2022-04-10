const express = require('express');
const Model   = require('../models/producto');
const router  = express.Router();

const errorResponse = (error) => {
    return {
        code: 500,
        message: "Error",
        printStackTrace: error
    }
}

const successResponse = {
    code: 200,
    message: 'OK'
}

const successWithItems = (items) => {
    return {
        code: 200,
        message: 'OK',
        data: items
    }
}

router.post('/', (request, response) => {
    let item = new Model(request.body);
    item.save((error) => {
        if (error) return response.status(500).send(errorResponse(error));
        return response.status(200).send(successResponse);
    });
});

router.get('/:id', (request, response) => {
    Model.findById(request.params.id)
    .populate('imagenes')
    .populate('marca')
    .populate('rubro')
    .exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error));
        return response.status(200).send(successWithItems(item));
    });
});

router.get('/barcode/:barcode', (request, response) => {
    Model.findOne({codigoBarras: request.params.barcode}).exec((error, item) => {
        if (error) return response.status(500).send(errorResponse(error));
        return response.status(200).send(successWithItems(item));
    });
});

router.get('/', (request, response) => {
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    
    if(query){
        const queryKeys = Object.keys(query);
        queryKeys.forEach(key => {
            if(key !== 'marca' && key !== 'rubro'){
                query[key] = new RegExp(query[key], 'i')
            }
        })
    }

    Model.paginate((query !== null) ? query : {}, {
        page,
        limit,
        populate: ['rubro', 'marca', 'imagenes'],
        sort: {'_id': -1}
    }, (error, items) => {
        if (error) {
            return response.status(500).send(errorResponse(error));
        }
        return response.status(200).send(items);
    })
});

router.put('/', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: item._id }, item, { new: true }, (error) => {
        if (error) {
            return response.status(500).send(errorResponse(error));
        }
        return response.status(200).send(successResponse);
    });
});

router.delete('/:id', (request, response) => {
    Model.deleteOne({_id: request.params.id}, (error) => {
        if(error) return response.status(500).send(errorResponse(error));
        return response.status(200).send(successResponse);
    })
});

module.exports = router;