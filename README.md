# Empire Cars Showroom

Check out the Website: [Link to Live Project]()


## Project Description
* Empire Cars Showroom is a dynamic web application designed to showcase luxury cars like Range Rover, Ferrari, Lamborghini, and more. 
* The website allows users to explore a collection of luxury cars, view their specifications, check vehicle availability in real-time, add a vehicle  of their preference to the page to notify the company, edit any vehicle details and book test drives—all in one place. 
* The data for each car is fetched from a public API and displayed interactively on the website.
*  Users can interact with the content, filter cars, and learn more about each model.
  

  ## Problem Statement
* Accessing detailed information about luxury cars, including specifications, pricing, and availability, can often be cumbersome and scattered across multiple sources. 
* Potential customers seeking a streamlined way to explore car options, check availability, and book test drives lack an intuitive and centralized solution. 
* This gap not only complicates the decision-making process but also hinders effective customer engagement for luxury car dealers.
* Empire Cars Showroom addresses this challenge by offering an interactive platform where users can view detailed car specifications, check vehicle availability in real-time, and easily book test drives—all in one place.




## Project Features

1. **Home Page**: Features a landing page with a visually appealing carousel showcasing top luxury cars.
2. Displays a gallery of luxury cars fetched dynamically using a public API, showing details like car name, price, and images.

3. **Car Details Card**: A detailed card section for every car that displays the car image, name and price
    * In the card there is a ``moreInfo`` button that when clicked by the user it displays more detailed information about the car.
    * Additionally, it has ``Edit button`` that when clicked by a user, they are able to edit the details of a given car.
    * Furthermore, it has ``delete button`` where a user can delete any car from the gallery so that they only view and do a comparison of what they want to choose from.
    * Moreover, below the more details of the car, there is: ``availability button`` which enables the user to  check the availability of a given vehicle in store
    * Alongside the availability button, there is ``pick vehicle button`` which enables the user to pick their desired vehicle to buy, where after clicking the button. A user is alerted to book a test drive for the given vehicle.
4. **Add vehicle form**: Below the car card details, a user can interact with the form section to add a vehicle to the gallery of the company which informs the company of the addition, then go ahead to send a request for availability of the vehicle, pick the vehicle and do all other functionalities.
5. **Booking a test drive**: The form allows the users to book a test drive for their selected car, with a confirmation message upon submission. 
   
     * The user can choose their preferred date from the calender apart form on Sunday's and on National holidays.
     * When the user is submitting the form they are required to input their full names as per the National Identity Card, since it will be used on the day of test drive for identification.
6. **Search Functionality**: A search bar to filter cars by brand name is provided for the user to enable the user have an easier time interacting with the site.


### File Structure

 * *index.html*: The main entry point for the application. It includes the structure for the home page and car gallery.
 * *styles.css*: Contains all the styles for the website, including layout, colors, and animations.
 * *index.js*: Handles fetching car data from the API, populating the gallery, and managing events like booking a test drive and searching cars.
 * *db.json* (for local data): Stores the data for car images, their prices and names of each car.
  
## How It Works

### Fetching Car Data:

