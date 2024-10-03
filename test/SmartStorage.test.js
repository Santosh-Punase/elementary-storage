import assume from "assume";
import sinon from "sinon";

import SmartStorage from "../src/SmartStorage.js";

describe('SmartStorage', function() {
  let storageMock;
  let smartStorage;

  beforeEach(function() {
    storageMock = {
      getItem: sinon.stub(),
      setItem: sinon.stub(),
      removeItem: sinon.stub(),
      clear: sinon.stub()
    };
    smartStorage = new SmartStorage(storageMock);
  });

  it('should get default value if key does not exist', function() {
    storageMock.getItem.withArgs('nonExistingKey').returns(null);
    
    const result = smartStorage.get('nonExistingKey', 'defaultValue');
    
    assume(result).equals('defaultValue');
  });

  it('should get stored value if exists and no expiry provided', function() {
    storageMock.getItem.withArgs('existingKey').returns(JSON.stringify({ value: 'storedValue' }));
    
    const result = smartStorage.get('existingKey', 'defaultValue');
    
    assume(result).equals('storedValue');
  });

  it('should set value correctly, if expiry not provided', function() {
    smartStorage.set('testKey', 'testValue');
    
    assume(storageMock.setItem.calledWith('testKey', JSON.stringify({ value: 'testValue', expiry: null }))).true();
  });

  describe('expiry tests', function(){
    let clock;
    beforeEach(function() {
      // Mock the date to a specific timestamp (e.g., January 1, 2024, at 12:00:00)
      clock = sinon.useFakeTimers(new Date(2024, 0, 31, 12, 0, 0).getTime());
    });
  
    afterEach(function() {
      clock.restore();
    });

    
    it('should get stored value if exists and not expired', function() {
      storageMock.getItem.withArgs('existingKey').returns(JSON.stringify({ value: 'storedValue', expiry: new Date(2024, 1, 1, 12, 0, 0).getTime() }));
      
      const result = smartStorage.get('existingKey', 'defaultValue');
      
      assume(result).equals('storedValue');
    });

    it('should get default value post expiry', function() {
      storageMock.getItem.withArgs('existingKey').returns(JSON.stringify({ value: 'storedValue', expiry: new Date(2024, 0, 30, 12, 0, 0).getTime() }));
      
      const result = smartStorage.get('nonExistingKey', 'defaultValue');
      
      assume(result).equals('defaultValue');
    });

    it('should store value correctly, if expiry provided', function() {
      let expiryInMs = 1000 * 60 * 60 * 24;
      
      smartStorage.set('testKey', 'testValue', expiryInMs);
      
      assume(storageMock.setItem.calledWith('testKey', JSON.stringify({ value: 'testValue', expiry: new Date(2024, 0, 31, 12, 0, 0).getTime() + expiryInMs }))).true();
    });
  })

  it('should remove an item', function() {
    storageMock.removeItem('existingKey');
    
    smartStorage.remove('existingKey');
    
    assume(storageMock.removeItem.calledWith('existingKey'));
  });

  it('should clear the storage', function() {
    storageMock.clear();
    
    smartStorage.clear();
    
    assume(storageMock.clear.calledWith());
  });
});
