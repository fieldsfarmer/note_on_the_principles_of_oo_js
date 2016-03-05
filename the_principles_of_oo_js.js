//The Principles of Object-Oriented Javascripit
//Nicolas C. Zakas 2013

'use strict'
//// ES5
//// primitive types: boolean, number, string, null, undefined
//// copy by value

console.log(typeof "hello");
console.log(typeof 10);
console.log(typeof undefined); //undefined
console.log(typeof NaN); //number
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false

//// interesting
console.log(typeof null); // object
//// primitive methods
var name = 'nima smith';
console.log(name[1]);
console.log(name.charAt(2));

//// Object
var o1 = new Object();
var o2 = o1;
o1.name = 'nima';
console.log(o2.name); // nima

//// Build-in Object Types
//// Array, Date, Error, Function, Object, RegExp
var item = new Array();
var now = new Date();
// console.log(now);
var error = new Error('Something wrong!');
var func = new Function('console.log("hi")');
var re = new RegExp("\\d+");

//// Literal Forms
//// A literal is syntax that allow one to define a reference value without explicitly creating an object, using new, the object's constructor
//// Object literals
var book = {
	name: 'Ji Pin Jia Ding', 
	'author': 'Yu Yan'
}
// console.log(book.name);
// console.log(book.author);
console.log(book['author']);
//// Array literals
var colors = ['red', 'blue'];
//// equivalent to
var c1 = new Array('red', 'blue');

function reflect(value){
	return value;
}
//// equivalent to
var reflect1 = new Function('value', 'return value'); //// this one is not a good practice 
//// Reg literals
var num = /\d+/g;
//// equivalent to
var n1 = new RegExp('\\d+', 'g');

//// Property access
var array = []; array.push(123); array['push'](456);
var method = 'push'; array[method](789);
// console.log(array); 

//// identifying Reference Types
//// you can identify functions by typeof, other types you just get object
console.log(typeof reflect); // function
console.log(typeof array);   // object

console.log(array   instanceof Array); 
console.log(array   instanceof Object); 
console.log(o1      instanceof Object);
console.log(reflect instanceof Function);
console.log(reflect instanceof Object);

//// identifying Arrays; ES5
console.log(Array.isArray(array));

//// Primitive Wrapper Types
var name1 = 'nimei';
var fstChar = name1.charAt(0);
//// behind scene
var n2 = 'nimei';
var tmp = new String(n2);
var fstChar1 = tmp.charAt(0);
tmp = null;

console.log(name1 instanceof String); //false

var n3 = new String('nidie');
var n4 = new Number(12); 
var n5 = new Boolean(false);

console.log(typeof n3); // object
console.log(typeof n4); // object
console.log(typeof n5); // object

console.log(n3 instanceof String); //true
console.log(n5 === false); // false
console.log(n5.value);
if(n5){
	console.log('this one excutes!');
}


////Chapter 2
////function has internal property [[Call]], the typeof operator looks for it on an object, and if it finds it, return 'function'
// the following function declaration is OK, because js engine hoists the function declaration to the top
var result = add(1,2);
function add(a, b){ return a+b; }
//// the following function expression is not OK
// var result1 = add1(1,2);
// var add1 = function(a, b){ return a+b; };

var n6 = [1,5,8,4,10];
n6.sort(function(a,b){return a-b});
console.log(n6);
n6.sort();
console.log(n6); //[ 1, 10, 4, 5, 8 ]

//// function parameter are arguments object, not an instanceof Array;
//// Array.isArray(arguments) false
console.log(reflect.length); // 1
// reflect = function(){
// 	return arguments[0];
// }
// console.log(reflect.length); // 0

// var reflect1 = function(){
// 	return arguments[0];
// }
// console.log(reflect1.length); //0
// function reflect2(){
// 	return arguments[0];
// }
// console.log(reflect2.length); //0

function sum(){
	var res = 0, 
		i = 0;
	while(i < arguments.length){
		res += arguments[i];
		++i;
	}
	return res;
}
console.log(sum(1,2,3));
console.log(sum());


////js no overloading; when defining multiple functions with same name, the last one wins
//// function object method
var person = {
	name: 'nima',
	sayName: sayName,
	sayHi: function(){
		console.log('Ni Hao, '+this.name);
	}
};
function sayName(){
	console.log('hello ' + this.name);
}
person.sayName();
person.sayHi();

////call method
function sayName1(label){
	console.log(label+': '+this.name);
}

