import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getUsers, addUser, type User} from '../ts/dataUser'

const SignUpPage=()=>{
    const navigate=useNavigate();
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [errorName, setErrorName]=useState("");
    const [error, setError]=useState("");

    const signing=(event:React.FormEvent)=>{
        event.preventDefault();

        if (!username||!password) {
            setError("Please fill in all fields");
            return;
        }

        const users=getUsers();
        if (users.some((user)=>user.username===username)) {
            setErrorName("Username already exists");
            return;
        }

        const newUser:User={username,password};
        addUser(newUser);

        alert("Sign up successful! You can now log in.");
        navigate('/');
    }

    return(
        <>
        <h1>SignUp</h1>   
        <form onSubmit={signing}>             
        <div>

         <input type="text" 
        placeholder="create username"
        value={username}
        onChange={(event)=>{setUsername(event.target.value)
            setErrorName("");
        }}
        />     
        <div>
          {<p>{errorName}</p>}  
        </div>        
        </div>

<div>
        <input type="password" 
        placeholder="create password"
        value={password}
        onChange={(event)=>{setPassword(event.target.value)
        
        }}
        />    
</div>
{<p>{error}</p>}
        <button>Sign Up</button>
        </form>
        <button onClick={()=>navigate('/')}>go back to Sign In</button>
        </>
    );
}
export default SignUpPage;