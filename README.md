# Elementary Storage

Basic storage for the application which leverages browsers local storage and session storage

[https://www.npmjs.com/package/elementary-storage](https://www.npmjs.com/package/elementary-storage)

# Features
✅ Persists data to local storage and session storage, as you wish.

✅ Provides declarative api to interact with browser storage

✅ Flexibility to store value for the keys with an expiry.

✅ Syncs data between components in the same or different browser tabs

  
# Install
Install with npm
```
npm i use-local-storage
```

Install with yarn
```
yarn add use-local-storage
```

# Test
```
npm run test
```

# Basic Usage
In its most basic form, elementary-storage just needs the Storage key you wish to use. However, it's advised that you also provide a default value as a second argument in the event that they key does not yet exist in Storage or the value is expired.

The following usage will persist the username in a "name" key in Local Storage. It will have a default/initial value of an empty string "". This default value will only be used if there is no value already in Local Storage or value has expired, moreover setting the variable username to undefined will remove it from Local Storage.

```
import storage from 'elementary-storage'

storage.setToLocalStorage('first_name', 'John')
storage.setToLocalStorage('last_name', 'John',1692013088585)

storage.getFromLocalStorage('first_name', '')
storage.getFromLocalStorage('full_name', '')

storage.getFromSessionStorage('isLoggedIn', false)

storage.clearLocalStorage()
storage.clearSessionStorage()

```

# API Guide
### Local Storage
* storage.setToLocalStorage(key, value, expireAt=null)
* storage.getFromLocalStorage(key, defaultValue=undefined)
* storage.removeFromLocalStorage(key)
* storage.localStorageLength()
* storage.localStorageKey(keyIndex)
* storage.clearLocalStorage()

### Session Storage
* storage.setToSessionStorage(key, value, expireAt=null)
* storage.getFromSessionStorage(key, defaultValue=undefined)
* storage.removeFromSessionStorage(key)
* storage.sessionStorageLength()
* storage.sessionStorageKey(keyIndex)
* storage.clearSessionStorage()

# License
MIT