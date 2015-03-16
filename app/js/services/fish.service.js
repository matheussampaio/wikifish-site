(function () {
    'use strict';

    angular
        .module('wfApp.services')
        .factory('Fish', Fish);

    Fish.$inject = ['$resource'];

    function Fish($resource) {
        var service = {
            resource: $resource('/api/fish/:id'),
            getFishByID: getFishByID,
            getFishByQuery: getFishByQuery
        };

        return service;

        ////////////////

        function getFishByID(fishid) {
            return service.resource.get({'id': fishid}).$promise
                .then(getFishByIDComplete)
                .catch(getFishByIDFailed);

            function getFishByIDComplete(response) {
                return response;
            }

            function getFishByIDFailed(error) {
                console.error('Get fish by ID failed.', error);
            }
        }

        function getFishByQuery(query) {
            return service.resource.query(query).$promise
                .then(getFishByQueryComplete)
                .catch(getFishByQueryFailed);

            function getFishByQueryComplete(response) {
                return response;
            }

            function getFishByQueryFailed(error) {
                console.error('Get fish by query failed.', error);
            }
        }

    }
})();

