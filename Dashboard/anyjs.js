var Promise = require('promise');

let myFirstPromise = new Promise((resolve, reject) => {
    // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
    // In this example, we use setTimeout(...) to simulate async code. 
    // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout(function () {
        resolve("Success!"); // Yay! Everything went well!
    }, 1010);
});
var f = function (y) {
    myFirstPromise.then((successMessage) => {
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        console.log("Yay! " + successMessage + x + ":y:" + y);
    });

}
for (var x = 0; x < 40; x++) {
    f(x);
}

var Rx = require('rx');
var Cluster = require('rxjs-cluster'); // import
var options = {};
var rc = new Cluster( options ); // instance
 
var Observable = Rx.Observable;
 
// Child function that returns raw value
function childTest(x) {
    return "hello " + x + " from " + process.pid;
}
 
// Child function that returns an Observable
function childTest$(x) {
    return Rx.Observable.range(0,3).map("hello " + x).toArray();
}
 
function master() {
    Observable.from(['Jonathan', 'James', 'Edwin'])
        .clusterMap('childTest')
        .subscribe(
            function(x) { console.log(x); },
            function(x) { console.log('Err ' + x); },
            function() { console.log('Completed'); }
        );
 
    Observable.from(['Jonathan', 'James', 'Edwin'])
        .clusterMap('childTest$')
        .subscribe(
            function(x) { console.log(x); },
            function(x) { console.log('Err ' + x); },
            function() {
                console.log('Completed');
                rc.killall(); // kill all workers, clusterMap will no longer work
            }
        );
}
 
// Define number of workers, master entry point, worker functions
rc.entry(master, { 'childTest': childTest,
                      'childTest$': childTest$ });
 
// Or define leave the default number of workers to # of cpu cores
// rc.entry(master, { 'childTest': childTest, 'childTest$': childTest$ });
