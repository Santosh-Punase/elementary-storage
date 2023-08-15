const storage = {
  setToStorage: function(_storage, key, value, expireAt = null) {
    const stringifiedValue = JSON.stringify({ value, expireAt, updatedAt: Date.now() })
    return _storage.setItem(key, stringifiedValue)
  },
  getFromStorage: function(_storage, key, defaultValue = undefined) {
    const defaultVal = {
      value: defaultValue, expireAt: null, updatedAt: null
    }
    if(_storage.getItem(key)) {
      try {
        const { value, expireAt=null, updatedAt=null } = JSON.parse(_storage.getItem(key))
        if(!expireAt || expireAt > Date.now()) {
          return { value, expireAt, updatedAt }
        }
      } catch {
        return defaultVal
      }
    }
    return defaultVal
  },
}

module.exports = storage
