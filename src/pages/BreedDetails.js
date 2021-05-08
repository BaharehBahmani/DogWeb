import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const BreedDetails = () => {
  const [imageList, setImageList] = useState([]);

  const params = useParams();
  console.log(params);

  const { breedName } = params;

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(`https://dog.ceo/api/breed/${params.breedName}/images`)
      console.log(response);
      const shorterList = response.data.message.slice(0, 9)
      console.log(shorterList)
      setImageList(shorterList);
    }
    fetchImages()
  }, [breedName])

  return (
    <div>
      <h1>{breedName}</h1>

      <div>
        {imageList.map(url => <img src={url} />)}
      </div>
    </div>
  );
}
 
export default BreedDetails;