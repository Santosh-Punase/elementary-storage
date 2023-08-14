var storage = {
  setToStorage: function(_storage, key, value, expireAt) {
    var stringifiedValue = JSON.stringify({ value, expireAt })
    return _storage.setItem(key, stringifiedValue)
  },
  getFromStorage: function(_storage, key, defaultValue=undefined) {
    if(_storage.getItem(key)) {
      try {
        var { value, expireAt } = JSON.parse(_storage.getItem(key))
        if(expireAt && expireAt < Date.now()) {
          return defaultValue
        }
        return value
      } catch {
        return defaultValue
      }
    }
    return defaultValue
  },

  setToLocalStorage: function(key, value, expireAt=null) {
    return this.setToStorage(localStorage, key, value, expireAt)
  },
  getFromLocalStorage: function(key, defaultValue=undefined) {
    return this.getFromStorage(localStorage, key, defaultValue)
  },
  clearLocalStorage: function() {
    return localStorage.clear();
  },
  removeFromLocalStorage: function(key) {
    return localStorage.removeItem(key);
  },
  localStorageLength: function() {
    return localStorage.length();
  },
  localStorageKey: function(i) {
    return localStorage.key(i);
  },

  setToSessionStorage: function(key, value, expireAt=null) {
    return this.setToStorage(sessionStorage, key, value, expireAt)
  },
  getFromSessionStorage: function(key, defaultValue={}) {
    return this.getFromStorage(sessionStorage, key, defaultValue)
  },
  clearSessionStorage: function() {
    return sessionStorage.clear();
  },
  removeFromSessionStorage: function(key) {
    return sessionStorage.removeItem(key);
  },
  sessionStorageLength: function() {
    return sessionStorage.length();
  },
  sessionStorageKey: function(i) {
    return sessionStorage.key(i);
  },
}

module.exports = storage
