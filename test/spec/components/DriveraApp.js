'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var DriveraApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    DriveraApp = require('components/DriveraApp.js');
    component = React.createElement(DriveraApp);
  });

  it('should create a new instance of DriveraApp', function () {
    expect(component).toBeDefined();
  });
});
