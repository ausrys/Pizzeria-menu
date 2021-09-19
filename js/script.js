let pizzaOjb = {};
let toppingsList = [];
let pizzalist = document.getElementById('pizzas')
document.addEventListener('DOMContentLoaded', () => {
    // Check if there any saved sessions
    if (sessionStorage.length > 0 ) {
        // if there is, loop for every pizza and list them
        for (let i = 1; i <sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            // for every pizza create li and p, li for pizza name, p for information
            let li = document.createElement('li');
            let p = document.createElement('p');
            let parsed = JSON.parse(sessionStorage.getItem(key))
            li.appendChild(document.createTextNode(parsed.pizzaName))
            // adding img to pizzas
            for (let i = 0; i < parsed.pizzaHeat; i++) {
                let img = document.createElement('img');
                img.src = '../img/chillie.jpg';
                li.appendChild(img)
            }
            
            
            p.appendChild(document.createTextNode(`
            Price: ${parsed.pizzaPrice}
            Toppings: ${parsed.pizzaToppings}
        `)) 
            // append p to li
            li.appendChild(p)
            pizzalist.appendChild(li)
            let deleteBtn = document.createElement('button')
            // add class
            deleteBtn.className = 'delete'
            // append text node
            deleteBtn.appendChild(document.createTextNode('X'));
            // append button to the li
            li.appendChild(deleteBtn)
        }
    }
    // listening for form events, on submit function is called
    document
    .getElementById('add-pizza-form').addEventListener('submit', handleForm)
})

// delete event
pizzalist.addEventListener('click', removePizza)


// add pizza
function handleForm(e) {

    e.preventDefault(); // prevent page from reloading
    let myForm = e.target;
    let fd = new FormData(myForm);
    // add all the keys and their values to the object
    for (let key of fd.keys()) {
        pizzaOjb[key] = fd.get(key)
    }

      // checking if pizza name is unique 
    let count = 0;
    for (let i = 0; i <sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key == pizzaOjb.pizzaName)
        count++;
    }

    if (count == 0) {
        
        // checking if there are at least 2 toppings
        if(toppingsList.length >= 2) {
            // add toppingslist to pizza object 
            pizzaOjb.pizzaToppings = toppingsList;

            // add a new pizza as an object
            sessionStorage.setItem(pizzaOjb.pizzaName, JSON.stringify(pizzaOjb))
            // add to the list
            let li = document.createElement('li')
            let p = document.createElement('p');
            let parsed = JSON.parse(sessionStorage.getItem(pizzaOjb.pizzaName))
            li.appendChild(document.createTextNode(parsed.pizzaName))
            p.appendChild(document.createTextNode(`
                    Price: ${parsed.pizzaPrice}
                    Toppings: ${parsed.pizzaToppings}
                `)) 

            // adding img to pizzas

            for (let i = 0; i < parsed.pizzaHeat; i++) {
                let img = document.createElement('img');
                img.src = '../img/chillie.jpg';
                li.appendChild(img)
            }

            li.appendChild(p)
            pizzalist.appendChild(li)
            // add delete button
            let deleteBtn = document.createElement('button')
            // add class name
            deleteBtn.className = 'delete'
            // append text node
            deleteBtn.appendChild(document.createTextNode('X'));
            // append button to the li
            li.appendChild(deleteBtn)
            document.getElementById("add-pizza-form").reset();
            // clear p tag with toppings after submiting the form
            toppingsList = [];
            let ptoppings = document.getElementById('toppings-list');
            ptoppings.innerText = '';
        }
        else {
            alert('There must be atleast 2 toppings')
        }
        
    }
    else {
        alert('A pizza with that name already exists')
    }
    
}

// Remove pizza
function removePizza(e) {
    // pressing on button with class delete
    if (e.target.classList.contains('delete')) {
        // confirmation of a deletion
        if(confirm("Are You want to delete this pizza?")) {
            let li = e.target.parentElement;
            // get the name of the pizza
            let text = li.childNodes[0].textContent.trim();
            // delete pizza from session storage
            sessionStorage.removeItem(text);
            // delete pizza from the list in the DOM
            pizzalist.removeChild(li);
        }
    }
}

// Sorting
// Sorting by name
function sortListByName() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("pizzas");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }


//   Add toppings 
function addToppings() {
    // push toppings to the toppings list
    let toppings = document.querySelector('#toppings').value;
    toppingsList.push(toppings);
    // add toppings to p tag after every button press
    let p = document.getElementById('toppings-list');
    p.innerText = toppingsList;
    // clear toppings input
    document.querySelector('#toppings').value = '';
}

 