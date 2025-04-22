var configuration = {}
configuration.auto_remove_comments = false;
configuration.auto_remove_likes = false;

function detect_load () {
    pick_button = Array.from(document.querySelectorAll('[data-bloks-name="bk.components.Text"]')).find(el => el.outerText === 'Выбрать')
  
    if (typeof pick_button == 'undefined') {
      return false
    }
    return true
}

function configure_storage() {
    item_list = [
      'configuration.auto_remove_comments',
      'configuration.auto_remove_likes'
    ]

    item_list.forEach(function(e){
        chrome.storage.local.get(e, function(data) {
            console.log(Object.entries(data))
            console.log(data)
            for (let [key, value] of Object.entries(data)) {
                eval(key + "=" + value)
                console.log(key + " = " + value)
            }
        });
    })

    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
          );
          eval(key + "=" + newValue)
        }
    });
}

function inject_script(to_inject){
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('scripts/' + to_inject);
  (document.head || document.documentElement).appendChild(s);

  console.log("Injected "+ to_inject);
}


let loaded_observer = setInterval(function(){
  if(!detect_load()){
      return;
  }

  clearInterval(loaded_observer)

  if(configuration.auto_remove_comments){
    if(document.URL == 'https://www.instagram.com/your_activity/interactions/comments'){
      inject_script("rm_comments.js")
    }
  }

  if(configuration.auto_remove_likes){
    if(document.URL == 'https://www.instagram.com/your_activity/interactions/likes'){
      inject_script("rm_likes.js")
    }
  }


}, 500)

configure_storage();

