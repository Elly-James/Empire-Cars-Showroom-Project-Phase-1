async function fetchCarData() {
    try {
        // Define your local car models to fetch from the API
        const carModels = ['corolla', 'camry', 'civic', 'accord', 'mustang', 'altima', 'model3', 'rav4'];
        const carDetails = {}; // Object to store fetched car details

        // Fetch details for each car model
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
            if (!response.ok) {
                console.warn(`Failed to fetch details for model: ${model}`);
                continue;
            }
            const result = await response.json();
            carDetails[model] = result[0] || null; // Store the first result or null
        }

        // Fetch your local car data
        const localResponse = await fetch('http://localhost:3000/cars');
        if (!localResponse.ok) {
            throw new Error(`Failed to fetch local car data. Status: ${localResponse.status}`);
        }
        const localCars = await localResponse.json();

        if (!Array.isArray(localCars)) {
            throw new Error("Invalid local car data: 'cars' is not an array.");
        }

        // Assign API details to your local cars
        const carsWithDetails = localCars.map((car, index) => {
            const modelKey = carModels[index % carModels.length]; // Cycle through car models
            return { ...car, ...carDetails[modelKey] };
        });

        return carsWithDetails;
    } catch (error) {
        console.error("Error fetching car data:", error);
        return [];
    }
}

function displayCars(cars) {
    const carContainer = document.querySelector('.car_container');
    carContainer.innerHTML = ''; // Clear existing content
  
    cars.forEach((car) => {
      const carCard = document.createElement('div');
      carCard.classList.add('car-card');
      carCard.dataset.carId = car.id; // Add data-car-id to the car card
  
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
        carDetails.style.display = carDetails.style.display === 'none' ? 'block' : 'none';
      });
  
      // Add the car card to the container
      carContainer.appendChild(carCard);
    });
  }
  

document.addEventListener('DOMContentLoaded', () => {
    fetchCarData()
        .then((cars) => displayCars(cars))
        .catch((error) => console.error('Error fetching or displaying cars:', error));
});












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
    console.log("Deleting car with ID:", id); // Log the action for debugging
    fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE", // Use the DELETE HTTP method
        headers: {
            "Content-Type": "application/json", // Specify the content type
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.error("Failed to delete car:", res.statusText); // Log error if the deletion fails
            } else {
                console.log(`Car with ID ${id} deleted successfully.`); // Log success message
                alert(`Car deleted successfully!`); // Inform the user
            }
        })
        .catch((err) => console.error("Error deleting car:", err)); // Handle fetch errors
}













// Function to handle the form submission
function handleSubmit(e) {
    e.preventDefault();  // Prevent form reload on submit
  
    const form = e.target;
  
    // Getting form data
    const vehicle = {
      name: form['vehicle-name'].value.trim(),
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
      .then(res => res.json())  // Parse the response as JSON
      .then(addedVehicle => {
        console.log('Vehicle added:', addedVehicle);
  
        // Display vehicle in DOM (you can create a custom DOM structure here)
        const vehicleContainer = document.querySelector('.car_container');
        const vehicleElement = document.createElement('div');
        vehicleElement.classList.add('vehicle');
        vehicleElement.innerHTML = `
          <h3>${addedVehicle.name}</h3>
          <p>Price: ${addedVehicle.price}</p>
          <img src="${addedVehicle.url}" alt="Vehicle Image" width="200">
        `;
        vehicleContainer.appendChild(vehicleElement);
  
        // Alert the user
        alert(`Vehicle "${addedVehicle.name}" added successfully!`);
      })
      .catch(err => console.error('Error adding vehicle:', err));
}

// Attach event listener to form for submit event
document.querySelector('#vehicle-form').addEventListener('submit', handleSubmit);
  
// Add event listener to trigger the submit button on Enter key press
document.querySelector('#vehicle-form').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent form from submitting by default on Enter
      document.querySelector('button[type="submit"]').click();  // Trigger the submit button
    }
});















// Event listener for the 'Edit' button
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener for edit button dynamically
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
  
      // Call PATCH request to update the car details
      updateCarDetails(carId, updatedCar);
    } else {
      alert('Update cancelled or incomplete data');
    }
  }
  

// Function to send the PATCH request
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
  

// Function to update the car display with the new values
function updateCarDisplay(carId, updatedCarData) {
    const carContainer = document.querySelector(`.car-card[data-car-id="${carId}"]`);
  
    if (!carContainer) {
      console.error('Car container not found');
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
    // Attach event listener for edit button dynamically
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
  





  // under booking 
// Select form and submit button
const form = document.getElementById('testDriveForm');
const submitButton = document.getElementById('submitBtn');

// Add event listener to submit button
submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form reload
    
    // Check if all required fields are filled
    if (form.checkValidity()) {
        // Show success message if form is valid
        alert("Form submitted successfully!");
        
        // Clear the form after submission
        form.reset();
    } else {
        // Show error message if the form is invalid
        alert("Please fill out all required fields.");
    }
});