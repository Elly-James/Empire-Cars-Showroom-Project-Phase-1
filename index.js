


//TASK ONE: FETCHING DATA FROM JSON AND NINJA API AND DISPLAYING IT


/*
* An async function is a JavaScript function that allows you to write asynchronous code in a cleaner and more readable way using await.
* Inside an async function, you can use the await keyword to pause execution until a promise resolves, rather than using callbacks or .then().
* A try block is used to handle errors in JavaScript. It allows you to "try" a block of code and handle 
   any exceptions or errors that occur within that block.
* The continue statement skips the current iteration of a loop and moves to the next iteration.
* In this case, if fetching car data for a specific model fails (i.e., response.ok is false), 
  the program logs a warning and skips to the next model, instead of stopping the entire loop.
* The await keyword is used to pause the execution of the async function until the promise returned by the fetch resolves.

*/

async function fetchCarData() {
    try {
        // Defining  car models to fetch from the API

        const carModels = ['corolla', 'camry', 'civic', 'accord', 'mustang', 'altima', 'model3', 'rav4'];
        const carDetails = {};          // Object to store fetched car details globally

        // Fetching details for each car model from the API
        // code snippet to get the data from the API

        const apiKey = '046849ca15mshf854ffc4ea606eap1f4b4ajsn3227a7cd7fbd';
        for (const model of carModels) {
            const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
                },
            };

            const response = await fetch(url, options);
            if (!response.ok) {                                               // If response is not okay we get a warning message on console
                console.warn(`Failed to fetch details for model: ${model}`);
                continue;
            }
            const result = await response.json();                          //Turns the resultant response into a json data
            carDetails[model] = result[0] || null;                          // Store the first result or null in our object initialized globally
        }

        // Fetching local car data from the json file

        const localResponse = await fetch('http://localhost:3000/cars');    // fetches the data from the local json file
        if (!localResponse.ok) {
            throw new Error(`Failed to fetch local car data. Status: ${localResponse.status}`);  // throws an error if encountered
        }
        const localCars = await localResponse.json();                              // turns the data into a json file

        if (!Array.isArray(localCars)) {                  /*This is a method provided by JavaScript to check if the variable localCars is an array. 
                                                          It returns true if localCars is an array, and false otherwise.
                                                          The NOT ! operator negates the result. So, checks if localCars is not an array.
                                                          used to ensure that localCars is an array before performing array-specific operations (like forEach, map  */
            throw new Error("Invalid local car data: 'cars' is not an array.");
        }

        // Assign API details to your local cars
        const carsWithDetails = localCars.map((car, index) => {  /*.map() method creates a new array by applying a function to each element of the
                                                                   original array (localCars in this case).
                                                                   The % (modulus) operator calculates the remainder of the division of index by carModels.length.
                                                                   */

            const modelKey = carModels[index % carModels.length];        // Cycles through car models  e.g 3%5 = element in index 3
            return { ...car, ...carDetails[modelKey] };     /* uses the spread operator (...) to merge properties from two objects (car and 
                                                               carDetails[modelKey]) into a new object, which is then returned.*/

        });

        return carsWithDetails;
    } catch (error) {
        console.error("Error fetching car data:", error);    // incase of an error it is catched and printed to console
        return [];
    }
}

