var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
    'api-key': "ac2d7e3c5e7c482ebf51ca7395bd5b74"
});

app.controller('MainController', function ($scope, $http) {

    $scope.list = [];
    $scope.dateFrom = "2017-01-01"
    $scope.dateTo = "2017-12-31";
    $scope.dateKey = 'date';

    $http({
            method: 'GET',
            url: url,
        }).then(function success(result) {
            for (i = 0; i < result.data.results.length; i++) {
                var story = {
                    title: result.data.results[i].title,
                    abstract: result.data.results[i].abstract,
                    url: result.data.results[i].url,
                    date: result.data.results[i].published_date,
                    image: result.data.results[i].multimedia[1].url,
                }

                $scope.list.push(story);
            }



            console.log(story);
        }),

        function error(err) {
            throw err;
        };

});

app.filter("dateFilter", function () {
    return function (items, dateKey, dateFrom, dateTo) {
        var itemsFiltered = [];
        for (var i = 0; i < items.length; i++) {
            if (moment(items[i][dateKey]).isSameOrAfter(dateFrom) && moment(items[i][dateKey]).isSameOrBefore(dateTo)) {
                itemsFiltered.push(items[i]);
            }
        }
        return itemsFiltered;
    };
});
