Router.route('/', {
  name: "upload",
  action: function() {
    this.render('upload');
  }
});

Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  onAfterAction: function() {
    $("#main-spinner").css('display', 'none');
  }
});
