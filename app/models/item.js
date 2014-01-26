'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Item Schema
 */
var ItemSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    brand: {
        type: String,
        default: '',
        trim: true
    },
    seller: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        min: 0
    },
    pictures: {
        type: [String],
        default: []
    }
});

/**
 * Validations
 */
ItemSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ItemSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('seller', 'name username').exec(cb);
};

mongoose.model('Item', ItemSchema);

