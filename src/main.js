function readFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    fileLoaded(event.target.result);
  }

  reader.readAsText(file);
}

function handleFileSelect(event) {
  const files = event.target.files;
  readFile(files[0]);
}

function fileLoaded(fileContent) {
  app.reducedKeys = getKeys(JSON.parse(fileContent));
}


window.onload = function(){
  document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
};

function saveModel(el) {
  const newTranslationData = createObjectFromFlatKeys(app.reducedKeys)
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newTranslationData));

  el.setAttribute("href", "data:"+data);
  el.setAttribute("download", "data.json");    
  console.log(JSON.stringify());
}

function createObjectFromFlatKeys(flatKeys) {
  const result = {};
  for (let i = 0; i < flatKeys.length; i++) {
    const splitKeys = flatKeys[i].key.split('.');
    let currentObject = result;
    for (let j = 0; j < splitKeys.length - 1; j++) {
      const key = splitKeys[j];
      currentObject[key] = currentObject[key] || {};
      currentObject = currentObject[key];
    }
    currentObject[splitKeys[splitKeys.length -1]] = flatKeys[i].value;
  }
  return result;
}

function onFileDrop(ev) {
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        const file = ev.dataTransfer.items[i].getAsFile();
        readFile(file);
      }
    }
  }
}

function dragOverHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}


var app = new Vue({
  el: '#app',
  data: {
    reducedKeys: []
  }
});

if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
};

function getKeys(parentModel, prefix ='') {
  if (typeof parentModel === 'string') {
    console.log('This is a string');
    return [ createTranslationValue(prefix, parentModel)];
  } else if (Array.isArray(parentModel)) {
    console.log('This is an array');
    return [createTranslationValue(prefix, parentModel)];
  } else if (typeof parentModel === 'object') {
    console.log('This is an object');
    const keys = Object.keys(parentModel);
    const values = [];
    for (let i = 0; i < keys.length; i++) {
      console.log(`${keys[i]}`);
      values.push(...getKeys(parentModel[keys[i]], `${prefix ? prefix + '.' : ''}${keys[i]}`));
    }
    return values;
  }
}

function createTranslationValue(fullKey, value) {
  const result = {
    key: fullKey,
    value: value,
    originalValue: value,
  };

  if (Array.isArray(value)) {
    result.originalValue = [...value];
  }
  return result;
}

