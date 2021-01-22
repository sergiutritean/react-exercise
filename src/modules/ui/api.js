import axios from 'axios';

export async function getPageData(){
  return await axios.get('http://localhost:4000')
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

export async function deleteItem(uuid) {
  console.log(uuid);
  if (uuid === 'all' && window.confirm('Are you sure you want to clear all measurements?\nThis action cannot be undone!')) {
    return await axios.delete('http://localhost:4000',{params: {uuid: uuid}}
    ).then(function (response) {
      console.log(response);
      return response;
    })
      .catch(function(error) {
        return error;
      })
  } else {
    return await axios.delete('http://localhost:4000',{params: {uuid: uuid}}
    ).then(function (response) {
      console.log(response);
      return response;
    })
      .catch(function(error) {
        return error;
      })
  }
}

export async function addEntry(entry){
  return await axios.post('http://localhost:4000',entry)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    })
}