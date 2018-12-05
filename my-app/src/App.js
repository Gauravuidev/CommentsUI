import React from "react";
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      commentList: [{
        name: 'Gaurav',
        Comment: 'Hello',
        profile: 'https://a10.gaanacdn.com/images/song/19/24599519/crop_55x55_1543338921.jpg',
        date: this.dateFormatter(),
        reply: [{
          name: 'Kiara',
          Comment: 'Hiii',
          profile: 'https://a10.gaanacdn.com/images/song/19/24599519/crop_55x55_1543338921.jpg',
          date: this.dateFormatter()
        }]
      }],
      reply:false,
      rIndex: ''
    }
  }
  addCommentFunc(){
    let obj = {
        name: this.NameBox.value,
        Comment: this.commentBox.value,
        profile: this.imageBox.value,
        date: this.dateFormatter(),
        reply: []
    }
    var joined = this.state.commentList.concat(obj);
    this.setState({ commentList: joined })
    this.NameBox.value = '';
    this.commentBox.value='';
    //this.profile.value='';
    //this.date.value='';
  }
  addReplyFunc(index){ debugger;
    let obj = {
        name: this.NameBox.value,
        Comment: this.commentBox.value,
        profile: this.imageBox.value,
        date: this.dateFormatter()
    }
    var someProperty = {...this.state.commentList}
    someProperty[index].reply.push(obj);
    this.setState({someProperty});
    //var joined = this.state.commentList[index].reply.push(obj);
    console.log(this.state.commentList);
    //this.setState({ commentList[index].reply: joined })
    this.NameBox.value = '';
    this.commentBox.value='';
    //this.profile.value='';
    //this.date.value='';
    this.setState({
      reply:false
    })
  }
  dateFormatter(){
    const date = new Date();
    const hour = date.getHours();
    const Min = date.getMinutes();
    let day = date.getDay();
    switch(day){
      case 1 : day = 'Monday';
      break;
      case 2 :day = 'Tuesday';
      break;
      case 3 : day ='Wednesday';
      break;
      case 4 : day ='Thursday';
      break;
      case 5 : day ='Friday';
      break;
      case 6 : day ='Saturday';
      break;
      case 7 : day ='Sunday';
    }
    const datee = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear();
    return hour +':'+ Min +' '+ day +' '+ datee +'-'+ mon +'-'+ year; 
  }
  deleteFunc(key){
    this.state.commentList.splice(key,1);
    this.setState({ commentList: this.state.commentList })
  }
  deleteRelyFunc(pkey,ckey){
    this.state.commentList[pkey].reply.splice(ckey,1);
    this.setState({commentList: this.state.commentList})
  }
  editFunc(key,data){
    this.deleteFunc(key);
    console.log(data.name);
    this.NameBox.value = data.name;
    this.commentBox.value = data.Comment;
    //this.imageBox.value = data.profile;
  }
  editReplyFunc(pkey,ckey,pdata,cdata){
    this.deleteRelyFunc(pkey,ckey);
    this.setState({
      reply:true,
      rIndex: pkey
    });
    this.NameBox.value = cdata.name;
    this.commentBox.value = cdata.Comment;
  }
  replyFunc(key){
    this.setState({
      reply:true,
      rIndex:key
    })
    this.NameBox.focus();
  }
	render() {
		return (
      <div>
      <div className="commentListSection">
      <ul>
      { 
        this.state.commentList.map((index,key) => {
         return <li data-icon={key} className="about-author"><img src={index.profile} className="avatar" height="76" width="76"/><div className="about-author-text"><strong>{index.name}</strong> <span>{index.Comment}</span>
         <div className="options"><span className="edit" onClick={this.editFunc.bind(this,key,index)}>Edit</span>  <span className="reply" onClick={this.replyFunc.bind(this,key)}>Reply</span>  <span className="delete" onClick={this.deleteFunc.bind(this,key)}>Delete</span> <span className="date">{this.dateFormatter()}</span></div></div>
          <ul className="subcomments">
          {index.reply.map((zindex,innerkey)=>{
            return <li data-icon={innerkey} className="about-author"><img src={zindex.profile} className="avatar" height="76" width="76"/><div className="about-author-text"><strong>{zindex.name}</strong> <span>{zindex.Comment}</span>
            <div className="options"><span className="edit" onClick={this.editReplyFunc.bind(this,key,innerkey,index,zindex)}>Edit</span> <span className="delete" onClick={this.deleteRelyFunc.bind(this,key,innerkey)}>Delete</span> <span className="date">{this.dateFormatter()}</span></div></div></li>
          })
        }
        </ul>
         </li>
        })
      }
      
      </ul>
      </div>
			<div className="commentSection">
        <h4 className="leave-comment">{this.state.reply ? 'Reply on comment' : 'Add a Comment'}</h4> 
        <input type="text" placeholder="Your Name" required="" ref={input => this.NameBox = input }/> 
        <input type="file" name="pic" accept="image/*" ref={input => this.imageBox = input}/>
        <textarea ref={input => this.commentBox = input} placeholder="Add your comment here"></textarea>
        {this.state.reply ? <button className="button" type="button" onClick={this.addReplyFunc.bind(this, this.state.rIndex)}>Reply on Comment</button> : <button className="button" type="button" onClick={this.addCommentFunc.bind(this)}>Add Comment</button>}
			</div>
      <div><h1>Note</h1><p>Name & image should come from server end.</p>
      <p> Date & Time i am showing but not maintaining it.</p>
      </div>
    </div>
		)
	}
}


export default App;
