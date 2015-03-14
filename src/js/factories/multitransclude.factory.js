(function () {
    'use strict';

    angular
        .module('wfApp.factories')
        .factory('MultiTransclude', MultiTransclude);

    function MultiTransclude() {
        var service = {
            transclude: transclude
        };

        return service;

        ////////////////

        function transclude(elem, transcludeFn) {
            transcludeFn((clone) => {

                angular.forEach(clone, (cloneEl) => {
                    // get desired target ID
                    var tId = cloneEl.attributes['transclude-to'].value;

                    // find target element with that ID
                    var target = elem.find('[transclude-id="${tId}"]');

                    // append element to target
                    if (target.length) {
                        target.append(cloneEl);
                    } else {
                        cloneEl.remove();
                        throw new Error('Target not found. Please specify the correct transclude-to attribute.');
                    }

                });

            });
        }
    }
})();