name = 'Stephen';
console.log(name);
sayName1.call(this, 'global');// global: undefined // not the same as predict: global: Stephen
sayName1.call(person, 'person');

var nimammamamama = 'fck ya!';
console.log(this.nimammamamama); // undefined

sayName1.apply(this, ['global']); // global: undefined
sayName1.apply(person, ['person']);

////bind method
var sayNameTmp1 = sayName1.bind(person);
sayNameTmp1('person');
var sayNameTmp2 = sayName1.bind(person, 'Another');
sayNameTmp2(); //Aonther: nima

var person2 = {
	name: 'UIUC'
};

person2.sayName = sayNameTmp1;
person2.sayName('person2'); // person2: nima



////Chapter 3 Object; internal property [[Put]]; the result of calling [[Put]] is the creation of an own property, i.e. the instance owns the property; distinct from prototype property
//// when a new value is assigned to an existing property, [[Set]] takes place
//// to detect an property
//// in
console.log('name' in person2); //true
console.log('age' in person2);  //false
//// hasOwnProperty for own property
console.log(person2.hasOwnProperty('name'));     // true
console.log(person2.hasOwnProperty('toString')); // false

delete person2.name;
console.log('name' in person2); //false

////all properties that you add to an object are enumerable. Enumerable properties has their internal [[Enumerable]] attributes set to true
var p;
for(p in person){
	console.log('Name:  ' + p);
	console.log('Value: ' + person[p]);
}
//// ES5 introduces Object.keys() method; return an array
// var p2 = Object.keys(person);
// for(let i=0; i<p2.length; i+=1){
// 	console.log('Name:  '+p2[i]);
// 	console.log('Value: '+person[p2[i]]);
// }

//// The for-in loop also enumerates prototype properties; while Object.keys() returns only own(instance) properties

//// Not alll properties are enumerable
var p3 = Object.keys(person);
console.log('length' in p3);   //true
console.log(p3.propertyIsEnumerable('length')); //false

var p4 = [1,2,3];
console.log('length' in p4);
console.log(p4.propertyIsEnumerable('length')); //false

//// Types of Properties
//// 1. data properties; placeholder for values; when it holds a function value, the property is a method of the object
////2. accessor properties; getter, setter; it does not store values;
//// both data and accessor properties have attributes [[Enumerable]] [[Configurable]]
//// data:      [[Writable]], [[Value]]
//// accessor:  [[Get]], [[Set]]
var person3 = {
	_name: 'UIUC',
	get name(){
		console.log('Reading name');
		return this._name;
	},
	set name(value){
		console.log('Setting name to %s', value);
		this._name = value;
	}
};
console.log(person3.name);
person3.name = 'Facebook';
console.log(person3.name);
//// this way it seems the data is private

////Property attributes
////common attributes， [[Enumerable]], [[Configurable]]
var person4 = {
	name: 'UIUC'
};
Object.defineProperty(person4, 'name', {
	enumerable: false
});
console.log('name' in person4); //true
console.log(person4.hasOwnProperty('name')); //true
console.log(person4.propertyIsEnumerable('name')); //false
console.log(Object.keys(person4).length); //0

Object.defineProperty(person4, 'name', {
	configurable: false
});
// delete person4.name; // got error!!!!! in strict mode; operation fails silently in non-strict mode
console.log(person4.name);
//// the following gets error! You cannot make a nonconfigurable property configurable again
// Object.defineProperty(person4, 'name', {
// 	configurable: true
// });

////data property attributes; [[Value]], [[Writable]]
var person5 = {
	name: 'BN'
};
////equivalent
var person6 = {};
Object.defineProperty(person6, 'name', {
	value: 'BN',
	enumerable: true,
	configurable: true,
	wriable: true
});
//// default value is false
var person7 = {};
Object.defineProperty(person7, 'name', {
	value: 'Starbucks'
});
console.log(person7.propertyIsEnumerable('name')); //false
// delete person7.name;  // got error!!!!! in strict mode; operation fails silently in non-strict mode
// person7.name = 'Eva';    // got error!!!!! in strict mode; operation fails silently in non-strict mode
console.log(person7.name);

////accessor property attributes [[Get]], [[Set]]
////The definition of person3 is equivalent to
var person8 = {
	_name: 'UIUC'
};
Object.defineProperty(person8, 'name', {
	get: function(){
		console.log('Reading name');
		return this._name;
	},
	set: function(value){
		console.log('Setting name to %s', value);
		this._name = value;
	},
	enumerable: true,
	configurable: true
});
var person9 = {};
Object.defineProperties(person9, {
	_name: {
		value: 'UIUC',
		enumerable: true,
		configurable: true,
		writable: true
	},
	name: {
		get: function(){
			console.log('Reading name');
			return this._name;
		},
		set: function(value){
			console.log('Setting name to %s', value);
			this._name = value;
		},
		enumerable: true,
		configurable: true
	}
});