function displayCars(cars) {
  const carContainer = document.querySelector('.car_container');   // gets the element from the DOM
  carContainer.innerHTML = '';                                    // Clear existing content

  cars.forEach((car) => {
      const carCard = document.createElement('div');
      carCard.classList.add('car-card');
      carCard.dataset.carId = car.id;                         // Adds data-car-id to the car card


      // creating the elements to hold the car image and it details together with action buttons like delete

      carCard.innerHTML = `
      <div class="car-image-container">
        <img src="${car.url}" alt="${car.name}">
      </div>
      <h2>${car.name}</h2>
      <p>Price: ${car.price}</p>
      <div class="button-container">
        <button class="more-info">More Info</button>
        <button class="delete-button" data-car-id="${car.id}">Delete</button>
        <button class="edit-button">Edit</button>
      </div>
      <div class="car-details" style="display: none;">
        <p><strong>Make:</strong> ${car.make || 'N/A'}</p>
        <p><strong>Model:</strong> ${car.model || 'N/A'}</p>
        <p><strong>Class:</strong> ${car.class || 'N/A'}</p>
        <p><strong>Combination MPG:</strong> ${car.combination_mpg || 'N/A'}</p>
        <p><strong>Cylinders:</strong> ${car.cylinders || 'N/A'}</p>
        <p><strong>Displacement:</strong> ${car.displacement || 'N/A'} L</p>
        <p><strong>Drive:</strong> ${car.drive || 'N/A'}</p>
        <p><strong>Fuel Type:</strong> ${car.fuel_type || 'N/A'}</p>
        <p><strong>Highway MPG:</strong> ${car.highway_mpg || 'N/A'}</p>
        <p><strong>Transmission:</strong> ${car.transmission || 'N/A'}</p>
        <button class="availability-button">Check Availability</button>
        <button class="pick-vehicle-button">Pick Vehicle</button>
      </div>
    `;

      const moreButton = carCard.querySelector('.more-info');
      const carDetails = carCard.querySelector('.car-details');

      // Event listener for 'More Info' button
      moreButton.addEventListener('click', () => {
          carDetails.style.display = carDetails.style.display === 'none' ? 'block' : 'none'; // using a ternery operator here for the functionality
      });                                                                           

      // Event listener for 'Check Availability' button  and alerts the user

      const availabilityButton = carCard.querySelector('.availability-button');
      availabilityButton.addEventListener('click', () => {
          alert(`The vehicle ${car.name} is available.`);
      });

      // Event listener for 'Pick Vehicle' button and alerts the user

      const pickVehicleButton = carCard.querySelector('.pick-vehicle-button');
      pickVehicleButton.addEventListener('click', () => {
          alert(`You have chosen ${car.name}. Scroll down and book a test drive.`);
      });

      // Add the car card to the container
      carContainer.appendChild(carCard);     // appends the created elements to the DOM
  });
}
  

document.addEventListener('DOMContentLoaded', () => {    // ensures the DOM content loads before all other operations
    fetchCarData()
        .then((cars) => displayCars(cars))
        .catch((error) => console.error('Error fetching or displaying cars:', error));
});




//TASK TWO: USIND DELETE METHOD TO DELETE A CAR FROM DISPLAY


// Event listener for deleting a car

document.addEventListener("click", (e) => {
    // Check if the clicked element is a delete button

    if (e.target.classList.contains("delete-button")) {

        // Get the car ID from the button's data attribute

        const carId = e.target.dataset.carId;

        // Find the closest parent element with the class 'car-card'

        const parentElement = e.target.closest(".car-card");

        if (carId && parentElement) {

            // Remove the car card from the DOM

            parentElement.remove();

            // Call the deleteCar function to delete the car from the server

            deleteCar(carId);
        } else {
            console.error("Error: Car ID or parent element not found");
        }
    }
});

function deleteCar(id) {
    console.log("Deleting car with ID:", id);                   // Log the action for debugging
    fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",                                       // Using  the DELETE HTTP method of fetch
        headers: {
            "Content-Type": "application/json",                 // Specifying the content type
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.error("Failed to delete car:", res.statusText);             // Logs error if the deletion fails
            } else {
                console.log(`Car with ID ${id} deleted successfully.`);              // Logs success message
                alert(`Car deleted successfully!`);                                 // Informs the user
            }
        })
        .catch((err) => console.error("Error deleting car:", err));                  // Handles fetch errors
}






//TASK THREE: USIND PATCH METHOD TO EDIT A SECTION OF THE DISPLAY



// Event listener for the 'Edit' button

document.addEventListener('DOMContentLoaded', () => {
  // Attach event listener for edit button dynamically  after the DOM loads

  const carContainer = document.querySelector('.car_container');
  carContainer.addEventListener('click', (event) => {

      // Check if the clicked element is an edit button

      if (event.target.classList.contains('edit-button')) {
          const carId = event.target.closest('.car-card').dataset.carId;
          if (carId) {
              handleEditCar(carId);
          }
      }
  });
});

// Function to handle car editing

