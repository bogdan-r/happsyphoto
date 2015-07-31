var DEFAULT_RECORDS_COUNT = 50;
function PaginationService(){}

PaginationService.getDefaultRecordsCount = function(){
  return DEFAULT_RECORDS_COUNT
}
PaginationService.paginate = function(model, req){
  var limit = req.param('limit') || PaginationService.getDefaultRecordsCount();
  return model.count().then(function(count){
    return {
      count: count,
      pageCount: Math.ceil(count / limit),
      page: req.param('page') || 1,
      limit: limit
    }
  })
}

module.exports = PaginationService