////Retrieving property attributes
var descriptor = Object.getOwnPropertyDescriptor(person9, '_name');
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
console.log(descriptor.writable);
console.log(descriptor.value);

////Preventing Object Modification; 
//// preventing extensions; [[Extensible]]; you cannot add new properties
var person10 = {name: 'Steve'};
console.log(Object.isExtensible(person10)); //true
Object.preventExtensions(person10);
console.log(Object.isExtensible(person10)); //false
// person10.age = 10; //get error!

////Sealing object: make object non-extensible and its properties non configurable; you can only read from and write to its properties
var person11 = {name: 'Chow'};
console.log(Object.isSealed(person11));
Object.seal(person11); 
console.log(Object.isSealed(person11));   //true
console.log(Object.isExtensible(person11)); //false

////Freezing object; make object a sealed one and data properties are read-only
var person12 = {name: 'Yin Tian Chou'};
Object.freeze(person12);
console.log(Object.isExtensible(person12)); //false
console.log(Object.isSealed(person12));   //true
console.log(Object.isFrozen(person12));   //true
// person12.name = 'Liu Piao Piao';  //error

/////////////////////////////////////////////////////////////////////////////////////////////////
//// Chapter 4: Constructor and Prototypes
function Person(){};
var person1 = new Person;
var person2 = new Person();
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
console.log(person1.constructor === Person); //true
//// Every object instance is automatically created with a constructor property that contains a reference to the constructor function that created it;
//// For generic objects (those created via an object literal or the Object constructor), constructor is set to Object; for objects created with a custom constructor, constructor points back to that constructor function instead.
//// new operator produces the return value

function Person1(){
	Object.defineProperty(this, 'name', {
		get: function(){
			return name;
		},
		set: function(newName){
			name = newName;
		},
		enumerable: true,
		configurable: true
	});
}

//// Prototypes: think it as a recipe for an object; 
var book = {title: 'Unknown'};
console.log('title' in book);
console.log(book.hasOwnProperty('title'));
console.log('hasOwnProperty' in book); //true
console.log(book.hasOwnProperty('hasOwnProperty')); //false
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); //true

//// a function to identify a prototype property
function hasPrototypeProperty(o, name){
	return (name in o) && !(o.hasOwnProperty(name));
}
console.log(hasPrototypeProperty(book, 'title')); //false
console.log(hasPrototypeProperty(book, 'hasOwnProperty')); //true

///// [[Prototype]]: an instance keeps track its prototype through an [[Prototype]], which is a pointer back to the prototype object that the instance is using. When a new object is created using new, the constructor's prototype property is assigned to the [[Prototype]] property of the new object.
////   person1                    |--->           Person.prototype
//// [[Prototype]]  |-------------|         sayName  : [function]
////  name:   'Yin Tian Chou'

// generic object
var obj = {};
var prototype = Object.getPrototypeOf(obj);
console.log(prototype === Object.prototype);   //true
console.log(obj.__proto__ === Object.prototype); //true; ES6
console.log(Object.prototype.isPrototypeOf(obj)); //true
// chain
console.log(obj.toString());   // [object Object]
obj.toString = function(){
	return '[object Custom]';
}
console.log(obj.toString());   // [object Custom]
delete obj.toString;
console.log(obj.toString());   // [object Object]

function Person1(name){
	this.name = name || 'Unknown';
}
// Person1.prototype = {
// 	sayName: function(){
// 		console.log('ni hao, '+this.name);
// 	},
// 	toString: function(){
// 		return '[Person + this.name]';
// 	}
// }
// var p1 = new Person1();
// console.log(p1 instanceof Person1);   //true
// console.log(p1.constructor === Person1); //false
// console.log(p1.constructor === Object);  //true
//// the above is because the constructor property exists on the prototype, not on the object instance; 
///// When a function is created, its prototype property is created with a constructor property equal to the function. This pattern completely overwrites the prototype object, which means that constructor will come from the newly created (generic) object that was assigned to Person.prototype. Thus we need restore the constructor property to a proper value when overwriting the prototype

