/* eslint-disable */
import * as R from 'ramda';

const RamdaUtils = {
  // R,

  //// Logic ////

  /**
   * 如果第二个参数不是 null、undefined 或 NaN，则返回第二个参数，否则返回第一个参数（默认值）
   * defaultTo :: a → b → a | b
   * @param {*} any1
   * @param {*} any2
   * @returns {*} any1|any2
   * R.defaultTo(42,25); //=>42
   */
  defaultTo(any1, any2) {
    return R.defaultTo(any1, any2);
  },
  
  /**
   * 深复制 其值可能（嵌套）包含 Array、Object、Number、String、Boolean、Date 类型的数据。Function 通过引用复制
   * {*} → {*}
   * @param {*} obj
   * @returns {*} 
   */
  clone(obj){
    return R.clone(obj);
  },

  /**
   * 如果传入的参数相等，返回 true；否则返回 false。可以处理几乎所有 JavaScript 支持的数据结构
   * {*} → {*}
   * @param {*} any1
   * @param {*} any2
   * @returns {Boolean}
   * R.equals(1, '1'); //=> false
   * R.equals([1, 2, 3], [1, 2, 3]); //=> true
   */
  equals(any1,any2){
    return R.equals(any1,any2);
  },

  //// [] ////
  
  /**
   * 只要列表中有一个元素等于指定值，则返回 true；否则返回 false
   * contains :: a → [a] → Boolean
   * R.equals 函数进行相等性判断
   * @param {Number|Array|Object} val
   * @param {Array|Object} listOrStr
   * @returns {Boolean}
   * R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
   * R.contains([42], [[42]]); //=> true
   */
  contains(val, listOrStr) {
    return R.contains(val, listOrStr);
  },

  /**
   * 返回列表或字符串的第 n 个元素。如果 n 为负数，则返回索引为 length + n 的元素。
   * nth :: Number → [a] → a | Undefined  (head 0 /last -1)
   * @param {Number} index
   * @param {Array|String} listOrStr
   * @returns {Number|String|undefined}
   * R.nth(1, ['foo', 'bar', 'baz', 'quux']); //=> 'bar' 
   * R.nth(2, 'abc'); //=> 'c'
   */
  nth(index, listOrStr) {
    return R.nth(index, listOrStr);
  },
  
  /**
   * 取出给定的列表或字符串（或带有 slice 方法的对象）中，从 fromIndex（包括）到 toIndex（不包括）的元素。
   * 如果第三个参数自身存在 slice 方法，则调用自身的 slice 方法。
   * slice :: Number → Number → [a] → [a] 
   * (init返回 list 或 string 删除最后一个元素后的部分 / tail删除列表中的首个元素 / take返回列表的前 n 个元素、字符串的前n个字符 / takeLast)
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @param {Array|String} listOrStr
   * @returns {Array|String}
   * R.slice(-3, -1, ['a', 'b', 'c', 'd']); //=> ['b', 'c']
   * R.slice(0, 3, 'ramda'); //=> 'ram'
   */
  slice(fromIndex, toIndex, listOrStr) {
    return R.slice(fromIndex, toIndex, listOrStr);
  },

  /**
   * 求差集。求第一个列表中，未包含在第二个列表中的任一元素的集合。对象和数组比较数值相等，而非引用相等。
   * difference {a∣a∈xs ∩ a∉ys} :: [a] → [a] → [a]
   * @param {Array} listA
   * @param {Array} listB
   * @returns {Array}
   * R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
   * R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
   */
  difference(listA, listB) {
    return R.difference(listA, listB);
  },

  /**
   * 将元素插入到 list 指定索引处。注意，该函数是非破坏性的：返回处理后列表的拷贝。
   * insert :: Number → a → [a] → [a] (append / prepend)
   * @param {Number} insertIndex
   * @param {String} val
   * @param {Array} list
   * @returns {Array}
   * R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
   */
  insert(insertIndex, val, list) {
    return R.insert(insertIndex, val, list);
  },

  /**
   * 替换数组中指定索引处的值
   * update :: Number → a → [a] → [a]
   * @param {Number} index
   * @param {String|*} val
   * @param {Array} list
   * @returns {Array} 
   * R.update(1, '_', ['a', 'b', 'c']); //=> ['a', '_', 'c']
   */
  update(index, val, list) {
    return R.update(index, val, list);
  },
  
  /**
   * 将数组中指定索引处的值替换为经函数变换的值
   * adjust :: (a → a) → Number → [a] → [a]
   * @param {Number} index Number
   * @param {Function} fn 
   * @param {Array} list 
   * @returns {Array} 
   * R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']); //=> ['a', 'B', 'c', 'd']
   */
  adjust(index, fn, list) {
    return R.adjust(fn, index, list);
  },

  /**
   * 删除列表中从 start 开始的 count 个元素。注意，该操作是非破坏性的：不改变原列表，返回处理后列表的拷贝
   * remove :: Number → Number → [a] → [a] (drop删除给定个数 list，string / dropLast)
   * @param {Number} fromIndex 
   * @param {Number} number 
   * @param {Array} list
   * @returns {Array}
   * R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
   */
  remove(fromIndex, number, list) {
    return R.remove(fromIndex, number, list);
  },
  
  /**
   * 求第二个列表中，未包含在第一个列表中的任一元素的集合。通过 R.equals 函数进行相等性判断
   * without {a∣a∉xs ∩ a∈ys} :: [a] → [a] → [a]
   * @param {*} listA Array
   * @param {*} listB Array
   * @returns {Array}
   * R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
   */
  without(listA, listB) {
    return R.without(listA, listB);
  },

  /**
   * 对数组中所有元素求和
   * sum :: [Number] → Number
   * @param {Array} list 
   * @returns {Number}
   * R.sum([2,4,6,8,100,1]); //=> 121
   */
  sum(list) {
    return R.sum(list);
  },

  /**
   * 列表对象的指定字段求和
   * sum :: [Number] → Number
   * @param {String} filed 
   * @param {Array} objArray Object[]
   * @returns {Number}
   * R.sumObj('price',[{name:'a',price:10},{name:'b',price:20}]); //=> 30
   */
  sumObjArray(filed, objArray) {
    return R.compose(
      R.sum,
      R.pluck(filed)
    )(obj);
  },
  
  /**
   * 从列表内的每个对象元素中取出特定名称的属性，组成一个新的列表
   * pluck :: Functor f => k → f {k: v} → f v
   * @param {String|Number} filed 
   * @param {Array|Object} list 
   * @returns {Array|Object}
   * R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
   * R.pluck(0, [[1, 2], [3, 4]]);
   */
  pluck(filed, listOrObj) {
    return R.pluck(filed)(listOrObj);
  },
  
  /**
   * 列表过滤：过滤出符合条件的元素
   * filter :: Filterable f => (a → Boolean) → f a → f a
   * @param {Function} fn 
   * @param {Array|Object} listOrObj
   * @returns {Array|Object}
   * const isEven = n => n % 2 === 0;
   * R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
   * R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
   */
  filter(fn, listOrObj) {
    return R.filter(fn, listOrObj);
  },

  /**
   * 查找并返回 list 中首个满足 predicate 的元素的索引；如果未找到满足条件的元素，则返回 -1 
   * findIndex :: (a → Boolean) → [a] → Number
   * @param {String} field
   * @param {String|Number} val
   * @param {Array} list 
   * @returns {Number}
   * R.findIndex(R.propEq('a', 2))([{a: 1}, {a: 2}, {a: 3}]); //=> 1
   * R.findIndex(R.propEq('a', 4))([{a: 1}, {a: 2}, {a: 3}]); //=> -1
   */
  findIndex(field, val, list) {
    return R.findIndex(R.propEq(field, val))(list);
  },
  
  /**
   * 连接列表或字符串
   * concat :: [a] → [a] → [a]
   * @param {Array|String} listA 
   * @param {Array|String} listB 
   * @returns {Array|String}
   * R.concat('ABC', 'DEF'); // 'ABCDEF'
   * R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
   */
  concat(listA, listB) {
    return R.concat(listA, listB);
  },

  /**
   * 获取 list 的所有元素（包含所有子数组中的元素），然后由这些元素组成一个新的数组。深度优先
   * flatten :: [a] → [b]
   * @param {Array} list
   * @returns {Array}
   * R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
   */
  flatten(list) {
    return R.flatten(list);
  },

  //// [{}] ////
  // getFullObjByField :: k -> [a] -> [a] -> {k:v}
  getFullObjByField(findField, partArr, fullArr) {
    return R.filter(R.where({ [findField]: R.contains(R.__, partArr) }))(fullArr); // tslint:disable-line
  },
  // getAnotherField :: k -> [a] -> [a] -> {k:v} -> v
  getAnotherField(anotherField, findField, partArr, fullArr) {
    return this.pluck(anotherField, this.getFullObjByField(findField, partArr, fullArr));
  },
  // getArrObjByFieldValue :: (k->v->[{k:v}]) -> {k:v}
  getArrObjByFieldValue(field, filedValue, list) {
    return this.filter(R.propEq(field, filedValue), list)[0];
  },
  // getArrObjFieldByFieldValue :: k1-> (k->v->[{k:v}]) -> {k1:any1} -> any1
  getArrObjFieldByFieldValue(getField, findField, findFieldValue, list) {
    return R.prop(getField, this.getArrObjByFieldValue(findField, findFieldValue, list));
  },
  // flattenObjArrOne :: level 1
  flattenObjArrOne(filedA, list) {
    return R.compose(
      R.flatten,
      R.pluck(filedA)
    )(list);
  },
  // flattenObjArrTwo :: level 2
  flattenObjArrTwo(filedA, filedB, list) {
    return R.compose(
      R.pluck(filedB),
      R.flatten,
      R.pluck(filedA)
    )(list);
  },
  // flattenObjArrThree :: level 3
  flattenObjArrThree(filedA, filedB, fieldC, list) {
    return R.compose(
      R.pluck(fieldC),
      R.flatten,
      R.pluck(filedB),
      R.flatten,
      R.pluck(filedA)
    )(list);
  },
  // flattenObjArrSum :: level 2
  flattenObjArrSum(filedA, filedB, list) {
    return R.compose(
      R.sum,
      R.pluck(filedB),
      R.flatten,
      R.pluck(filedA)
    )(list);
  },

  //// {} ////

  /**
   * 如果对象自身含有指定的属性，则返回 true；否则返回 false
   * has :: s → {s: x} → Boolean
   * @param {String} field
   * @param {Object} obj
   * @returns {Boolean}
   * R.has('name',{name: 'alice'}); //=>true
   */
  has(field, obj) {
    return R.has(field)(obj);
  },
  
  /**
   * 返回给定对象所有可枚举的、自身属性的属性名组成的列表。注意，不同 JS 运行环境输出数组的顺序可能不一致。
   * keys :: {k: v} → [k]
   * @param {Object} obj
   * @returns {*}
   * R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
   */
  keys(obj) {
    return R.keys(obj);
  },

  /**
   * 返回对象所有自身可枚举的属性的值。注意：不同 JS 运行环境输出数组的顺序可能不一致
   * values :: {k: v} → [v]
   * @param {Object} obj
   * @returns {*}
   * R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
   */
  values(obj) {
    return R.values(obj);
  },

  /**
   * 取出对象中指定属性的值。如果不存在，则返回 undefined
   * prop :: s → {s: a} → a | Undefined
   * @param {String} key
   * @param {Object} obj
   * @returns {*}
   * R.prop('x', {x: 100}); //=> 100
   */
  prop(key, obj) {
    return R.prop(key);
  },

  /**
   * 对于给定的非空对象，如果指定属性存在，则返回该属性值；否则返回给定的默认值
   * propOr :: a → String → Object → a
   * @param {String} defaultVal
   * @param {Array|String} fieldsArr
   * @param {Object} obj
   * @returns {String}
   * R.propOr('Ramda', 'favoriteLibrary', { name: 'ALICE', age: 101 }); //=> 'Ramda'
   */
  propOr(defaultVal, fieldsArr, obj) {
    return R.propOr(defaultVal, fieldsArr, obj);
  },
  
  /**
   * 取出给定路径上的值
   * [Idx] → {a} → a | Undefined
   * Idx = String | Int
   * @param {Array} fieldsLevelArr
   * @param {Object} obj
   * @returns {String|Number}
   * R.path(['a', 'b'], {a: {b: 2}}); //=> 2
   */
  path(fieldsLevelArr, obj) {
    return R.path(fieldsLevelArr, obj);
  },

  /**
   * 如果非空对象在给定路径上存在值，则将该值返回；否则返回给定的默认值
   * a → [Idx] → {a} → a
   * Idx = String | Int
   * @param {String} defaultVal
   * @param {Array} fieldsLevelArr
   * @param {Object} obj
   * @returns {String|Number}
   * R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
   */
  pathOr(defaultVal, fieldsLevelArr, obj) {
    return R.path(defaultVal, fieldsLevelArr, obj);
  },

  /**
   * 返回对象的部分拷贝，其中仅包含指定键对应的属性。如果某个键不存在，则忽略该属性
   * pick :: [k] → {k: v} → {k: v}
   * @param {Array} fieldsArr 
   * @param {Object} obj 
   * @returns {Object}
   * R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
   * R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
   */
  pick(fieldsArr, obj) {
    return R.pick(fieldsArr, obj);
  },

  /**
   * 浅复制对象，然后设置或覆盖对象的指定属性(包含Portotype属性)
   * assoc :: String → a → {k: v} → {k: v}
   * @param {String} field
   * @param {String|Number} val
   * @param {Object} obj
   * @returns {Object}
   * R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
   */
  assoc(field, val, obj) {
    return R.assoc(field, val, obj);
  },
  
  /**
   * 浅复制对象，设置或覆盖即将创建的给定路径所需的节点，并将特定值放在该路径的末端(包含Portotype属性)
   * [Idx] → a → {a} → {a}
   * Idx = String | Int
   * @param {Array} fieldsLevelArr
   * @param {*} val String|Number
   * @param {Object} obj
   * @returns {Object}
   * R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
   * R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
   */
  assocPath(fieldsLevelArr, val, obj) {
    return R.assocPath(fieldsLevelArr, val, obj);
  },

  /**
   * 删除对象中指定 prop 属性
   * String → {k: v} → {k: v}
   * @param {String} field
   * @param {Object} obj
   * @returns {Object}
   * R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
   */
  dissoc(field, obj) {
    return R.dissoc(field, obj);
  },
  
  /**
   * 浅复制对象，删除返回对象中指定路径上的属性(也会将 prototype 属性复制到新对象上并展开)
   * [Idx] → {k: v} → {k: v}
   * Idx = String | Int
   * @param {Array} field String[]
   * @param {Object} obj
   * @returns {Object}
   * R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
   */
  dissocPath(fieldsLevelArr, obj) {
    return R.dissocPath(fieldsLevelArr, obj);
  },
  
  /**
   * 删除对象中给定的 keys 对应的属性
   * omit :: [String] → {String: *} → {String: *}
   * @param {Array} fieldsArr String[]
   * @param {Object} obj
   * @returns {Object}
   * R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
   */
  omit(fieldsArr, obj) {
    return R.omit(fieldsArr, obj);
  },

  /**
   * 递归地对 object 的属性进行变换，变换方式由 transformation 函数定义。所有非原始类型属性都通过引用来复制。
   * 如果某个 transformation 函数对应的键在被变换的 object 中不存在，那么该方法将不会执行。
   * evolve :: {k: (v → v)} → {k: v} → {k: v}
   * @param {*} fnOrKV 
   * @param {Object} obj 
   * @returns {Object}
   * const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
   * const transformations = {
   *  firstName: R.trim,
   *  lastName: R.trim,
   *  data: {elapsed: R.add(1), remaining: R.add(-1)}
   * };
   * R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
   */
  evolve(fnOrKV, obj) {
    return R.evolve(fnOrKV, obj);
  },

  /**
   * 合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在，使用后一个对象对应的属性值。
   * merge :: {k: v} → {k: v} → {k: v}
   * mergeRight, mergeDeepRight, mergeWith, mergeWithKey.
   * @param {Object} objA
   * @param {Object} objB
   * @returns {Object}
   * R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });//=> { 'name': 'fred', 'age': 40 }
   */
  merge(objA, objB) {
    return R.merge(objA, objB);
  },

};

export default RamdaUtils;
