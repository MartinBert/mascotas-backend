'use strict';
const express = require('express');
const Model   = require('../models/venta');
const Renglon = require('../models/ventarenglon');
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

//Save new venta
router.post('/', (request, response) => {
        const item = new Model(request.body);
        item.renglones = request.body.renglones.map(renglon => new Renglon(renglon));

        const saveChildEntities = async() => {
            for(const renglon of item.renglones){
                await renglon.save();
            }
        }

        saveChildEntities()
        .then(() => {
            item.save((error) => {
                if (error) return response.status(500).json(errorResponse(error));
                return response.status(200).json(successResponse);
            });
        })
        .catch(error => {
            return response.status(500).json(errorResponse(error));
        })
});

//Get venta by id
router.get('/:id', (request, response) => {
    Model
    .findById(request.params.id)
    .populate([
        {
            path: 'renglones',
            model: 'renglon'
        },
        {
            path: 'documento',
            model: 'documento'
        },
        {
            path: 'usuario',
            model: 'usuario'
        }
    ])
    .exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(item);
    });
});

//Get last index of venta
router.get('/last/index/number', (request, response) => {
    Model
    .findOne()
    .sort('-indice')
    .exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json((item) ? item.indice : 0);
    })
});

router.get('/last/voucher/number/:code', (request, response) => {
    Model
    .findOne({documentoCodigo: request.params.code})
    .sort('-indice')
    .exec((error, item) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json((item) ? item.numeroFactura : 0);
    })
})

//Get ventas list
router.get('/', (request, response) => {
    const {page, limit, filters} = request.query;
    const query = JSON.parse(filters);
    Model.paginate((query) ? {nombre: new RegExp(query.nombre, 'i')} : {}, {
        page,
        limit,
        populate: ['renglones', 'documento', 'usuario'],
        sort: '-indice'
    }, (error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Get ventas list id
router.get('/multiple/idList', (request, response) => {
    const {ids} = request.query;
    const query = {_id: {$in: JSON.parse(ids)}};
    Model
    .find(query)
    .populate([
        {
            path: 'renglones',
            model: 'renglon'
        },
        {
            path: 'documento',
            model: 'documento'
        },
        {
            path: 'usuario',
            model: 'usuario'
        }
    ])
    .exec((error, items) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(items);
    })
});

//Update venta
router.put('/:id', (request, response) => {
    let item = new Model(request.body);
    Model.findOneAndUpdate({ _id: request.params.id }, item, { new: true }, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

//Delete venta
router.delete('/:id', (request, response) => {
    Model.deleteOne({_id: request.params.id}, (error) => {
        if (error) return response.status(500).json(errorResponse(error));
        return response.status(200).json(successResponse);
    });
});

module.exports = router;