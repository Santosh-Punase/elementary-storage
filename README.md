# Elementary Storage

Basic storage for the application which leverages browsers local storage and session storage and provide advance feature like expiry for the data

[https://www.npmjs.com/package/elementary-storage](https://www.npmjs.com/package/elementary-storage)

[![codecov](https://codecov.io/gh/Santosh-Punase/elementary-storage/branch/main/graph/badge.svg?token=7002E8Q22Y)](https://codecov.io/gh/Santosh-Punase/elementary-storage)

# Features
✅ Persists data to local storage or session storage, as you needed.

✅ Provides declarative api to interact with browser storage

✅ Flexibility to store value for the keys with an expiry.

✅ Syncs data between components in the same or different browser tabs

  
# Install
Install with npm
```
npm i elementary-storage
```

Install with yarn
```
yarn add elementary-storage
```

# Test
```
npm run test
```

# Basic Usage
In its most basic form, elementary-storage just needs the Storage key to get the stored data. However, it's advised that you also provide a default value as a second argument in the event that they key does not yet exist in Storage or the value is expired.

To set the value in local/session storage, elementary-storage need the key and value, However, it you wish to invalidate the value after specified time, you can provide a third argument as the expiry time. Elementary-storage will return default value or undefined, if the time has passed `expireAt` value set while storing the value.

The following usage will persist the user name in a "first_name" and "last_name" key in Local Storage. It will have a default/initial value of an empty string "". This default value will only be used if there is no value already in Local Storage or value has expired.

```
import { elementaryLocalStorage, elementarySessionStorage } from 'elementary-storage'

elementaryLocalStorage.set('first_name', 'John')
elementaryLocalStorage.set('last_name', 'John', 1692013088585)

const { value } = elementaryLocalStorage.get('first_name', '')
const { value } = elementaryLocalStorage.get('full_name', '')

const { value, updatedAt } = elementarySessionStorage.get('isLoggedIn', false)

const value = elementarySessionStorage.getValue('isLoggedIn', false)

elementaryLocalStorage.clear()
elementarySessionStorage.clear()

```

# API Guide
### Local Storage
* elementaryLocalStorage.set(key, value, expireAt=null)
* elementaryLocalStorage.get(key, defaultValue=undefined)
* elementaryLocalStorage.getValue(key, defaultValue=undefined)
* elementaryLocalStorage.remove(key)
* elementaryLocalStorage.length()
* elementaryLocalStorage.key(keyIndex)
* elementaryLocalStorage.clear()

### Session Storage
* elementarySessionStorage.set(key, value, expireAt=null)
* elementarySessionStorage.get(key, defaultValue=undefined)
* elementarySessionStorage.getValue(key, defaultValue=undefined)
* elementarySessionStorage.remove(key)
* elementarySessionStorage.length()
* elementarySessionStorage.key(keyIndex)
* elementarySessionStorage.clear()


# Typescript

### Example
```
import { elementaryLocalStorage } from 'elementary-storage'

elementaryLocalStorage.set<string>('first_name', 'John')
const { value } = elementaryLocalStorage.get<string>('first_name')
const { value } = elementarySessionStorage.get<boolean>('isLoggedIn', false)

const value = elementarySessionStorage.getValue<boolean>('isLoggedIn', false)
```


# License
MIT