clear = setInterval(function () {
    document.querySelectorAll(".TjcpUd").forEach(function (e) {
        e.parentElement.click()
    });

    document.querySelectorAll(".MCZgpb").forEach(function (e) {
        e.remove()
    });
}, 30000)

document.querySelectorAll(".TjcpUd").forEach(function (e) {
    e.parentElement.click()
});

document.querySelectorAll(".MCZgpb").forEach(function (e) {
    e.remove()
});





els = Array.from(document.querySelectorAll(".TjcpUd")).filter(function (el) {
    return !el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.hasOwnProperty(0)
})
els_idx = 0;

document.querySelectorAll(".MCZgpb").forEach(function (e) {
    e.remove()
});
document.querySelectorAll(".Mp2Z0b").forEach(function (e) {
    e.remove()
});

console.log("HOOK");

clear = setInterval(function () {
    console.log(els[els_idx].parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].textContent)

    els[els_idx].parentElement.click();
    els_idx++;
    
    if(els_idx >= els.length){
        els = Array.from(document.querySelectorAll(".TjcpUd")).filter(function (el) {
            return !el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.hasOwnProperty(0)
        })
        els_idx = 0;

        document.querySelectorAll(".MCZgpb").forEach(function (e) { e.remove() });
        document.querySelectorAll(".Mp2Z0b").forEach(function (e) { e.remove() });
        document.querySelectorAll(".VfPpkd-LgbsSe")[1].click()
    }
}, 1000)
