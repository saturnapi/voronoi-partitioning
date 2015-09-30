
Template.upload.onCreated(function (){
  var instance = this;

  // initialize the reactive variables
  instance.seedFileInput = new ReactiveVar('');
  instance.speckFileInput = new ReactiveVar('');

});


Template.upload.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.upload.events({
  'change': function(event, instance) {
    event.preventDefault();
    $("#main-spinner").css('display', 'block');

    var file = event.target.files[0]; //assuming you have only 1 file
    var reader = new FileReader(); //create a reader according to HTML5 File API

    instance[event.target.id].set('');
    $('#run-partition').addClass('disabled');

    reader.onload = function(e) {
      instance[event.target.id].set(e.target.result);
      $('#'+event.target.id+'-preview').html(e.target.result.replace(/\n/g, "<br/>"));
      $('#run-partition').removeClass('disabled');
      $("#main-spinner").css('display', 'none');
    }

    reader.readAsText(file); //read the file as arraybuffer
  },

  'click #run-partition': function(event, instance) {
    $("#main-spinner").css('display', 'block');
    if (instance.seedFileInput.get().split(',').length > 1)
      Meteor.call('getPartitionVertices'
        , instance.seedFileInput.get()
        , function (error, result) {

          $('#seedFileInput-preview').html(result.data.replace(/\\n/g, "<br/>"));
          
          Meteor.call('getPartitionPlot'
            , instance.seedFileInput.get()
            , function (error, result) {

              $('#partition-plot').attr("src", result.data);

              if (instance.speckFileInput.get().split(',').length > 1)
                Meteor.call('getPartitionAssignment'
                  , instance.seedFileInput.get()
                  , instance.speckFileInput.get()
                  , function (error, result) {

                    $('#speckFileInput-preview').html(result.data.replace(/\\n/g, "<br/>"));
                    $("#main-spinner").css('display', 'none');

                });
              else $("#main-spinner").css('display', 'none');
          });
      });
    else {
      alert("Enter at least a seed file");
      $("#main-spinner").css('display', 'none');
    }
  }
});
