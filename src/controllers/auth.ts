import User from '../models/User';
import {IUser, IMongoDBUser} from '../types';

module.exports = {
    isLoggedIn,
    logout,
    getUser
}

function isLoggedIn(req: any, res: any, next: any){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('https://jewel-slinger.netlify.app/login');
    }
}

function logout(req:any, res:any, next:any) {
    if(req.user){
      console.log("logout route firing");
      req.logout(function(err:Error) {
        if (err) { return next(err); }
        res.send("done");
      });
    } else {
      throw new Error("User previously logged out.");
    }
  
  }

 function getUser(req:any, res:any) {
    // console.log(req, "req from context request");
    if(req.user){
      res.send(req.user);
    }else{
      console.log("no user from /getuser");
    }
  }