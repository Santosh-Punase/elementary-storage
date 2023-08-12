var storage = {
  setToStorage: function(storage, key, value, expireAt) {
    storage[key] = JSON.stringify({ value, expireAt })
    return storage[key]
  },
  getFromStorage: function(storage, key, defaultValue=undefined) {
    if(storage.hasOwnProperty(key)) {
      try {
        var { value, expireAt } = JSON.parse(storage[key])
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
}

module.exports = storage
