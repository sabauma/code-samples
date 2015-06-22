
function benchmark(n, iters, f) {
    var outer = [];
    for (var i = 0; i < n; i++) {
        var inner = [];
        for (var j = 0; j < n; j++) {
            inner.push(Math.random() * 100)
        }
        outer.push(inner);
    }
    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(outer);
    return Date.now() - start;
}

Array.prototype.myForEach = function (f) {
    for (var i = 0; i < this.length; i++) {
        f(this[i]);
    }
}

function doForEach(outer) {
    max = -Infinity;

    var innerFunc = function(v) {
        if (v > max)
            max = v;
    };

    var outerFunc = function(v) {
        v.myForEach(innerFunc);
    };

    //for (var i = 0; i < 1000; ++i) {
        //innerFunc(0);
    //}

    //for (var i = 0; i < 1000; ++i) {
        //outerFunc([0]);
    //}

    outer.myForEach(outerFunc);

    //outer.myForEach(function (inner) {
        //inner.myForEach(function (v) {
            //if (v > max)
                //max = v;
        //});
    //});
}

console.log(benchmark(50, 50000, doForEach));

