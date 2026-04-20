import {useState} from 'react'
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
    const [error, setError]=useState("");

    const handleLogin=(event:React.FormEvent )=>{
        event.preventDefault();

        const checker=user.find(user=>user.username===username&&user.password===password);

        if(checker){
            alert("Log In Successfully");
        }else{
            setError("Invalid Credentials");
        }
    }
    return(
        <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
    <div>
        <input
        type="text"
        placeholder="Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
    </div>
    <div>
        <input
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
    </div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <button>Login</button>
</form>
        </>
    );
}
export default LoginPage;