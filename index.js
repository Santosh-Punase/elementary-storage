const storage = require('./storage')

const elementaryLocalStorage = {
  set: function(key, value, expireAt) {
    return storage.setToStorage(localStorage, key, value, expireAt)
  },
  get: function(key, defaultValue) {
    return storage.getFromStorage(localStorage, key, defaultValue)
  },
  remove: function(key) {
    return localStorage.removeItem(key);
  },
  length: function() {
    return localStorage.length;
  },
  key: function(i) {
    return localStorage.key(i);
  },
  clear: function() {
    return localStorage.clear();
  },
}

const elementarySessionStorage = {
  set: function(key, value, expireAt) {
    return storage.setToStorage(sessionStorage, key, value, expireAt)
  },
  get: function(key, defaultValue) {
    return storage.getFromStorage(sessionStorage, key, defaultValue)
  },
  remove: function(key) {
    return sessionStorage.removeItem(key);
  },
  length: function() {
    return sessionStorage.length;
  },
  key: function(i) {
    return sessionStorage.key(i);
  },
  clear: function() {
    return sessionStorage.clear();
  },
}

module.exports = { elementaryLocalStorage, elementarySessionStorage }
