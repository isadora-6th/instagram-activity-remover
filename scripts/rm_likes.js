// GOTO: https://www.instagram.com/your_activity/interactions/likes

//document.querySelectorAll('[data-bloks-name="ig.components.Icon"]')[0].style.maskImage
checked_style = 'url(https://i.instagram.com/static/images/bloks/icons/generated/circle-check__filled__24-4x.png/219f67ac4c95.png)'
unchecked_style ='url(https://i.instagram.com/static/images/bloks/icons/generated/circle__outline__24-4x.png/2f71074dce25.png)'

filter_btns = [
  function(){return Array.from(document.querySelectorAll('[data-bloks-name="bk.components.TextSpan"]')).find(el => el.outerText === 'Сортировка и фильтр')},
  function(){return Array.from(document.querySelectorAll('[data-bloks-name="bk.components.TextSpan"]')).find(el => el.outerText === 'От старых к новым')},
  function(){return Array.from(document.querySelectorAll('[data-bloks-name="bk.components.TextSpan"]')).find(el => el.outerText === 'Применить')}
]

apply_remove_btns = [
  function(){return Array.from(document.querySelectorAll('[data-bloks-name="bk.components.TextSpan"]')).find(el => el.outerText === 'Не нравится')},
  function(){return Array.from(document.querySelectorAll('._ap3a')).find(el => el.outerText === 'Не нравится')}
]

pick_button_selector = function(){
  return Array.from(document.querySelectorAll('[data-bloks-name="bk.components.Text"]')).find(el => el.outerText === 'Выбрать');
}

function do_in_order(function_list){
  let function_list_idx = 0;
  
  let do_in_order_timer_id = setInterval(function () {
    if(function_list[function_list_idx]()){
      function_list_idx += 1;
    }

    if(function_list_idx == function_list.length){
      clearInterval(do_in_order_timer_id)
    }
  }, 1000)
}

function try_click(function_selector){
  element = function_selector();

  if(typeof element == 'undefined'){
    return false;
  }

  element.click();
  return true;
}

running = false;
selection_started = false;
selection_done = false;
reset_if_stuck_timer_id = 0;

function cycle_finish_ok(){
  running = false;
  selection_started = false;
  selection_done = false;
  clearTimeout(reset_if_stuck_timer_id);

  setTimeout(
    function(){
      console.log('Recycle in 2s')
      do_in_order(do_cycle_remove_list);
    }, 2000
  )

  return true;
}

function reset_if_stuck () {
  console.log("Reset_after_stuck");
  window.location.reload()
}

function start_unstuck(){
  reset_if_stuck_timer_id = setTimeout(reset_if_stuck, 60000)
  return true;
}

function start_selection(){
  if(selection_done){
    return true;
  }
  if(selection_started){
    return false;
  }
  selection_started = true;

  console.log('Start selection in 5s')

  setTimeout(function () {

    elements = document.querySelectorAll('[data-bloks-name="ig.components.Icon"]')

    to_remove = Math.min(elements.length, 50)
    console.log("Removing : " + to_remove + "  likes");

    target_id = 0
    interval_id = setInterval(function () {
      if (elements[target_id].style.maskImage == unchecked_style) {
        elements[target_id].click()
      }

      target_id += 1
      if (target_id == to_remove) {
        clearInterval(interval_id)
        selection_done = true;
      }
    }, 100)

  }, 5000)

  return false;
}

do_filter_order_list = [
  function(){return try_click(filter_btns[0])},
  function(){return try_click(filter_btns[1])},
  function(){return try_click(filter_btns[2])}
]

do_cycle_remove_list = [
  function(){return start_unstuck()},
  function(){return try_click(pick_button_selector)},
  function(){return start_selection();},
  function(){return try_click(apply_remove_btns[0])},
  function(){return try_click(apply_remove_btns[1])},
  function(){return cycle_finish_ok();}
]

do_in_order(do_filter_order_list.concat(do_cycle_remove_list));

