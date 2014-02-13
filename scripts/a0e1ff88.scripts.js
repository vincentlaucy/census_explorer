"use strict";angular.module("frontendApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngAnimate","leaflet-directive","jm.i18next"]).constant("serverPrefix","/").config(["$i18nextProvider","serverPrefix",function(a,b){a.options={lng:"en-US",useCookie:!1,useLocalStorage:!1,fallbackLng:"en-US",ns:"human_ns",fallbackNS:["generated_ns"],resGetPath:b+"locale/__lng__/__ns__-translation.json"}}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/test",{templateUrl:"views/test.html",controller:"TestCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/getdata",{templateUrl:"views/getdata.html",controller:"GetDataCtrl"}).when("/discover",{templateUrl:"views/discover.html",controller:"DiscoverCtrl"}).when("/explore",{templateUrl:"views/explore.html",controller:"ExploreCtrl"}).when("/choropleth",{templateUrl:"views/choropleth.html",controller:"ChoroplethCtrl"}).when("/medians",{templateUrl:"views/medians.html",controller:"MediansCtrl"}).when("/browser",{templateUrl:"views/browser.html",controller:"BrowserCtrl"}).otherwise({redirectTo:"/"})}]).run(["$i18next",function(){window.i18n.loadNamespaces(["generated_ns"],function(){})}]),angular.module("frontendApp").factory("GeoFiles",["$http","$q","$cacheFactory",function(a,b){var c={};return c.getAreas=function(){var c=b.defer();return a.get("scripts/geo/ca_polygon.topo.json",{cache:!0}).success(function(a){var b=topojson.feature(a,a.objects["ca_polygon.geo"]);c.resolve(b)}),c.promise},c.getDistricts=function(){var c=b.defer();return a.get("scripts/geo/dc_polygon.topo.json",{cache:!0}).success(function(a){var b=topojson.feature(a,a.objects["dc_polygon.geo"]);c.resolve(b)}),c.promise},c}]),angular.module("frontendApp").factory("GeoMappings",[function(){var a={};return a._data={geoTree:{hk:{a:["a01","a02","a03","a04","a05","a06","a07","a08","a09","a10","a11","a12","a13","a14","a15"],b:["b01","b02","b03","b04","b05","b06","b07","b08","b09","b10","b11"],c:["c01","c02","c03","c04","c05","c06","c07","c08","c09","c10","c11","c12","c13","c14","c15","c16","c17","c18","c19","c20","c21","c22","c23","c24","c25","c26","c27","c28","c29","c30","c31","c32","c33","c34","c35","c36","c37"],d:["d01","d02","d03","d04","d05","d06","d07","d08","d09","d10","d11","d12","d13","d14","d15","d16","d17"]},nt:{k:["k01","k02","k03","k04","k05","k06","k07","k08","k09","k10","k11","k12","k13","k14","k15","k16","k17"],l:["l01","l02","l03","l04","l05","l06","l07","l08","l09","l10","l11","l12","l13","l14","l15","l16","l17","l18","l19","l20","l21","l22","l23","l24","l25","l26","l27","l28","l29"],m:["m01","m02","m03","m04","m05","m06","m07","m08","m09","m10","m11","m12","m13","m14","m15","m16","m17","m18","m19","m20","m21","m22","m23","m24","m25","m26","m27","m28","m29","m30","m31"],n:["n01","n02","n03","n04","n05","n06","n07","n08","n09","n10","n11","n12","n13","n14","n15","n16","n17"],p:["p01","p02","p03","p04","p05","p06","p07","p08","p09","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19"],q:["q01","q02","q03","q04","q05","q06","q07","q08","q09","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20","q21","q22","q23","q24"],r:["r01","r02","r03","r04","r05","r06","r07","r08","r09","r10","r11","r12","r13","r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36"],s:["s01","s02","s03","s04","s05","s06","s07","s08","s09","s10","s11","s12","s13","s14","s15","s16","s17","s18","s19","s20","s21","s22","s23","s24","s25","s26","s27","s28","s29"],t:["t01","t02","t03","t04","t05","t06","t07","t08","t09","t10"]},kl:{e:["e01","e02","e03","e04","e05","e06","e07","e08","e09","e10","e11","e12","e13","e14","e15","e16","e17"],f:["f01","f02","f03","f04","f05","f06","f07","f08","f09","f10","f11","f12","f13","f14","f15","f16","f17","f18","f19","f20","f21"],g:["g01","g02","g03","g04","g05","g06","g07","g08","g09","g10","g11","g12","g13","g14","g15","g16","g17","g18","g19","g20","g21","g22"],h:["h01","h02","h03","h04","h05","h06","h07","h08","h09","h10","h11","h12","h13","h14","h15","h16","h17","h18","h19","h20","h21","h22","h23","h24","h25"],j:["j01","j02","j03","j04","j05","j06","j07","j08","j09","j10","j11","j12","j13","j14","j15","j16","j17","j18","j19","j20","j21","j22","j23","j24","j25","j26","j27","j28","j29","j30","j31","j32","j33","j34","j35"]}},districts:["a","b","c","d","e","f","g","h","j","k","l","m","n","p","q","r","s","t"],regions:["hk","kl","nt"]},a._data.areas=_.sortBy(_.flatten(_.map(_.values(a._data.geoTree),_.values))),a.getDistrictsFromRegion=function(b){if(b=b.toLowerCase(),_.isUndefined(a._data.geoTree[b]))throw String(b)+" is not a valid region";return _.keys(a._data.geoTree[b])},a.getRegionFromDistrict=function(b){var c;b=b.toLowerCase();for(var d=0;d<a._data.regions.length;d++)if(c=a._data.regions[d],_.contains(_.keys(a._data.geoTree[c]),b))return c;throw String(b)+" is not a valid district"},a.getDistrictFromArea=function(b){var c=b.toLowerCase().charAt(0);if(_.contains(a._data.districts,c))return c;throw String(c)+" is not a valid district"},a.getAreasFromDistrict=function(b){b=b.toLowerCase();var c=a.getRegionFromDistrict(b);return a._data.geoTree[c][b]},a.getAllAreas=function(){return a._data.areas},a.getAllDistricts=function(){return a._data.districts},a}]),angular.module("frontendApp").factory("AreaSelection",["GeoMappings",function(a){var b=0,c=1,d=2,e={},f=function(){this._selected={}};f.prototype.selectedAreas=function(){return _.sortBy(_.keys(this._selected))};var g=function(e){return e=e.toLowerCase(),_.contains(a._data.regions,e)?d:_.contains(a._data.districts,e)?c:b},h=function(b,e){e=e.toLowerCase();var f=g(e);if(f===d)j(b,e);else if(f===c)i(b,e);else{var h=a.getAllAreas();if(_.has(b._selected,e))return;if(!(_.indexOf(h,e,!0)>-1))throw String(e)+" is not a valid area";b._selected[e]=!0}},i=function(b,c){c=c.toLowerCase();var d=a.getAreasFromDistrict(c);_.forEach(d,function(a){b._selected[a]=!0})},j=function(b,c){c=c.toLowerCase();var d=a.getDistrictsFromRegion(c);_.forEach(d,_.partial(i,b))};f.prototype.addArea=function(a){_.isArray(a)?_.forEach(a,_.partial(h,this)):h(this,a)},f.prototype.clearSelected=function(){var a=this;_.forOwn(this._selected,function(b,c){delete a._selected[c]})};var k=function(a,b){b=b.toLowerCase();var e=g(b);e===d?l(a,b):e===c?m(a,b):delete a._selected[b]},l=function(b,c){c=c.toLowerCase();var d=a.getDistrictsFromRegion(c);_.forEach(d,_.partial(m,b))},m=function(b,c){c=c.toLowerCase();var d=a.getAreasFromDistrict(c);_.forEach(d,function(a){delete b._selected[a]})};return f.prototype.removeArea=function(a){_.isArray(a)?_.forEach(a,_.partial(k,this)):k(this,a)},f.prototype.isSelected=function(b){var e=this;b=b.toLowerCase();var f=g(b);if(f===d){var h=_.flatten(_.map(a.getDistrictsFromRegion(b)),function(b){return a.getAreasFromDistrict(b)});return _.every(_.map(h,function(a){return _.has(e._selected,a)}))}if(f===c){var h=a.getAreasFromDistrict(b);return _.every(_.map(h,function(a){return _.has(e._selected,a)}))}return _.has(e._selected,b)},f.prototype.hasSelection=function(){return _.keys(this._selected).length>0},e.AreaModel=f,e.getModel=function(){return new f},e}]),angular.module("frontendApp").factory("CensusAPI",["$log","$http","$q",function(a,b,c){var d={};d.endpointURL="http://137.189.97.90:5901/api/",d._baseFilters={area:{},table:{},column:{},row:{},projector:{},"return":{},groupby:{},aggregate:{},region:{},district:{}},d.joinData=function(a){for(var b,c=_.values(a)[0].length,d=[],e=_.keys(a),f=0;c>f;f++)b={},_.forEach(e,function(c){b[c]=a[c][f]}),d.push(b);return d},d.joinGroups=function(a,b){if(_.isString(b)){var c=[];return _.forOwn(a,function(a,e){var f=d.joinData(a);_.forEach(f,function(a){a[b]=e}),c.push(f)}),_.flatten(c)}return _.flatten(_.map(_.values(a),d.joinData))},d.sumBy=function(a,b){_.isString(b)&&(b=[b]);var c={};return _.forEach(a,function(a){var d=_.map(b,function(b){return a[b]}).join(",");_.has(c,d)||(c[d]=0),c[d]+=a.value}),c},d.asPercentage=function(a,b){_.isString(b)&&(b=[b]);var c=d.sumBy(a,b),e=[];return _.map(a,function(a){var d=_.map(b,function(b){return a[b]}).join(","),f=_.clone(a,!0);f.value=f.value/c[d],e.push(f)}),e};var e=function(a){this._filters=_.clone(d._baseFilters,!0),_.isUndefined(a)||this.addParam(a)},f=function(a){var b=_.keys(d._baseFilters);if(-1===_.indexOf(b,a))throw'[CensusAPI]: "'+String(a)+'" is not a valid parameter'};e.prototype._addSingleParam=function(a,b){f(a),_.isArray(b)?_.forEach(b,function(b){this._filters[a][b]=!0},this):_.isPlainObject(b)?_.forEach(_.keys(b),function(b){this._filters[a][b]=!0},this):this._filters[a][b]=!0},e.prototype.addParam=function(a,b){_.isPlainObject(a)?_.forOwn(a,function(a,b){this._addSingleParam.apply(this,[b,a])},this):this._addSingleParam(a,b)};var g=function(a){var b=_.omit(a,function(a){return _.isEmpty(a)});return _.mapValues(b,function(a){return _.keys(a).join(",")})};return e.prototype.fetch=function(){var a=c.defer();return b.get(d.endpointURL,{params:g(this._filters),cache:!0}).then(function(b){a.resolve(b.data)}),a.promise},e.prototype.clone=function(){return new e(this._filters)},d.Query=e,d}]),angular.module("frontendApp").factory("Indicators",[function(){var a={},b={};return b.areaMedianModifier={groupby:"area",aggregate:"median",projector:["value","row"],"return":["groups","options"]},b.areaModeModifier={groupby:"area",aggregate:"max",projector:["value","row"],"return":["groups","options"]},b.maritalStatus={table:2,column:"e28_both",projector:["area","value","row"],"return":["data","options"]},b.maritalStatusMale={table:2,column:"c28_male",projector:["area","value","row"],"return":["data","options"]},b.maritalStatusFemale={table:2,column:"d28_female",projector:["area","value","row"],"return":["data","options"]},b.educationalAttainment={table:3,column:"e43_total",projector:["area","value","row"],"return":["data","options"]},b.economicStatus={table:4,column:"e61_both",projector:["area","value","row"],"return":["data","options"]},b.economicStatusMale={table:4,column:"c61_male",projector:["area","value","row"],"return":["data","options"]},b.economicStatusFemale={table:4,column:"d61_female",projector:["area","value","row"],"return":["data","options"]},b.monthlyIncome={table:5,column:"e77_both",projector:["area","value","row"],"return":["data","options"]},b.monthlyIncomeMale={table:5,column:"c77_both",projector:["area","value","row"],"return":["data","options"]},b.monthlyIncomeFemale={table:5,column:"d77_both",projector:["area","value","row"],"return":["data","options"]},b.householdComposition={table:6,projector:["area","value","row"],"return":["data","options"]},b.householdSize={table:7,projector:["area","value","row"],"return":["data","options"]},b.householdSizeMedian={table:7,aggregate:"median",projector:["area","value","row"],"return":["groups","options"],groupby:"area"},b.householdHousingType={table:8,column:"d146_households",projector:["area","value","row"],"return":["data","options"]},b.housingTenure={table:9,projector:["area","value","row"],"return":["data","options"]},b.individualHousingType={table:10,column:"e168_both",projector:["area","value","row"],"return":["data","options"]},b.individualHousingTypeMale={table:10,column:"c168_male",projector:["area","value","row"],"return":["data","options"]},b.individualHousingTypeFemale={table:10,column:"d168_female",projector:["area","value","row"],"return":["data","options"]},b.migration={table:11,projector:["area","value","row"],"return":["data","options"]},b.age={table:12,column:"n6_both",projector:["area","value","row"],"return":["data","options"]},b.ageMale={table:12,column:"l6_both",projector:["area","value","row"],"return":["data","options"]},b.ageFemale={table:12,column:"m6_both",projector:["area","value","row"],"return":["data","options"]},b.placeOfStudy={table:14,projector:["area","value","row"],"return":["data","options"]},b.placeOfWork={table:15,column:"n61_both",projector:["area","value","row"],"return":["data","options"]},b.placeOfWorkMale={table:15,column:"l61_male",projector:["area","value","row"],"return":["data","options"]},b.placeOfWorkFemale={table:15,column:"m61_female",projector:["area","value","row"],"return":["data","options"]},b.occupation={table:16,column:"n81_both",projector:["area","value","row"],"return":["data","options"]},b.occupationMale={table:16,column:"l81_male",projector:["area","value","row"],"return":["data","options"]},b.occupationFemale={table:16,column:"m81_female",projector:["area","value","row"],"return":["data","options"]},b.industry={table:17,column:"n95_both",projector:["area","value","row"],"return":["data","options"]},b.industryMale={table:17,column:"l95_male",projector:["area","value","row"],"return":["data","options"]},b.industryFemale={table:17,column:"m95_female",projector:["area","value","row"],"return":["data","options"]},b.householdIncome={table:18,column:"n118_households",projector:["area","value","row"],"return":["data","options"]},b.householdMortgage={table:19,projector:["area","value","row"],"return":["data","options"]},b.householdRent={table:20,projector:["area","value","row"],"return":["data","options"]},a.queries=b,a}]),angular.module("frontendApp").directive("hkMap",function(){return{scope:!0,restrict:"AE",priority:10,compile:function(a,b){var c=angular.element(a.children()[0]);c.css("height",b.height||"300px"),a.css("position","relative"),_.isUndefined(b.mapId)||c.attr("id",b.mapId)},controller:["$scope","GeoFiles","$attrs","AreaSelection","$parse","leafletData","$i18next",function(a,b,c,d,e,f){a.defaults={scrollWheelZoom:!0,maxZoom:18},a._singleSelect=_.has(c,"singleSelect");var g=14;a.center=_.isUndefined(c.mapCenter)?{}:e(c.mapCenter)(a),_.isEmpty(a.center)&&angular.extend(a.center,{lat:22.298,lng:114.151,zoom:12}),a.getMap=function(){return _.isUndefined(c.mapId)?f.getMap():f.getMap(c.mapId)},a._defaultStyle={color:"#2b8cbe",fillOpacity:0,weight:3},a._hoverStyle={color:"#000",fillColor:"#2b8cbe",fillOpacity:.2,weight:6},a._partiallySelectedStyle={color:"#ff0",fillColor:"#ff0",fillOpacity:.2,weight:6},a._selectedStyle={color:"#2ca25f",fillColor:"#2ca25f",fillOpacity:.2,weight:6};var h=function(b){var c=b.properties.CODE;return a.selectedAreas.isSelected(c)?a._selectedStyle:a._defaultStyle};a.selectedAreas=_.isUndefined(c.selectedAreas)?d.getModel():e(c.selectedAreas)(a);var i=function(a){var b=_.values(a._layers);_.forEach(b,function(a){_.isUndefined(a.feature)||_.isUndefined(a.feature.properties)||a.setStyle(h(a.feature))})},j=function(){a.getMap().then(function(a){i(a)})};a.$on("redrawMap",function(){console.log("redrawing map"),j()});var k=function(b){var c=b.target,d=m(b);a.selectedAreas.isSelected(d)||(c.setStyle(a._hoverStyle),L.Browser.ie||L.Browser.opera||c.bringToFront()),a.hoveredFeature=d},l=function(b){var c=b.target,d=m(b);a.selectedAreas.isSelected(d)||c.setStyle(a._defaultStyle),a.hoveredFeature=void 0},m=function(a){return a.target.feature.properties.CODE},n=function(b){var c=m(b);a._singleSelect===!0&&(a.selectedAreas.clearSelected(),j()),a.selectedAreas.isSelected(c)?(b.target.setStyle(a._hoverStyle),a.selectedAreas.removeArea(c)):(b.target.setStyle(a._selectedStyle),a.selectedAreas.addArea(c))},o=function(a,b){b.on({mouseover:k,mouseout:l,click:n})};b.getDistricts().then(function(b){a.districts={data:b,style:h,onEachFeature:o},a.geojson=a.districts}),b.getAreas().then(function(b){a.areas={data:b,style:h,onEachFeature:o}}),a.$watch("center.zoom",function(b){a.geojson=b>=g?a.areas:a.districts})}],template:'<leaflet center="center" defaults="defaults" geojson="geojson"></leaflet><div class="map-overlay" ng-show="hoveredFeature">{{ "area.code."+hoveredFeature | i18next}}</div>'}}),angular.module("frontendApp").directive("hkChoropleth",function(){return{scope:!0,restrict:"AE",priority:10,compile:function(a,b){var c=angular.element(a.children()[0]);c.css("height",b.height||"300px"),a.css("position","relative"),_.isUndefined(b.mapId)||c.attr("id",b.mapId)},controller:["$scope","GeoFiles","$attrs","AreaSelection","$parse","leafletData",function(a,b,c,d,e,f){a.defaults={scrollWheelZoom:!0,maxZoom:18};var g={colors:colorbrewer.Blues[5],scale:null,valueVar:"value",style:{fillOpacity:.5}},h=.5;a.center=_.isUndefined(c.mapCenter)?{}:e(c.mapCenter)(a),_.isEmpty(a.center)&&angular.extend(a.center,{lat:22.298,lng:114.151,zoom:12}),a.getMap=function(){return _.isUndefined(c.mapId)?f.getMap():f.getMap(c.mapId)},a._getValueFromArea=function(b){return _.isUndefined(b)||_.isUndefined(a._mapDataHash)?void 0:(b=b.toLowerCase(),a._mapDataHash[b])};var i=e(c.mapData),j=function(){return a._mapData=i(a),a._mapData};a.$watch(j,function(b){_.isUndefined(b)||(l(),k(),m(),n(),a.getMap().then(function(a){p(a)}))});var k=function(){a._mapDataHash={},_.forEach(a._mapData,function(b){a._mapDataHash[b.area]=b[a._mapConfig.valueVar]})},l=function(){var b=_.clone(g);if(!_.isUndefined(c.mapConfig)){var d=e(c.mapConfig);_.assign(b,d(a))}a._mapConfig=b},m=function(){if(null===a._mapConfig.scale){var b=_.sortBy(_.pluck(a._mapData,a._mapConfig.valueVar));a._colorScale=d3.scale.quantize().domain(b).range(d3.range(5))}else a._colorScale=a._mapConfig.scale;a._colors=a._mapConfig.colors},n=function(){var b=d3.select(".map-legend"),c=d3.format("0f");b.selectAll("ul").remove();var d=b.append("ul"),e=d.selectAll("li.key").data(a._colorScale.range());if(e.enter().append("li").attr("class","key"),e.append("span").attr("class","key-symbol").style("background-color",function(b){return a._colors[b]}).style("opacity",h),_.isUndefined(a._colorScale.invertExtent))var f=function(b){return a._colorScale.domain()[b]};else var f=function(b){var d=a._colorScale.invertExtent(b);return c(d[0])+" - "+c(d[1])};e.append("span").attr("class","key-label").text(f)};a._defaultStyle={color:"#2b8cbe",fillOpacity:0,weight:2};var o=function(b){var c=b.properties.CODE,d=_.clone(a._defaultStyle);return _.isUndefined(a._mapConfig.style)||_.extend(d,a._mapConfig.style),d.fillColor=a._colors[a._colorScale(a._getValueFromArea(c))],d},p=function(a){var b=_.values(a._layers);_.forEach(b,function(a){_.isUndefined(a.feature)||_.isUndefined(a.feature.properties)||a.setStyle(o(a.feature))})},q=function(b){var c=b.target,d=s(b);L.Browser.ie||L.Browser.opera||c.bringToFront(),a.hoveredFeature=d},r=function(b){b.target,s(b);a.hoveredFeature=void 0},s=function(a){return a.target.feature.properties.CODE},t=function(a,b){b.on({mouseover:q,mouseout:r})},u=e(c.mapLevel),v=function(){return a._mapLevel=u(a),a.mapLevel};a.$watch(v,function(c){"dc"==c?b.getDistricts().then(function(b){a.geojson={data:b,style:a._defaultStyle,onEachFeature:t}}):b.getAreas().then(function(b){a.geojson={data:b,style:a._defaultStyle,onEachFeature:t}})}),a.$on("redrawMap",function(){a.getMap().then(function(a){p(a)})})}],template:'<leaflet center="center" defaults="defaults" geojson="geojson"></leaflet><div class="map-overlay" ng-show="hoveredFeature">{{ hoveredFeature }} - {{ _getValueFromArea(hoveredFeature) }}</div><div class="map-legend"></div>'}}),angular.module("frontendApp").controller("MainCtrl",["$scope",function(){}]),angular.module("frontendApp").controller("AboutCtrl",["$scope",function(){}]),angular.module("frontendApp").controller("GetDataCtrl",["$scope",function(a){a.api_prefix="http://golden-shine-471.appspot.com/api",a.raw_json_prefix="http://hupili.net/projects/hk_census/data-clean/",a.raw_json_archive="http://hupili.net/projects/hk_census/data-clean.tar.gz"}]),angular.module("frontendApp").controller("DiscoverCtrl",["$scope",function(){}]),angular.module("frontendApp").controller("ExploreCtrl",["$scope",function(){}]);var MapCtrl=function(a,b,c,d){a.selection=d.getModel(),a.clearAndRedraw=function(){a.selection.clearSelected(),a.$broadcast("redrawMap")}};angular.module("frontendApp").controller("MapCtrl",MapCtrl),angular.module("frontendApp").controller("ChoroplethCtrl",["$scope","GeoMappings",function(a,b){a.newData=function(){a.districtData=_.map(b.getAllDistricts(),function(a){return{area:a,value:100*Math.random()}}),a.areaData=_.map(b.getAllAreas(),function(a){return{area:a,value:100*Math.random()}})},a.newData(),a.indicators=[{name:"foo",identifier:"bar"},{name:"bar",identifier:"baz"}],a.groups=[{name:"Both sexes",identifier:"both"},{name:"Male",identifier:"male"},{name:"Female",identifier:"female"}],a.mapLevel="ca",a.theData=a.areaData}]),angular.module("frontendApp").controller("MediansCtrl",["$scope","AreaSelection",function(a,b){a.selection=b.getModel()}]),angular.module("frontendApp").controller("TestCtrl",["$scope","GeoMappings","$http","CensusAPI","Indicators",function(a,b,c,d,e){a.refresh=function(){console.log("indicator:"),console.log(a.selectedIndicator);var b=new d.Query(a.selectedIndicator.params);console.log("query filters:"),console.log(b._filters),b.fetch().then(function(b){console.log("response:"),console.log(b);var c=a.selectedIndicator.parser(b);a.mapConfig=a.selectedIndicator.config,a.areaData=c})};var f=_.clone(colorbrewer.Reds[7]).reverse().concat(colorbrewer.Greens[7]),g={colors:f,valueVar:"row"},h=function(a){var b=d.joinGroups(a.groups,"area"),c=d3.scale.ordinal().domain(a.options.row).range(d3.range(14));return g.scale=c,b};a.indicators=[{name:"Median monthly income",params:_.extend(_.clone(e.queries.householdIncome,!0),e.queries.areaMedianModifier),config:g,parser:h},{name:"Most common monthly income",params:_.extend(_.clone(e.queries.householdIncome,!0),e.queries.areaModeModifier),config:g,parser:h},{name:"Median housing rental amount",params:_.extend(_.clone(e.queries.householdRent,!0),e.queries.areaModeModifier),config:g,parser:h}],a.mapLevel="ca",a.theData=a.areaData}]),angular.module("frontendApp").controller("BrowserCtrl",["$scope","CensusAPI",function(a,b){a.model={},a.options={},a.refresh=function(){var c=new b.Query(a.model);c.addParam("return","options"),c.fetch().then(function(b){a.options=b.options,a.meta=b.meta})},a.clear=function(b){_.isUndefined(b)?a.model={}:delete a.model[b],a.refresh()},a.refresh()}]);