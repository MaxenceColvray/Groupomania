import "./post.css"


function Post(props) {


    return (
      
      <div className="post">
      <h2>{props.title}</h2>
      <h3>{props.name}</h3>
      <div className="box_img">
      <img
        src={props.imageURL}
        alt={props.imageURL}
      />
      </div>
      <p>{props.description}</p>
    </div>
    );
  }
  
  export default Post;