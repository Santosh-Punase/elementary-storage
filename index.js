var storage = {
  setToStorage: function(_storage, key, value, expireAt) {
    var stringifiedValue = JSON.stringify({ value, expireAt, updatedAt: Date.now() })
    return _storage.setItem(key, stringifiedValue)
  },
  getFromStorage: function(_storage, key, defaultValue=undefined) {
    var defaultVal = {
      value: defaultValue, expireAt: null, updatedAt: null
    }
    if(_storage.getItem(key)) {
      try {
        var { value, expireAt=null, updatedAt=null } = JSON.parse(_storage.getItem(key))
        if(!expireAt || expireAt > Date.now()) {
          return { value, expireAt, updatedAt }
        }
      } catch {
        return defaultVal
      }
    }
    return defaultVal
  },

  setToLocalStorage: function(key, value, expireAt=null) {
    return this.setToStorage(localStorage, key, value, expireAt)
  },
  getFromLocalStorage: function(key, defaultValue=undefined) {
    return this.getFromStorage(localStorage, key, defaultValue)
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
  clearLocalStorage: function() {
    return localStorage.clear();
  },

  setToSessionStorage: function(key, value, expireAt=null) {
    return this.setToStorage(sessionStorage, key, value, expireAt)
  },
  getFromSessionStorage: function(key, defaultValue=undefined) {
    return this.getFromStorage(sessionStorage, key, defaultValue)
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
  clearSessionStorage: function() {
    return sessionStorage.clear();
  },
}

module.exports = storage
