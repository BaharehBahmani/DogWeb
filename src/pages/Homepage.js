import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

/*
Homepage:
  1. I want to display a list of dog breeds: DONE
    - useEffect
  2. I want to display a random image at the top like a banner



  3. Sorting/filtering
    - Dropdown => <select> <options>
    -
    -






Im going to need:
 - 
*/



const Homepage = () => {
  const [breedList, setBreedList] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [sortBy, setSortBy] = useState(0)
  const [filterBy, setFilterBy] = useState(0)

  useEffect(() => {
    const fetchImageAndBreeds = async () => {
      try {
        //  ---- Fetching breed list and setting to state ----  //
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        const arrayWithBreeds = Object.keys(response.data.message);
        
        
        // -- Fetching random image and setting to state -- //
        const randomImgResponse = await axios.get("https://dog.ceo/api/breeds/image/random")
        console.log("random image", randomImgResponse.data.message);
        
        setBreedList(arrayWithBreeds);
        setRandomImage(randomImgResponse.data.message)

      } catch(e) {
        console.log(e.message);
      }
    }
    fetchImageAndBreeds();
  }, [])



// Long names > 7 characters
let filteredBreeds;

switch(filterBy) {
  case 0:
    filteredBreeds = breedList.filter(breed => breed.length > 9)
    break;
  case 1:
      filteredBreeds = breedList.filter(breed => breed.length >= 6 && breed.length <= 9)
      break;
  case 2:
    filteredBreeds = breedList.filter(breed => breed.length < 6)
    break;
  default:
    filteredBreeds = breedList;
    break;
}
  
  
  
  /// Prepping data to be rendered
  const sortedData = sortBy === 0 
    ? filteredBreeds.sort((a, b) => a.localeCompare(b)) 
    : filteredBreeds.sort((a, b) => b.localeCompare(a));
  ///

  return (
    <div>
      <h1>Images of Dogs by Breed</h1>
      <img src={randomImage} />
      <div>
        <label>Sort by: </label>
        <select onChange={event => setSortBy(parseInt(event.target.value))} value={sortBy}>
          <option value={0}>A - Z</option>
          <option value={1}>Z - A</option>
        </select>
      </div>

      <div>
        <label>Filter by:</label>
        <select onChange={event => setFilterBy(parseInt(event.target.value))} value={filterBy}>
          <option value={0}>Long names</option>
          <option value={1}>Regular names</option>
          <option value={2}>Short names</option>
        </select>
      </div>
      <div>
        <ul>
          {sortedData.map(breed => <li key={breed}><Link to={`/breeds/${breed}`}>{breed}</Link></li>)}
        </ul>
      </div>
      </div>
  )
}

export default Homepage