'use strict';

describe('Directives: hkMap', function() {

  beforeEach(module('frontendApp'));

  var $compile, $httpBackend, $rootScope, AreaSelection, leafletData;
  var scope, template, elem, mapScope, mapElement;

  beforeEach(function() {
    inject(function($injector) {
      $compile = $injector.get('$compile');
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
      AreaSelection = $injector.get('AreaSelection');
      leafletData = $injector.get('leafletData');
    });

    // Load the json fixtures -- need base because Karma adds that path
    jasmine.getJSONFixtures().fixturesPath = 'base/app/scripts';
    $httpBackend.whenGET('scripts/geo/ca_polygon.topo.json').respond(getJSONFixture('geo/ca_polygon.topo.json'));
    $httpBackend.whenGET('scripts/geo/dc_polygon.topo.json').respond(getJSONFixture('geo/dc_polygon.topo.json'));
    $httpBackend.whenGET('scripts/mappings/geo-tree.json').respond(getJSONFixture('mappings/geo-tree.json'));

    // set up the scope
    scope = $rootScope.$new();
    elem = angular.element('<div class="container"><hk-map></hk-map></div>');
    mapElement = getMapElement(elem);
  });

  var getMapScope = function(template) {
    return angular.element(template.children()[0]).scope();
  };

  var getMapElement = function(element) {
    return angular.element(element.children()[0]);
  };

  var getLeafletScope = function(template) {
    // Gotta be doing something wrong here...
    return angular.element(angular.element(template.children()[0]).children()[0]).scope();
  };

  it("accepts mapCenter attribute for two way updating", function() {
    scope.outerCenter = {
      lat: 22.298,
      lng: 114.151,
      zoom: 10
    };
    mapElement.attr("map-center", "outerCenter");
    template = $compile(elem)(scope);

    mapScope = getMapScope(template);
    expect(mapScope.center).toBe(scope.outerCenter);

    scope.outerCenter.zoom = 5;
    expect(mapScope.center).toBe(scope.outerCenter);
  });

  it("accepts selectedAreas attribute for two way updating", function() {
    scope.outerModel = AreaSelection.getModel();
    mapElement.attr('selected-areas', 'outerModel');

    template = $compile(elem)(scope);
    mapScope = getMapScope(template);

    expect(mapScope.selectedAreas).toBe(scope.outerModel);
    expect(mapScope.selectedAreas.selectedAreas()).toEqual(scope.outerModel.selectedAreas());
    scope.outerModel.addArea('a01');
    $httpBackend.flush();
    $rootScope.$apply();
    expect(mapScope.selectedAreas.selectedAreas()).toEqual(scope.outerModel.selectedAreas());

    mapScope.selectedAreas.addArea('b01');
    $rootScope.$apply();
    expect(mapScope.selectedAreas.selectedAreas()).toEqual(scope.outerModel.selectedAreas());
  });

  it("gets the map object from the leaflet-directive scope", function() {
    elem = angular.element('<div class="container"><hk-map map-id="one"></hk-map><hk-map map-id="two"></hk-map></div>');
    template = $compile(elem)(scope);
    var map1 = angular.element(template.children()[0]);
    var mapScope1 = map1.scope();
    var map2 = angular.element(template.children()[1]);
    var mapScope2 = map2.scope();
    $httpBackend.flush();
    $rootScope.$apply();
    mapScope1.getMap().then(function(map) {
      expect($(map._container)).toBe('#one');
    });
    mapScope2.getMap('two').then(function(map) {
      expect($(map._container)).toBe('#two');
    });
    $rootScope.$apply();
  });

  iit("modifying the selectedAreas model updates the map", function() {
    scope.outerModel = AreaSelection.getModel();
    scope.outerModel.addArea(['a01', 'b01', 'c01']);
    mapElement.attr('selected-areas', 'outerModel');

    template = $compile(elem)(scope);
    mapScope = getMapScope(template);
    $httpBackend.flush();
    $rootScope.$apply();
    console.log(angular.element('.map-selected').length);
  });

});