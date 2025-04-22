
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });
  
  function update_storage(target_key, val){
    data = {}
    data[target_key] = val
    chrome.storage.local.set(data)
  }
  
  var inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if(input.type == 'checkbox'){
      input.addEventListener("change", (event) => {
        update_storage(event.target.id, event.target.checked)
        console.log(event);
      });
  
      chrome.storage.local.get(input.id, function(data) {
        for (let [key, value] of Object.entries(data)) {
          console.log('set ' + input.id + " = " + value)
          input.checked = value
        }
      })
  
    }
  
    if(input.type == 'number'){
      input.addEventListener("input", (event) => {
        update_storage(event.target.id, event.target.value)
        console.log(event);
      });
  
      chrome.storage.local.get(input.id, function(data) {
        for (let [key, value] of Object.entries(data)) {
          console.log('set ' + input.id + " = " + value)
          input.value = value
        }
      })
    }
  });
  