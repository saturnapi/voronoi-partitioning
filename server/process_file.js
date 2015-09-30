Meteor.methods({
  getPartitionPlot: function (seedFile) {

  	var key = 'MY_SATURNAPI_ACCESS_KEY';
    var url = "https://saturnapi.com/access/vpartition/voronoi-seed-partition-plot";
    var SaturnParams = '[' + seedFile.replace(/\n/g, " ; ") + ']';

    var options = {
      'headers' : {
        'Content-Type': 'application/json',
        'saturnapi-access-key': key,
      },
      'data': {
        'SaturnParams': SaturnParams
      }
    };

    var result = HTTP.post(url, options);

    return result;
  },

  getPartitionVertices: function (seedFile) {

  	var key = 'MY_SATURNAPI_ACCESS_KEY';
    var url = "https://saturnapi.com/access/vpartition/voronoi-seed-partition-vertices";
    var SaturnParams = '[' + seedFile.replace(/\n/g, " ; ") + ']';

    var options = {
      'headers' : {
        'Content-Type': 'application/json',
        'saturnapi-access-key': key,
      },
      'data': {
        'SaturnParams': SaturnParams
      }
    };

    var result = HTTP.post(url, options);

    return result;
  },

  getPartitionAssignment: function (seedFile, speckFile) {

  	var key = 'MY_SATURNAPI_ACCESS_KEY';
    var url = "https://saturnapi.com/access/vpartition/voronoi-seed-partition-assignment";
    var SaturnParams = '{[' + seedFile.replace(/\n/g, " ; ") + '],[' + speckFile.replace(/\n/g, " ; ") + ']}';

    var options = {
      'headers' : {
        'Content-Type': 'application/json',
        'saturnapi-access-key': key,
      },
      'data': {
        'SaturnParams': SaturnParams
      }
    };

    var result = HTTP.post(url, options);

    return result;
  }
});