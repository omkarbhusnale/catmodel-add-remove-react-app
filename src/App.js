import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from "react";
import AddModel from './AddModel';
import SearchModel from './SearchModel';
import apiRequest from './apiRequest';


// [
//   {
//       id: 1,
//       checked : false,
//       model : "PC10BD16005D1"
//   },
//   {
//       id: 2,
//       checked : true,
//       model : "PC10BD16006D1"
//   },
//   {
//       id: 3,
//       checked : false,
//       model : "PC10BD16006D2"
//   },
//   {
//       id: 4,
//       checked : true,
//       model : "PC10BD16006D3"
//   },
//   {
//       id: 5,
//       checked : false,
//       model : "PC10BD16006D4"
//   },
//   {
//       id: 6,
//       checked : false,
//       model : "PC10BD16006D5"
//   }
// ]

function App() {
  const API_URL = "http://localhost:3500/models"

  // const [models, setModels] = useState(
  //     JSON.parse(localStorage.getItem('CatIdList')) || []
  //   );
  const [models, setModels] = useState([])
  const [newModel, setNewModel] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   // console.log('Updating Model State');
  //   localStorage.setItem('CatIdList', JSON.stringify(models))

  // }, [models])


  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(API_URL)

        if(!response.ok) {
          throw Error('Did not receive expected data')
        }
        else{
          const listModels = await response.json()
          // console.log(listModels);
          setModels(listModels)
          setFetchError(null)
        }
      } catch (err) {    
        setFetchError(err.message)
      }
      finally {
        setIsLoading(false)
      }
    }
    setTimeout(() =>{
      (async () => await fetchModels())()
    }, 2000)

  }, [])

  
  const addModel = async (model) => {
    const id = models.length ? models[models.length - 1].id + 1 : 1
    const myNewModel = {id, checked: false, model}
    const listModels = [...models, myNewModel]
    setModels(listModels)

    const postOptions = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(myNewModel)
    }

    const result = await apiRequest(API_URL, postOptions)
    if(result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    // console.log(`Key : ${id}`);
    const listModels = models.map((model) => (
        model.id === id ? {...model, checked: !model.checked} : model
    ))
    setModels(listModels)

    const myModel = listModels.filter(model => model.id === id)

    const updateOptions = {
      method : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({checked: myModel[0].checked})
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if(result) setFetchError(result)


  }

  const handleDelete = async (id) => {
    // console.log(`Deleted Model : ${id}`);

    const listModels = models.filter((model) => model.id !== id )
    setModels(listModels)

    const deleteOptions = {
      method :'DELETE',
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if(result) setFetchError(result)

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!newModel) return
    // console.log(newModel);
    addModel(newModel)
    setNewModel('')
  }

  return (
    <div className="App">
      <Header title = "CAT Id List"/>
      

      <AddModel 
        newModel = {newModel}
        setNewModel = {setNewModel}
        handleSubmit = {handleSubmit}
      />
      
      <SearchModel 
        search = {search}
        setSearch = {setSearch}
      />
      <main>
        {isLoading && 
          <p 
            style={{
              color: 'blue'
            }}
          >
            Loading Models...
          </p>
        }

          {fetchError &&
            <p style={{color: 'red'}}>{`Error : ${fetchError}`}</p> 
          }
            
          {!fetchError && !isLoading &&
            <Content 
              models = {
                models.filter(
                  model => (
                    (model.model).toLowerCase()
                  ).includes(
                      search.toLocaleLowerCase()
                  )
                )
              }
              handleCheck = {handleCheck}
              handleDelete = {handleDelete}
            />
          }
      </main>
      <Footer length = {models.length} />
    </div>
  );
}

export default App;