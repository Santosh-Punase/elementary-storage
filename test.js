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

var storage = require('./index');

describe('storage', () => {
  'use strict';

  it('is exported as object', function () {
    assume(storage).is.a('object');
  });


  describe('Local Storage', () => {
    it('should be able to get default value of key', () => {
      assume(storage.getFromLocalStorage('name')).is.equal(undefined)
      assume(storage.getFromLocalStorage('name', null)).is.equal(null)
    })

    it('should be able to set and get value, without expiry date', () => {
      storage.setToLocalStorage('name', 'John')

      assume(storage.getFromLocalStorage('name')).is.equal('John')
    })

    it('should be able to set and get value, with future expiry date', () => {
      const expireAt = Date.now() + 1000 * 60 * 3 // 3 minutes
      storage.setToLocalStorage('name', 'John', expireAt)

      assume(storage.getFromLocalStorage('name')).is.equal('John')
    })

    it('should be able to set value, and get after expiry date', () => {
      const expireAt = Date.now() - 1000 * 60 // expired 1 minute ago
      
      storage.setToLocalStorage('name', 'John', expireAt)
      assume(storage.getFromLocalStorage('name')).is.equal(undefined)
    })

    it('should be able to remove key from local storage', () => {
      storage.setToLocalStorage('name', 'John')
      
      assume(storage.getFromLocalStorage('name')).is.equal('John')
      storage.removeFromLocalStorage('name')

      assume(storage.getFromLocalStorage('name')).is.equal(undefined)
    })

    it('should be able to get value of key at specified index', () => {
      storage.setToLocalStorage('name', 'John')
      
      assume(storage.localStorageKey(0)).is.equal('name')
    })

    it('should be able to clear storage', () => {
      storage.setToLocalStorage('name', 'John')
      
      assume(storage.localStorageKey(0)).is.equal('name')
      storage.clearLocalStorage()

      assume(storage.localStorageKey(0)).is.equal(null)
    })
  })

  describe('Session Storage', () => {
    it('should be able to get default value of key', () => {
      assume(storage.getFromLocalStorage('name')).is.equal(undefined)
      assume(storage.getFromLocalStorage('name', null)).is.equal(null)
    })

    it('should be able to set and get value, without expiry date', () => {
      storage.setToLocalStorage('name', 'John')

      assume(storage.getFromLocalStorage('name')).is.equal('John')
    })

    it('should be able to set and get value, with future expiry date', () => {
      const expireAt = Date.now() + 1000 * 60 * 3 // 3 minutes
      storage.setToLocalStorage('name', 'John', expireAt)

      assume(storage.getFromLocalStorage('name')).is.equal('John')
    })

    it('should be able to set value, and get after expiry date', () => {
      const expireAt = Date.now() - 1000 * 60 // expired 1 minute ago
      
      storage.setToLocalStorage('name', 'John', expireAt)
      assume(storage.getFromLocalStorage('name')).is.equal(undefined)
    })

    it('should be able to remove key from local storage', () => {
      storage.setToLocalStorage('name', 'John')
      
      assume(storage.getFromLocalStorage('name')).is.equal('John')
      storage.removeFromLocalStorage('name')

      assume(storage.getFromLocalStorage('name')).is.equal(undefined)
    })

    it('should be able to get value of key at specified index', () => {
      storage.setToLocalStorage('name', 'John')
      
      assume(storage.localStorageKey(0)).is.equal('name')
    })

    it('should be able to clear storage', () => {
      storage.setToLocalStorage('name', 'John')
      
      assume(storage.localStorageKey(0)).is.equal('name')
      storage.clearLocalStorage()

      assume(storage.localStorageKey(0)).is.equal(null)
    })
  })
})