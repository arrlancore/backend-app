'use strict'

import Tag from './models'
const ObjectId = require('mongoose').Types.ObjectId

export default {
  create,
  update,
  read,
  remove,
  list
}

function create (data) {
  try {
    const newEntry = new Tag(data)
    return newEntry.save()
  } catch (error) {
    throw new Error(error)
  }
}

function read (query) {
  try {
    const { id } = query
    let filter = query
    if (id) {
      filter = { _id: new ObjectId(id) }
    }
    return Tag.findOne(filter).populate('createdBy', 'fullName')
  } catch (error) {
    throw new Error(error)
  }
}

function list (query) {
  try {
    // filter the list
    let condition = {}
    if (query._id) {
      condition._id = query._id
    }
    if (query.namaGedung) {
      condition.namaGedung = {
        $regex: new RegExp(query.namaGedung)
      }
    }
    if (query.deskripsi) {
      condition.deskripsi = {
        $regex: new RegExp(query.deskripsi)
      }
    }
    // set a custom field selected
    let selected = query.selected || null
    // set options for sorting & pagination
    let options = {
      limit: 25,
      skip: 0,
      sort: '-createdAt'
    }
    if (query.limit) {
      options.limit = Number(query.limit)
    }
    if (query.page) {
      options.skip = (Number(query.page) - 1) * query.limit
    }
    if (query.sort) {
      options.sort = query.sort
    }
    return Promise.all([
      Tag.find(condition, selected, options)
        .populate('createdBy', 'fullName'),
      Tag.countDocuments(condition)
    ])
  } catch (error) {
    throw new Error(error)
  }
}

function update (id, data) {
  try {
    return Tag.updateOne({ _id: id }, { $set: data })
  } catch (error) {
    throw new Error(error)
  }
}

function remove (id) {
  try {
    return Tag.remove({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}
