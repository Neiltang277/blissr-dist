const async = require('async')

var pageQuery = function (page, perPage, Model, populate, queryParams, sortParams, queryFields = []) {
  return new Promise(function (resolve, reject) {
    perPage = perPage * 1
    page = page * 1
    let start = (page - 1) * perPage
    let $page = {
      page: page
    }
    async.parallel({
      count: function (done) { // 查询数量
        console.log(queryParams)
        Model.find(queryParams).count().exec(function (err, count) {
          // console.log('count');
          done(err, count)
        })
      },
      records: function (done) { // 查询一页的记录
        Model.find(queryParams, queryFields).skip(start).limit(perPage).populate(populate).sort(sortParams).exec(function (err, doc) {
          console.log(doc)
          // console.log('records');
          done(err, doc)
        })
      },
      total: function (done) {
        Model.find({}).count().exec(function (err, count) {
          // console.log('total');
          done(err, count)
        })
      }

    }, function (err, results) {
      if (!err) {
        $page.perPage = parseInt((results.count - 1) / perPage + 1)
        $page.subjects = results.records
        $page.total = results.total
        resolve($page)
      }
    })
  })
}

module.exports = {
  pageQuery: pageQuery
}