Person1.prototype = {
	constructor: Person1,

	sayName: function(){
		console.log('ni hao, '+this.name);
	},
	toString: function(){
		return '[Person + this.name]';
	}
}
var p1 = new Person1();
console.log(p1 instanceof Person1);   //true
console.log(p1.constructor === Person1); //true
console.log(p1.constructor === Object);  //false
console.log(p1.__proto__ === Person1.prototype); //true

/////      person1
/////[[Prototype]]:  |---->   Person.prototype   <-------------------------|
/////name : 'Steve'       constructor:    |--------------->   Person       |
/////                     sayName:    [function]           prototype:  |---|
/////

var p2 = new Person1('Steve Chow');
Object.freeze(p2);
p2.sayName();
Person1.prototype.makeFilm = function(){
	console.log('Let\'s do it!');
}
p2.makeFilm();

////Build-in Object Prototypes

Array.prototype.sum = function(){
	return this.reduce(function(x, y){
		return x+y;
	});
};
console.log([1,2,3].sum());

// Another way
Function.prototype.method = function(name, func) {
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
	return this;
};

String.method('capitalize', function(){
	return this.charAt(0).toUpperCase() + this.substring(1);
})
Array.method('sum1', function(){
	return this.reduce(function(a,b){return a+b;});
})
console.log('hello, world'.capitalize());
console.log([1,2,3].sum1());

console.log([1,2,3].__proto__ === Array.prototype); //true
console.log(true.__proto__    === Boolean.prototype); //true
console.log(Array.prototype   === Function.prototype); //false


////////////////////////////////////////////////////////////////////////////////////////
///// Chapter 5: inheritance
//// prototype chaining & Object.prototype
var book = {title: 'The Principles of JS'};
console.log(Object.getPrototypeOf(book) === Object.prototype); //true
console.log(book.__proto__ === Object.prototype); //true

var num = 12;
console.log(Object.getPrototypeOf(num) === Number.prototype); //true
console.log(num.__proto__ === Number.prototype); //true

//// Methos inherited from Object.prototype: hasOwnProperty, propertyIsEnumerable, isPrototypeOf, valueOf, toString
var now = new Date();
var earlier = new Date(2010, 1, 1);
console.log( now > earlier); // when > is used, the valueOf() is called before the comparison

var empty = {};
for(var p in empty){
	if(empty.hasOwnProperty(p)){
		console.log(p);
	}
	// console.log(p);
}

////Object inheritance
var p1 = {
	name: 'nima', say: function(){console.log('Fuck ya '+this.name);}
};
var p2 = Object.create(p1, {
	name: {
		value: 'di er ge yin',
		configurable: true,
		enumerable: true,
		writable: true
	}
});
p2.say();
console.log(p1.hasOwnProperty('say'));
console.log(p2.hasOwnProperty('say')); //false
console.log(p1.isPrototypeOf(p2)); //true
console.log(p2.__proto__ === p1);  //true
console.log(p1.__proto__ === Object.prototype); //true
console.log(Object.prototype.__proto__ === null); //true

var nakedObj = Object.create(null);
console.log('toString' in nakedObj);//false
console.log(nakedObj.__proto__ === null); //false
console.log(nakedObj.__proto__ === Object.prototype); //false

//// constructor inheritance
function YourConstructor(){
	////
}
////JS engine does this for you behind the scene
YourConstructor.prototype = Object.create(Object.prototype, {
	constructor: {
		value: YourConstructor,
		enumerable: true,
		writable: true,
		configurable: true
	}
});
//// Amost every function has a prototype property that can be modified; that property is automatically assigned to a new generic object that inherits from Object.prototype and has a single own property called constructor.
//// the above code sets the constructor's prototype property to an object that inherits from Object.prototype, which means any instance of YourConstructor also inherit from Object.prototype. YourConstructor is a subtype of Object, and Object is a supertype of YourConstructor

function Rectangle(l, w){
	this.length = l; this.width = w;
}
Rectangle.prototype.getArea = function(){
	return this.length * this.width;
}
Rectangle.prototype.toString = function(){
	return '[Rectangle: '+this.length+" X "+this.width+']';
}
function Square(x){
	this.length = x; this.width = x;
}
Square.prototype = new Rectangle();
Square.prototype.constructor = Square;
Square.prototype.toString = function(){
	return '[Square: '+this.length+" X "+this.width+']';
}
var r1 = new Rectangle(5,10);
var s1 = new Square(6);
console.log(r1.getArea());
console.log(s1.getArea());
console.log(r1.toString());
console.log(s1.toString());
console.log(r1 instanceof Rectangle); //true
console.log(r1 instanceof Object); //true
console.log(s1 instanceof Square);
console.log(s1 instanceof Rectangle);

