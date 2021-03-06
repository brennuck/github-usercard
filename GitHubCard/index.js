/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get("https://api.github.com/users/brennuck")
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

let cards = document.querySelector('.cards');
axios.get('https://api.github.com/users/brennuck')
.then(response => {
  cards.append(userCard(response));
})
.catch(error => {
  console.log(error);
})

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "https://api.github.com/users/tetondan",
 "https://api.github.com/users/dustinmyers",
  "https://api.github.com/users/justsml",
  "https://api.github.com/users/luishrd",
  "https://api.github.com/users/bigknell"
];

followersArray.forEach(card => {
  axios.get(card)
  .then(response => {
    cards.append(userCard(response));
  })
  .catch(error => {
    console.log(error);
  })
})
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function userCard(object) {
  // create new elements
  const cardDiv = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3');
  const userName = document.createElement('p');
  const userLocation = document.createElement('p');
  const userProfile = document.createElement('p');
  const profileAddress = document.createElement('a');
  const userFollowers = document.createElement('p');
  const userFollowing = document.createElement('p');
  const userBio = document.createElement('p');

  // setup the structure of our element
  cardDiv.append(cardImg);
  cardDiv.append(cardInfo);
  cardInfo.append(cardName);
  cardInfo.append(userName);
  cardInfo.append(userLocation);
  cardInfo.append(userProfile);
  cardInfo.append(userFollowers);
  cardInfo.append(userFollowing);
  cardInfo.append(userBio);
  userProfile.append(profileAddress);

  // add classes to elements
  cardDiv.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  userName.classList.add('username');

  // set text content
  cardImg.src = object.data.avatar_url;
  cardName.textContent = object.data.name;
  userName.textContent = object.data.login;
  userLocation.textContent = object.data.location;
  userProfile.textContent = object.data.url;
  profileAddress.href = object.data.html_url;
  profileAddress.textContent = object.data.html_url;
  userFollowers.textContent = `Followers: ${object.data.followers_url}`;
  userFollowing.textContent = `Following: ${object.data.following_url}`;
  userBio.textContent = object.data.bio;

  return cardDiv;
}