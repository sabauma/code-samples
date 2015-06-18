
load("List.js");
load("List2.js");

function benchmark(n, iters, f) {
    var outer = new List();
    for (var i = 0; i < n; i++) {
        var inner = new List2();
        for (var j = 0; j < n; j++)
            inner.pushBack(Math.random() * 100);
        outer.pushBack(inner);
    }

    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(outer);
    return Date.now() - start;
}

function doForEach(outer) {
    var max = -Infinity;
    outer.forEach(function (inner) {
        inner.forEach(function (v) {
            if (v > max)
                max = v;
        });
    });
}

console.log(benchmark(50, 50000, doForEach));

