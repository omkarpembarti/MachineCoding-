const fruits = ['apple0', 'apple1', 'apple2', 'apple3', 'apple4', 'apple5', 'apple6', 'apple7', 'apple8', 'apple9', "mango", "banana", "chiku", "orange", "apricot", "bread", "pineapple", "watermellon", "custard", "anar", "apples"];

let input = document.getElementById("search-input");
let wrapper = document.getElementById("wrapper");


input.addEventListener('input', debounce(inputEvent, 500));


function debounce(fn, delay) {
    try {
        var timerID;
        return function () {
            var ctx = this;
            var arg = arguments;
            clearTimeout(timerID);
            timerID = setTimeout(() => { fn.apply(ctx, arg) }, delay);
        }


    }
    catch (e) { console.log }
}

function getSuggestions(event) {
    try {
        console.log()
        var inputs = event.target.value.trim().toLowerCase();
        console.log(inputs);
        if (inputs.length == 0)
            return Promise.resolve([]);
        return new Promise(resolve => {
            setTimeout(() => {

                var result = fruits.filter((fruit) => {
                    if (fruit.substring(0, inputs.length) == inputs)
                        return true;
                });
                resolve(result);
            }, 0);
        });
    }
    catch (e) {
        console.log(e);
    }
}


async function inputEvent(event) {
    var suggestions;
    await getSuggestions(event)
        .then(data => suggestions = data)
        .catch(err => console.log(err));

    if (suggestions.length) {
        var fragment = document.createDocumentFragment();

        suggestions.forEach(fruit => {
            var record = document.createElement('div');
            record.innerText = fruit;
            fragment.appendChild(record);
        });

        wrapper.innerHTML = "";
        wrapper.appendChild(fragment);

        if (wrapper.classList.contains("suggestion-box-hidden"))
            wrapper.classList.remove("suggestion-box-hidden");
        wrapper.classList.add("suggestion-box-visible");

    } else {
        wrapper.innerHTML = "";
        if (!wrapper.classList.contains("suggestion-box-hidden"))
            wrapper.classList.add("suggestion-box-hidden");
        if (wrapper.classList.contains("suggestion-box-visible"))
            wrapper.classList.remove("suggestion-box-visible");
    }
}




function handleSectionOnClick(event) {
    //console.log(event.target.innerText);
    input.value = event.target.innerText;
    if (!wrapper.classList.contains("suggestion-box-hidden"))
        wrapper.classList.add("suggestion-box-hidden");
    if (wrapper.classList.contains("suggestion-box-visible"))
        wrapper.classList.remove("suggestion-box-visible");


}