function App(){
    const[a,setA] = React.useState(null)

    return(
        <div className='mt-5'>
            <LoadPosts a={a} setA={setA}/>
        </div>
    )
}

function LoadPosts(props){
const[posts,setPosts] = React.useState(null)
const[s_edit, setEdit] = React.useState(null)
const[edit_id,setId] =React.useState(null)
const[username,setU] = React.useState(null)
const[pageNum,setPageNum] = React.useState(1)
const[maxPage,setMaxPage] = React.useState(null)

const posts2 = []

function like(id){
    console.log(id)
    fetch('/like',{
        method:'POST',
        body:JSON.stringify({
            post_id: id
        })
    })
    props.setA(!props.a)
}




React.useEffect(()=>{
    setTimeout(()=>{
        fetch('fw_posts/' + pageNum)
        .then(response => {return response.json()})
        .then(data =>{
            setPosts(data.posts)
            console.log(data.posts)
            setU(data.username)
            setMaxPage(data.maxPage)
        });
    },100)
},[props.a,pageNum])

function next(){
    if(pageNum >= maxPage){
        alert('You are looking last page')
    }else{
        window.scrollTo(0, 0);
        setPageNum(pageNum+1)
    }
    
}
function pre(){
    if(pageNum == 1){
        alert('You are looking first page')
    }else{
        window.scrollTo(0, 0);
        setPageNum(pageNum-1)
    }
    
}


return(
    <div>
        {posts && posts.map((post) =>(
            <div key={post.id}>
                <Post uname={username} id={post.id} txt={post.p_text} edit_id={edit_id} p_like ={post.p_like} user={post.p_username} s_edit={s_edit} like={like} p_time={post.p_time}/>
            </div>
        ))}
        <Pages pre={pre} next={next} a={props.a}/>
    </div>
)
}
function Post(props){
function profile(user){
    window.location = `http://127.0.0.1:8000/profile/${user}`
}
return(
    <div className='container mt-3 post d-flex flex-column'>   
        <h5 onClick={()=>profile(props.user)} className='mt-3 p_user' >{props.user}</h5> 
        <p className='p_time lead'>{props.p_time}</p>          
        <p className='Lead'>{props.txt}</p>

        <div className='mb-2 mt-4'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex '>
                    <i onClick={() => props.like(props.id)} className="fa fa-heart fa-lg "></i>
                    <p className='align-self-center p_like'>{props.p_like}</p> 
                </div>
                
            </div>
            {props.user == props.uname && <button className='btn btn-secondary' onClick={() => props.edit(props.id)}>Edit</button>}
        </div>
    </div>
) 
}

function Pages(props){
    let style ={
        'marginRight':'15px',
        'width':'100px'
}
return(
    <div className='mt-5 d-flex justify-content-center mb-5'>
        <button className='btn btn-primary' style={style} onClick={props.pre}>previous</button>  
        <button className='btn btn-primary' style={style} onClick={props.next}>next</button>  
    </div>
)
}

ReactDOM.render(
<App />,
document.querySelector('#root')
)