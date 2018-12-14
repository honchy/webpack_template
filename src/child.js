class Child {
    constructor() {}
    sayHello(name) {
        let s = new Set([1,2, 3]);
        console.log([5, ...s]);
        Object.assign({}, {
            name: 'liLei'
        });
        console.log('hello', name);
    }
}