function handleEditCar(carId) {

  // Find the car container and get the car data

  const carContainer = document.querySelector(`.car-card[data-car-id="${carId}"]`);

  if (!carContainer) {
    console.error('Car not found');
    return;
  }

  const carName = carContainer.querySelector('h2').textContent;
  const carPrice = carContainer.querySelector('p').textContent.replace('Price: ', '');
  const carUrl = carContainer.querySelector('.car-image-container img').src;

  // Prompt the user to enter updated details

  const newCarName = prompt('Enter new car name:', carName);
  const newCarPrice = prompt('Enter new car price:', carPrice);
  const newCarUrl = prompt('Enter new image URL:', carUrl);

  if (newCarName && newCarPrice && newCarUrl) {
    const updatedCar = {
      name: newCarName,
      price: newCarPrice,
      url: newCarUrl
    };

    // Calling PATCH request to update the car details

    updateCarDetails(carId, updatedCar);
  } else {
    alert('Update cancelled or incomplete data');
  }
}


// Function to send the PATCH request to edit car details

async function updateCarDetails(carId, updatedCar) {
  try {
    const response = await fetch(`http://localhost:3000/cars/${carId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar),
    });

    if (response.ok) {
      const updatedCarData = await response.json();
      alert('Car details updated successfully!');

      // Update the car display with new values

      updateCarDisplay(carId, updatedCarData);
    } else {
      alert('Failed to update car details');
    }
  } catch (error) {
    console.error('Error updating car:', error);
    alert('Error updating car details');
  }
}


// Function to update the car display with the new values entered

function updateCarDisplay(carId, updatedCarData) {
  const carContainer = document.querySelector(`.car-card[data-car-id="${carId}"]`);

  if (!carContainer) {
    console.error('Car container not found');  //The NOT ! operator negates the result. So, checks if the car container with the given ID exists.
    return;
  }

  const carNameElement = carContainer.querySelector('h2');
  const carPriceElement = carContainer.querySelector('p');
  const carImageElement = carContainer.querySelector('.car-image-container img');

  carNameElement.textContent = updatedCarData.name;
  carPriceElement.textContent = `Price: ${updatedCarData.price}`;
  carImageElement.src = updatedCarData.url;
}




document.addEventListener('DOMContentLoaded', () => {

  // Attaching event listener for edit button dynamically

  const carContainer = document.querySelector('.car_container');

  carContainer.addEventListener('click', (event) => {

    // Check if the clicked element is an edit button

    if (event.target.classList.contains('edit-button')) {
      const carId = event.target.closest('.car-card').dataset.carId;

      if (carId) {
        handleEditCar(carId);  // Now it will get the car ID correctly
      }
    }
  });
});




//TASK FOUR: USIND POST METHOD TO ADD A VEHICLE TO THE DISPLAY


// Function to handle the form submission

function handleSubmit(e) {
    e.preventDefault();                         // Prevents form reload on submit
  
    const form = e.target;
  
    // Getting form data

  
    const vehicle = {
      name: form['vehicle-name'].value.trim(),  // removes extra spaces from the user input on the form
      price: form['vehicle-price'].value.trim(),
      url: form['vehicle-image'].value.trim(),
    };
  
    // Checking if all fields are filled in the form

    const isFormValid = Object.values(vehicle).every(value => value !== "");
    if (!isFormValid) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  
    // Call addVehicle to POST the vehicle data

    addVehicle(vehicle);
  
    // Reset the form after submission

    form.reset();
}

// Function to add a vehicle by sending POST request

function addVehicle(vehicle) {
    fetch('http://localhost:3000/cars', {  // The URL where the data will be posted
      method: 'POST',                         // POST method to send data
      headers: {
        'Content-Type': 'application/json',   // Specifying that the data is in JSON format
      },
      body: JSON.stringify(vehicle),          // Convert the vehicle object to a JSON string
    })
      .then(res => res.json())                // Parse the response as JSON
      .then(addedVehicle => {
        console.log('Vehicle added:', addedVehicle);
  
        // Displaying vehicle in DOM (creating a custom DOM structure here)

        const vehicleContainer = document.querySelector('.car_container');
        const vehicleElement = document.createElement('div');
        vehicleElement.classList.add('vehicle');
        vehicleElement.innerHTML = `
          <h3>${addedVehicle.name}</h3>
          <p>Price: ${addedVehicle.price}</p>
          <img src="${addedVehicle.url}" alt="Vehicle Image" width="200">
        `;
        vehicleContainer.appendChild(vehicleElement);
  
        // Alerts the user

        alert(`Vehicle "${addedVehicle.name}" added successfully!`);
      })
      .catch(err => console.error('Error adding vehicle:', err));
}

// Attaching event listener to form for submit event

document.querySelector('#vehicle-form').addEventListener('submit', handleSubmit);
  
// Adding event listener to trigger the submit button on Enter key press

document.querySelector('#vehicle-form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();                                                 // Prevent form from submitting by default on Enter
      document.querySelector('button[type="submit"]').click();            // Triggers the submit button
    }
});








//TASK FIVE: BOOKING THE TEST DRIVE

// Waiting for the DOM to fully load

document.addEventListener('DOMContentLoaded', function () {

  // Select the form
  const form = document.getElementById('testDriveForm');


  // Add event listener to the form's submit event
  form.addEventListener('submit', function (event) {
      event.preventDefault();                               // Prevents the default form submission behavior

      // Check if all required fields are filled

      if (form.checkValidity()) {

          // Shows success message if form is valid

          alert("Form submitted successfully!");

          // Clears the form after submission

          form.reset();
      } else {

          // Shows error message if the form is invalid

          alert("Please fill out all required fields.");
      }
  });
});





//TASK SIX: SEARCH ENGINE TO ENABLE SEARCH THE VEHICLES


// Type 1


// Geting reference to the search form and input

const searchForm = document.querySelector('form[role="search"]');
const searchInput = searchForm.querySelector('input[type="search"]');

// Storing the original car data in an empty
let originalCars = [];

// Modifying the existing fetchCarData function to store in original data

const originalFetchCarData = fetchCarData;
fetchCarData = async () => {
    const cars = await originalFetchCarData();
    originalCars = [...cars];        // Stores a copy of the original data using spread oprator
    return cars;
};


// Adding event listener for the search form

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();    // ensures no spaces available after user input and turns the value to lowercase
    
    if (!searchTerm) {
        // If search is empty, display all cars

        displayCars(originalCars);
        return;
    }

    /* 
    * Filter cars based on search term
    * The filter method iterates over each car object in the originalCars array.
    * For each car, it checks if the searchTerm is present in the car's name, make, or model.
    * If at least one of these conditions is true, the car is included in the filteredCars array.
    * The includes method is a string method that checks whether a given substring is present in the string. 
    * It is case-sensitive by default.
    * E.g string.includes(substring) returns true if substring is found in string, otherwise false
    * If car.make or car.model is undefined or null, the ?. prevents the code from breaking.
    * If the property is undefined or null, the expression evaluates to undefined instead of throwing an error.
    * || used to evaluate multiple conditions and returns true if at least one of the conditions is true. 
    * If all conditions are false, it returns false.
    */

    const filteredCars = originalCars.filter(car => {     
        return car.name.toLowerCase().includes(searchTerm) || 
               car.make?.toLowerCase().includes(searchTerm) || 
               car.model?.toLowerCase().includes(searchTerm);
    });

    if (filteredCars.length === 0) {

        // If no cars found, displays the below message

        const carContainer = document.querySelector('.car_container');
        carContainer.innerHTML = `
            <div class="no-results">
                <h3>No cars found matching "${searchTerm}"</h3>
                <button class="btn btn-primary" onclick="resetSearch()">Show All Cars</button>
            </div>
        `;
    } else {
        // Display matching cars
        displayCars(filteredCars);
    }
});

// Function to reset search
function resetSearch() {
    searchInput.value = '';
    displayCars(originalCars);
}


//Type 2: Can also use this 

// Adding real-time search functionality 
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (!searchTerm) {
        displayCars(originalCars);
        return;
    }

    const filteredCars = originalCars.filter(car => {
        return car.name.toLowerCase().includes(searchTerm) || 
               car.make?.toLowerCase().includes(searchTerm) || 
               car.model?.toLowerCase().includes(searchTerm);
    });

    if (filteredCars.length === 0) {
        const carContainer = document.querySelector('.car_container');
        carContainer.innerHTML = `
            <div class="no-results">
                <h3>No cars found matching "${searchTerm}"</h3>
                <button class="btn btn-primary" onclick="resetSearch()">Show All Cars</button>
            </div>
        `;
    } else {
        displayCars(filteredCars);
    }
});
