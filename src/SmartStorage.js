function SmartStorage(storage) {
  this.storage = storage;
}

SmartStorage.prototype._getTimestamp = function() {
  return new Date().getTime();
};

SmartStorage.prototype.get = function(key, defaultValue = null) {
  let storedValue = this.storage.getItem(key);

  if (!storedValue) {
    return defaultValue;
  }

  try {
    let parsedValue = JSON.parse(storedValue);

    if (parsedValue) {
      if (parsedValue.expiry) {
        let currentTime = this._getTimestamp();
        if (currentTime > parsedValue.expiry) {
          this.remove(key);
          return defaultValue;
        }
      }
    }

    return parsedValue.value;
  } catch (error) {
    return storedValue;
  }
};

SmartStorage.prototype.set = function(key, value, expiryTimeInMs) {
  let expiry = expiryTimeInMs ? this._getTimestamp() + expiryTimeInMs : null;

  let itemToStore = {
    value: value,
    expiry: expiry
  };

  this.storage.setItem(key, JSON.stringify(itemToStore));
};

SmartStorage.prototype.remove = function(key) {
  this.storage.removeItem(key);
};

SmartStorage.prototype.clear = function() {
  this.storage.clear();
};


export default SmartStorage;
