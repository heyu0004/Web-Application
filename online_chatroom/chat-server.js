var http = require("http"),
	socketio = require("socket.io"),
	fs = require("fs");
 
var app = http.createServer(function(req, resp){
	fs.readFile("client.html", function(err, data){
		if(err) return resp.writeHead(500);
		resp.writeHead(200);
		resp.end(data);
	});
});
app.listen(3456);
 
var io = socketio.listen(app);

    io.sockets.on("connection", function(socket){
    io.sockets.emit("roomlist",{message:"roomlist",roomlist:roomlist,namelist:namelist}) ;
    
    socket.on('logoff', function(data){
    var nickname=data['user'];
    if (nickname!="anonymous"){
          while(namelist.indexOf(nickname) !== -1) {
          namelist.splice(namelist.indexOf(nickname), 1);
          }
    }
    })
    
    
    socket.on('private message', function(data){
    var valid=false;
    for(index = 0; index < namelist.length; index++){
        if(namelist[index]==data['person']){
            valid=true;break;
        }
    }
    if(valid){//person in the namelist
       if(data['message']=="private message"){
           io.sockets.emit("private_message",{message:"check_private_person",person:data['person'],chatroom:data['chatroom'],user:data['user'],private_message:data['private_message']}) ;
       }
    }
    else{//person not in the namelist, invalid name
    io.sockets.emit("private_message",{message:"no_person_find",person:data['person'],chatroom:data['chatroom'],user:data['user'],private_message:data['private_message']}) ;
    }
  
    if(data['message']=="check_private_person_result"){
       if(data['get_person']){
           io.sockets.emit("private_message",{message:"check_private_person_succeed",person:data['person'],chatroom:data['chatroom'],user:data['user'],private_message:data['private_message']}) ;
       }
       else{
       io.sockets.emit("private_message",{message:"check_private_person_failed",person:data['person'],chatroom:data['chatroom'],user:data['user'],private_message:data['private_message']}) ;
       }
    }
    })
    
    
    //deal with kick person
    socket.on('kick person', function(data){
    io.sockets.emit("kick_person",{message:"kick person",chatroom:data["chatroom"],kick_one:data['kickone'],myroom:data['myroom']});   
    })
    
    
    //deal with forbid person
    socket.on('forbid person', function(data){
    //permanent forbid a person join the room
    if(data['message']=="forbid person join"){
    var forbidone=data['forbidone']; 
    var valid=false;
     for(index = 0; index < namelist.length; index++){
        if(namelist[index]==forbidone){
            valid=true;break;
        }
      }
     if(valid){
         io.sockets.emit("forbid_person",{message:"ok to forbid person join",chatroom:data["chatroom"],forbid_one:data['forbidone'],myroom:data['myroom'],user:data['user']});  
      }
     else {
         io.sockets.emit("forbid_person",{message:"falied forbid person join",chatroom:data["chatroom"],forbid_one:data['forbidone'],myroom:data['myroom'],user:data['user']});  
     }
   }
    //forbid talk in the room
    if(data['message']=="forbid person"){
    io.sockets.emit("forbid_person",{message:"forbid person",chatroom:data["chatroom"],forbid_one:data['forbidone'],myroom:data['myroom']});   
     }
    })
    
    
    socket.on('leaving', function(data){
     io.sockets.emit("update_roomlist",{message:"delete a joiner",chatroom:data["chatroom"],user:data['user']});      
    })
    
    //when creator leaves the room, transfer creator authority to the second person joined the room
    socket.on('transfer creator', function(data){
     var roomlist_=data['myroom'];
     var next_creator=roomlist_[0];
     io.sockets.emit("transfer_creator",{message:"transfer_creator",chatroom:data["chatroom"],next_creator:next_creator,myroom:roomlist_});       
    })
    
    
    socket.on('updateroomlist', function(data){
    //update when new one come in
    if(data['msg']=="add a joiner"){
    io.sockets.emit("update_roomlist",{message:"add a joiner",chatroom:data["chatroom"],user:data['user']});   
    }
    //update when delete an empty room
    else if(data['message']=="delete a room"){
    var room_=data['chatroom'];
    roomlist.splice(roomlist.indexOf(room_), 1);
    io.sockets.emit("roomlist",{message:"roomlist",roomlist:roomlist,namelist:namelist});   
    }
    else{
    var myroom=data['myroom'];
        io.sockets.emit("update_roomlist",{message:"update myroom",chatroom:data["chatroom"],myroom:myroom});         
    }
    	})
    
    
    socket.on('create a nickname', function(data){
    if (data["message"]=="create a nickname"){
	    nickname=data["user"];
		var valid=checknickname(nickname);
		if (valid!==true){
		io.sockets.emit("created_a_nickname",{message:"invalid nickname",chatroom:data["chatroom"],user:data["user"],random_id:data["random_id"]});	
		}
		else{
		namelist.push(nickname);
		io.sockets.emit("created_a_nickname",{message:"valid nickname",chatroom:data["chatroom"],user:data["user"],random_id:data["random_id"]});
	
		io.sockets.emit("roomlist",{message:"roomlist",roomlist:roomlist,namelist:namelist}) ;
		}
	}
    })
    
    
    //create a chatroom
     socket.on('create a chatroom', function(data){
    if (data["message"]=="created chatroom:"){
	    var nickname=data["user"];
	    var room=data["chatroom"];
		var valid=checknewroom(room);
		if (valid!==true){
		io.sockets.emit("created_a_chatroom",{message:"invalid roomname create",chatroom:data["chatroom"],user:data["user"]}) 
		}
		else{
		io.sockets.emit("created_a_chatroom",{message:"valid roomname create",chatroom:data["chatroom"],user:data["user"],create:data["user"]})
		roomlist.push(room);
		io.sockets.emit("roomlist",{message:"roomlist",roomlist:roomlist,namelist:namelist}) ;
		}
	}
	if (data["message"]=="created private chatroom:"){
	
	    var nickname=data["user"];
	    var room=data["chatroom"];
		var valid=checknewroom(room);
		if (valid!==true){
		io.sockets.emit("created_a_chatroom",{message:"invalid roomname create",chatroom:data["chatroom"],user:data["user"]}) 
		}
		else{
		io.sockets.emit("created_a_chatroom",{message:"valid roomname create",chatroom:data["chatroom"],user:data["user"],create:data["user"],password:data['password']})
		roomlist.push(room);      
		io.sockets.emit("roomlist",{message:"roomlist",roomlist:roomlist,namelist:namelist}) ;
		}	
	}
    })
    
    
    //join a chatroom
    socket.on('join a chatroom', function(data){
    
    if (data["message"]=="joined chatroom:"){
	    var room=data["chatroom"];
		var valid=checkjoinroom(room);
		if (valid!==true){
		io.sockets.emit("joined_a_chatroom",{message:"invalid roomname join",chatroom:data["chatroom"],user:data["user"]}) ;
		}
		else{
		io.sockets.emit("check_join",{message:"check join",chatroom:data["chatroom"],user:data["user"]});
		}
	}
	if (data["message"]=="joining a private chatroom:"){
	    var room=data["chatroom"];
		var valid=checkjoinroom(room);
		if (valid!==true){
		io.sockets.emit("joined_a_chatroom",{message:"invalid roomname join",chatroom:data["chatroom"],user:data["user"]}) ;
		}
		else{
		io.sockets.emit("check_join",{message:"check private room join",chatroom:data["chatroom"],user:data["user"],password:data['password']});
	}
	}
	if(data["message"]=="can join"){
	io.sockets.emit("joined_a_chatroom",{message:"valid roomname join",chatroom:data["chatroom"],user:data["user"],create:"joiner"});
	}
	if(data["message"]=="cannot join"){
	io.sockets.emit("joined_a_chatroom",{message:"creator forbid",chatroom:data["chatroom"],user:data["user"],create:"joiner"});		
	}
	if(data["message"]=="wrong password"){
	io.sockets.emit("joined_a_chatroom",{message:"wrong password",chatroom:data["chatroom"],user:data["user"],create:"joiner"});		
	}
    if(data["message"]=="correct password for private room"){
	io.sockets.emit("joined_a_chatroom",{message:"correct password for private room",chatroom:data["chatroom"],user:data["user"],create:"joiner",password:data['password']});		
	}
    })
    
    
	socket.on('message_to_server', function(data) {
		// This callback runs when the server receives a new message from the client.
        io.sockets.emit("roomlist",{message:"roomlist",roomlist:roomlist,namelist:namelist}) ;
        console.log("chatroom: "+data["chatroom"]); 
        console.log("username: "+data["user"]);
		console.log("message: "+data["message"]); // log it to the Node.JS output
        io.sockets.emit("message_to_client",{message:data["message"],chatroom:data["chatroom"],user:data["user"],forbid:data['forbid']}) // broadcast the message to other users
	
	});
	
	
});

var nickname="---";
var roomlist=["public"];
var namelist=["---"];
var room="public";

function checknickname(nickname){
    var valid=true;
     for(index = 0; index < namelist.length; index++){
        if(namelist[index]==nickname){
            valid=false;break;
        }
    }
    return valid;
}


function checknewroom(room){
        var valid=true;
        for(index = 0; index < roomlist.length; index++){
           if(roomlist[index]==room){
              valid=false; break;
           }
        }
        return valid;
}
      
      
function checkjoinroom(room){
        var valid=false;
        for(index = 0; index < roomlist.length; index++){
           if(roomlist[index]==room){
              valid=true; break;
           }
        }
        return valid;
}      
