import './App.css';
import {Form,Card, Image , Icon} from 'semantic-ui-react';
import { useEffect, useState } from 'react';

function App() {

  const [name ,setName ]=useState('')
  const [userName ,setUserName ]=useState('')
  const [repo ,setRepo ]=useState('')
  const [followers ,setFollowers ]=useState('')
  const [following ,setFollowing ]=useState('')
  const [avatar ,setAvatar ]=useState('')
  const [input ,setInput ]=useState('')
  // const [error , setError] =useState(null)

  const nameHandler = (event) =>{
    setInput(event.target.value)
  }

  const setData = ({name,login,public_repos,followers,following,avatar_url}) => {
    setName(name)
    setUserName(login)
    setRepo(public_repos)
    setFollowers(followers)
    setFollowing(following)
    setAvatar(avatar_url)
  }

  useEffect(()=>{
    fetch("https://api.github.com/users/example")
    .then(res => res.json())
    .then(data =>{
      setData(data)
    })
  },[])

  const submitHandler = ()=>{
    fetch(`https://api.github.com/users/${input}`)
    .then(res=>res.json())
    .then(data=>{
      setData(data)
    })
  }

  return (
    <div>
      <div className='navBar'>
        <h2>GitHub Search</h2>
      </div>
      <div className='form'>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Input placeholder='Username' name='username' onChange={nameHandler}/>
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      <div className='card'>
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{userName}</Card.Header>
            <Card.Header>{name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {following} Following
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {repo} public_repos
            </a>
          </Card.Content>

        </Card>
      </div>
    </div>
  );
}

export default App;
