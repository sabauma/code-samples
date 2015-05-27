
var Node = function(val, next) {
    this.val  = val;
    this.next = next;
}

var List = function(vals) {
    this.nodes = null;
    if (vals && vals.constructor === Array) {
        for (var i = vals.length; i >= 0; --i) {
            this.push(vals[i]);
        }
    }
}

List.prototype.isEmpty = function() {
    return this.nodes === null;
}

List.prototype.push = function(val) {
    this.nodes = new Node(val, this.nodes);
}

List.prototype.pop = function() {
    if (this.nodes === null) {
        throw new Error("empty list");
    }
    var val = this.nodes.val;
    this.nodes = this.nodes.next;
    return val;
}

List.prototype.forEach = function(f) {
    var cur = this.nodes;
    while (cur !== null) {
        f(cur.val);
        cur = cur.next;
    }
}

List.prototype.mapInplace = function(f) {
    var cur = this.nodes;
    while (cur) {
        cur.val = f(cur.val);
        cur = cur.next;
    }
}

var __mapHelper = function(f, xs) {
    return xs === null ? null : new Node(f(xs.val, __mapHelper(f, xs.next)));
}

List.prototype.map = function(f) {
    return __mapHelper(f, this.nodes);
}

List.prototype.foldl = function(f, z) {
    var cur = this.nodes;
    var acc = z;
    while (cur !== null) {
        acc = f(acc, cur.val);
        cur = cur.next;
    }
    return acc;
}

List.prototype.append = function(other) {
    var retval = new List();

    if (this.isEmpty() && other.isEmpty()) {
        return retval;
    }

    var cur      = new Node(null, null);
    retval.nodes = cur;

    var λ = function(x) {
        cur.val  = x
        cur.next = new Node(null, null);
        cur      = cur.next;
    };

    this.forEach(λ);
    other.forEach(λ);

    return retval;
}

var example = new List();

for (var i = 9999; i >= 0; --i) {
    example.push(i);
}

var double = example.append(example);

console.log(example.foldl(function(a,b) {return a + b;}, 0));
console.log(double.foldl(function(a,b) {return a + b;}, 0));


