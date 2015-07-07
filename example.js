
function Box(v) {
    this.value = v;
}

function benchmark(n, iters, f) {
    var a = [];
    for (var i = 0; i < n; i++) {
        var v = Math.random() * 100.0;
        a.push(new Box(v));
    }

    var c = new Box("Hello world");

    var start = Date.now();
    for (var i = 0; i < iters; i++)
        f(a);
    return Date.now() - start;
}

Array.prototype.myForEach = function (f) {
    for (var i = 0; i < this.length; i++) {
        f(this[i]);
    }
}

function doForEach(a) {
    var max = -Infinity;
    for (var i = 0; i < a.length; i++) {
        var val = a[i].value;
        if (val > max)
            max = val;
    }
}

console.log(benchmark(500, 50000, doForEach));

