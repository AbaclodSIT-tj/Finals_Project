import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
//setting some demo accounts
const user=[
    {
        username:"admin",
        password:"1234"
    },
    {
        username:"Abaclod",
        password:"Dolcaba"
    },
    {
        username:"Thomson",
        password:"Nosmoht"
    }
];
const LoginPage=()=>{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [errorUser, setErrorUser]=useState("");
    const [errorPass, setErrorPass]=useState("");

    const navigating=useNavigate();

    const handleLogin=(event:React.FormEvent )=>{
        event.preventDefault();

        const validCheck=user.find(user=>user.username===username&&user.password===password);
        const userCheck=user.find(user=>user.username===username);
        if(input===""){
            setErrorUser("fill in please");
            setErrorPass("fill in please");
        }else{}
        if(validCheck){
            alert("log in successfully");
        }else{
            if(!userCheck){
                setErrorUser("Username does not exist");
                setErrorPass("");
            }else{
                setErrorUser("");
                setErrorPass("Password is not valid");
            }
        }
    }


    }
    return(
        <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
    <div>
        <input
        type="text"
        placeholder="Your Username..."
        value={username}
        onChange={(e) =>{ setUsername(e.target.value)
            setErrorUser("")
        }}
        />
    </div>
    {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
    <div>
        <input
        type="password"
        placeholder="Your Password..."
        value={password}
        onChange={(e) => {setPassword(e.target.value)
        setErrorPass("")
        }}
        />
    </div>
    {errorPass && <p style={{ color: 'red' }}>{errorPass}</p>}
    <button>Login</button>
</form>

        <div>
    <p>No Account?click below to Sign Up</p>
            <button onClick={()=>navigating('/SignUp')}>
                SignUp
            </button>          
        </div>      

        
        </>
    );
}
export default LoginPage;