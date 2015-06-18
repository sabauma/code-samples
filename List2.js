
var Node2 = function(val, next) {
    this.val  = val;
    this.next = next;
}

function List2(vals) {
    this.first = null;
    this.last  = null;

    if (vals && vals.constructor === Array) {
        for (var i = vals.length; i >= 0; --i) {
            this.push(vals[i]);
        }
    }
}

List2.prototype.isEmpty = function() {
    return this.first === null && this.last === null;
}

List2.prototype.push = function(val) {
    this.first = new Node2(val, this.first);

    // Fixup end pointer if we were empty
    if (this.last === null) {
        this.last = this.first;
    }
}

List2.prototype.pushBack = function(val) {
    var next = new Node2(val, null);

    if (this.first === null && this.last === null) {
        this.first = next;
        this.last  = next;
    } else {
        this.last.next = next;
        this.last      = next;
    }
}

List2.prototype.pop = function() {
    if (this.first === null) {
        throw new Error("empty list");
    }

    var val    = this.first.val;
    this.first = this.first.next;
    this.last  = first === null ? null : this.last;
    return val;
}

List2.prototype.forEach = function(f) {
    var cur = this.first;
    while (cur !== null) {
        f(cur.val);
        cur = cur.next;
    }
}

// Duplicate that we will use for benchmarking complex programs
List2.prototype.forEach2 = function(f) {
    var cur = this.first;
    while (cur !== null) {
        f(cur.val);
        cur = cur.next;
    }
}

List2.prototype.mapInplace = function(f) {
    var cur = this.first;
    while (cur) {
        cur.val = f(cur.val);
        cur = cur.next;
    }
}

List2.prototype.map = function(f) {
    var retval = new List2();
    this.forEach(function(x) { retval.pushBack(f(x)); });
    return retval;
}

List2.prototype.foldl = function(f, z) {
    var cur = this.first;
    var acc = z;
    while (cur !== null) {
        acc = f(acc, cur.val);
        cur = cur.next;
    }
    return acc;
}

List2.prototype.append = function(other) {
    var retval = new List2();
    var λ = retval.pushBack.bind(retval)
    this.forEach(λ);
    other.forEach(λ);
    return retval;
}

//var example = new List();

//for (var i = 0; i < 10000; ++i) {
    //example.pushBack(i);
//}

//var dub = example.append(example);

//console.log(example.foldl(function(a,b) {return a + b;}, 0));
//console.log(dub.foldl(function(a,b) {return a + b;}, 0));