console.log(Square.prototype.__proto__ === Rectangle.prototype);   //true
/////   s1
/////__proto__ : |------->           Square.prototype   <--------------------------|
/////                             constructor:  |-----------------> Square         |
/////                           __proto__ :  |-----------|      prototype:    |----|
/////  Rectangular.prototype <---------------------------|
/////__proto__ : |-------------------------------------------------> Object.prototype
/////

function Square1(x){
	// this.length = x; this.width = x;
	Rectangle.call(this, x, x); // pseudoclassical inheritance method
}
Square1.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		value: Square1,
		writable: true,
		enumerable: true,
		configurable: true
	}
});
Square1.prototype.toString = function(){
	var res = Rectangle.prototype.toString.call(this);
	return res.replace('Rectangle', 'Square');
}
var s2 = new Square1(10);
console.log(s2.getArea());
console.log(s2.toString());
console.log(Square1.prototype.__proto__ === Rectangle.prototype); //true


////////////////////// Chapter 6: Object Patterns ///////////////////////////////////
///// Private and Privileged members
//// Module Pattern; IIFE (immediately invoked function expression); closure
var person = (function(){
	var age = 25;
	return {
		name: 'UIUC', getAge: function(){ return age; }, getOlder: function(){ age++; }
	};
}());
console.log(person.name);
console.log(person.age); //undefined
console.log(person.getAge());

//// revealing module
var person1 = (function(){
	var age = 25;
	function getAge(){
		return age;
	}
	return {
		getAge: getAge
	}
}());

////Private Members for Constructors
function Person(name){
	var age = 1;
	this.name = name || 'Unknown';
	this.getAge = function(){
		return age;
	}
}
var p1 = new Person('Sha Gua');
p1.age = 100;
console.log(p1.getAge()); // 1

// hybrid approach
var Person = (function(){
	var age = 1;
	function InnerPerson(name){
		this.name = name;
	}
	InnerPerson.prototype.getAge = function(){
		return age;
	}
	InnerPerson.prototype.getOlder = function(){
		age+=1;
	}
	return InnerPerson;
}());
var p1 = new Person('Eva');
var p2 = new Person('Lily');
console.log(p1.name);
console.log(p1.getAge());
console.log(p2.name);
console.log(p2.getAge());
p1.getOlder();
console.log(p1.getAge());  // 2
console.log(p2.getAge());  // 2

///// Mixins: add functionality to objects while avoiding inheritance
///// mixins do not allow you to identify where the capabilities came from after the object is created
function mixin(receiver, supplier){
	for( var property in supplier){
		if(supplier.hasOwnProperty(property)){
			receiver[property] = supplier[property];
		}
	}
	return receiver;
}


function EventTarget(){}
EventTarget.prototype = {
	constructor: EventTarget,
	addListener: function(type, listener){
		if(!this.hasOwnProperty('_listeners')){
			this._listeners = [];
		}
		if(typeof this._listeners[type] == 'undefined'){
			this._listeners[type] = [];
		}
		this._listeners[type].push(listener);
	},
	fire: function(event){
		if(!event.target){
			event.target = this;
		}
		if(!event.type){
			throw new Error('Event object missing "type" property!');
		}
		if(this._listeners && this._listeners[event.type] instanceof Array){
			var listeners = this._listeners[event.type];
			for(var i=0, len=listeners.length; i<len; ++i){
				listeners[i].call(this, event);
			}
		}
	},
	removeListener: function(type, listener){
		if(this._listeners && this._listeners[type] instanceof Array){
			var listeners = this._listeners[type];
			for(var i=0, len=listeners.length; i<len; ++i){
				listeners.splice(i,1);
				break;
			}
		}
	}
};
var target = new EventTarget();
target.addListener('message', function(event){
	console.log('Message is: ' + event.data);
});
target.fire({
	type: 'message',
	data: 'Hello, world!'
});

// one way
var p1 = new EventTarget();
p1.name = 'nima';
p1.sayName = function(){
	console.log(this.name);
	this.fire({type: 'namesaid', data: this.name});
}
p1.sayName();

// second way


//// scope-safe constructors
// function PPerson(name){
// 	if(this instanceof PPerson){
// 		this.name = name;
// 	} else {
// 		return new PPerson(name);
// 	}
// }
// var pp1 = new PPerson('nima');
// var pp2 =     PPerson('nimei');
// console.log(pp1 instanceof PPerson);
// console.log(pp2 instanceof PPerson);