The project uses the Cars API from [RapidApi-ninjas] (https://rapidapi.com/apininjas/api/cars-by-api-ninjas) to fetch data for luxury cars. This data is dynamically inserted into the website using JavaScript’s fetch() method. By using their provided code snippet in their site.

### HTML:

 1. The index.html file sets up the layout and structure of the page. It includes:

     * A header section with a navbar for easy navigation.
     * A section to display the car gallery and a form to add vehicle.
     * A section providing a form for the book test drive with a calender.
     * A footer for contact information on social media  platforms.  
  
### CSS:

1. The styles.css file styles the entire website with a sleek, luxurious theme. It includes:
   
   * Responsive design using media queries to adapt to different screen sizes.
   * Hover effects and button transitions to enhance user interactivity.
   * Font sizes and font types to give elements different fonts
   * Colors and background colors to make the site look more executive in nature.
   * Adding a **color of gold** to the logo and company name indicating a theme of luxury.
   * Text, image and all elements alignment for good positioning on the page.
   * Paddings and margins to add space between elements.
   * Background image to enhance the website appearance.



### JSON File

* Contains car details like the name, price and image.
* The data is accessed by first launching JSON server in the terminal using ``json-server --watch db.json``
* This provides a [URL](http://localhost:3000/films) that can be used to refer to the site where one can view all the data in the db.json file

### Fetching data from the Public API

* The data from the RapidAPI  [cars by Ninjas](https://rapidapi.com/apininjas/api/cars-by-api-ninjas/playground/apiendpoint_751d3e33-1f5a-4a8b-afda-f78ffa2219c2) is accessed by using fetch together with the provided code snippet that guides on how to access the data.
* The API provides the car details like ``class:"compact car", combination_mpg:24, cylinders:4, displacement:1.6, drive:"fwd", fuel_type:"gas", highway_mpg:26, make:"toyota", model:"corolla" and transmission:"a`` where we use these details and assign them to our cars in the json file.

### JavaScript file:

* **Fetching Car Data**:  The application fetches data from the Cars API and the Json file then displays it dynamically  on the DOM (Document Object Module). The data from the API is stored in an object to be accessed globally in the function.
* Creates HTML tags where the given data is to be held e.g ``divs, paragraphs, and buttons``.
* The content is appended to the DOM to enable the user to see the contents with all the data of the vehicles fetched from the API and the JSON file.
* **Handling User Interactions:**  Which involves:
   
    * Adding event listeners to the created elements like on the button of moreInfo, edit, delete and availability buttons to enable functionality.

* **A delete**  function that enables the user to delete a vehicle form the gallery of the website using the delete button where eventListeners are added to the button. The functionality uses ***DELETE*** a method of fetch to delete the child elements ``buttons`` of the vehicle together with its parent elements ``vehicle card``.
* **Edit** function enables the user to edit the details of the vehicle partially like the ``image, name and price`` in the vehicle card. The functionality uses ***PATCH*** to edit the details of the given vehicle.
* **Submit** function that enables the user to interact with the add vehicle form to enable the the user add a given vehicle into the gallery according to their preferences. The added vehicle with all its elements can perform all functionalities as the others in the site. This uses ***POST*** method of fetch to update data into the site.
* **Event Listerner** to submit button of the form book test drive to alert the user if they have successfully booked the test drive.
* **A search** function to filter cars by brand in the gallery, where is a given brand does not exist the user gets alerted that the brand is not available and this will make the user go ahead and add their vehicle of preference and use other functionalities as well.
  

  ## Challenges
  * In developing the project, choosing the correct API which matches what you want to develop is a bit hard.
  * Most of the API's that have all the details one can need in developing their websites are not free, you have to pay.
  * In developing this website using RapidAPi cars for Ninjas, does not have all the details we required like ``images and prices``, also in the data there is alot of redundacy which makes the data hard to use.
  * Most of the cars available in the API data does not coincide with the type of cars I wanted my website to render ``luxury cars``.
  * Therefore, I partially accessed the details of the API data like``class:"compact car", combination_mpg:24, cylinders:4, displacement:1.6, drive:"fwd", fuel_type:"gas", highway_mpg:26, make:"toyota", model:"corolla" and transmission:"a`` and assigned them to my cars in the json file.
  * Hence, the cars details available in the gallery does not coincide with the specific car displayed. We did this to illustrate how to use a Public API data in any website development.
  


## Prerequisites

* git clone ````git clone <SSH KEY>```` the repository to your local machine in the terminal.

* Lauch JSON server in the terminal using ``json-server --watch db.json``.
  
* To view the data available in the JSON file use the link in the terminal, the one for **Endpoint** ``http://localhost:3000/films``

* Launch index.html in VsCode by running it using browser like ```Chrome,Firefox, Brave and any other``` 
* To view the page well and interact with all the elements, **Keep the JSON server running** 
* The page **Cannot access the json file without the json server running**


### Author: Elly James Komunga
Incase you are stuck or experiencing any error, reach me via ellyjames1999@gmail.com

### Licence 
The page uses MIT licence
