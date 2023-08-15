var assume = require('assume')

// Storage Mock
function storageMock() {
  let storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: function() {
      storage = {};
    },
  };
}

// mock the localStorage
localStorage = storageMock();
// mock the sessionStorage
sessionStorage = storageMock();

var { elementaryLocalStorage, elementarySessionStorage } = require('./index');

describe('Local Storage', () => {
  'use strict';

  it('is exported as object', function () {
    assume(elementaryLocalStorage).is.a('object');
  });

  it('should be able to get default value of key', () => {
    assume(elementaryLocalStorage.get('name').value).is.equal(undefined)
    assume(elementaryLocalStorage.get('name', null).value).is.equal(null)
  })

  it('should be able to set and get value of object type, without expiry date', () => {
    elementaryLocalStorage.set('name', { firstname: 'John', lastname: 'Doe' })

    assume(elementaryLocalStorage.get('name').value).is.deep.equal({ firstname: 'John', lastname: 'Doe' })
  })

  it('should be able to set and get value, without expiry date', () => {
    elementaryLocalStorage.set('name', 'John')

    assume(elementaryLocalStorage.get('name').value).is.equal('John')
  })

  it('should be able to set and get value, with future expiry date', () => {
    const expireAt = Date.now() + 1000 * 60 * 3 // 3 minutes
    elementaryLocalStorage.set('name', 'John', expireAt)

    assume(elementaryLocalStorage.get('name').value).is.equal('John')
  })

  it('should be able to set value, and get after expiry date', () => {
    const expireAt = Date.now() - 1000 * 60 // expired 1 minute ago
    
    elementaryLocalStorage.set('name', 'John', expireAt)
    assume(elementaryLocalStorage.get('name').value).is.equal(undefined)
  })

  it('should be able to remove key from local storage', () => {
    elementaryLocalStorage.set('name', 'John')
    
    assume(elementaryLocalStorage.get('name').value).is.equal('John')
    elementaryLocalStorage.remove('name')

    assume(elementaryLocalStorage.get('name').value).is.equal(undefined)
  })

  it('should be able to get value of key at specified index', () => {
    elementaryLocalStorage.set('name', 'John')
    
    assume(elementaryLocalStorage.key(0)).is.equal('name')
  })

  it('should be able to clear storage', () => {
    elementaryLocalStorage.set('name', 'John')
    
    assume(elementaryLocalStorage.key(0)).is.equal('name')
    elementaryLocalStorage.clear()

    assume(elementaryLocalStorage.key(0)).is.equal(null)
  })
})

describe('Session Storage', () => {
  'use strict';

  it('is exported as object', function () {
    assume(elementarySessionStorage).is.a('object');
  });

  it('should be able to get default value of key', () => {
    assume(elementarySessionStorage.get('name').value).is.equal(undefined)
    assume(elementarySessionStorage.get('name', null).value).is.equal(null)
  })

  it('should be able to set and get value, without expiry date', () => {
    elementarySessionStorage.set('name', 'John')

    assume(elementarySessionStorage.get('name').value).is.equal('John')
  })

  it('should be able to set and get value, with future expiry date', () => {
    const expireAt = Date.now() + 1000 * 60 * 3 // 3 minutes
    elementarySessionStorage.set('name', 'John', expireAt)

    assume(elementarySessionStorage.get('name').value).is.equal('John')
  })

  it('should be able to set value, and get after expiry date', () => {
    const expireAt = Date.now() - 1000 * 60 // expired 1 minute ago
    
    elementarySessionStorage.set('name', 'John', expireAt)
    assume(elementarySessionStorage.get('name').value).is.equal(undefined)
  })

  it('should be able to remove key from local storage', () => {
    elementarySessionStorage.set('name', 'John')
    
    assume(elementarySessionStorage.get('name').value).is.equal('John')
    elementarySessionStorage.remove('name')

    assume(elementarySessionStorage.get('name').value).is.equal(undefined)
  })

  it('should be able to get value of key at specified index', () => {
    elementarySessionStorage.set('name', 'John')
    
    assume(elementarySessionStorage.key(0)).is.equal('name')
  })

  it('should be able to clear storage', () => {
    elementarySessionStorage.set('name', 'John')
    
    assume(elementarySessionStorage.key(0)).is.equal('name')
    elementarySessionStorage.clear()

    assume(elementarySessionStorage.key(0)).is.equal(null)
  })
})
