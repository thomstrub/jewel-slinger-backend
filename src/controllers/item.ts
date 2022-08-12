import User from '../models/User';
import Item from '../models/Item';
import {IUser, IMongoDBUser, IItem} from '../types';

module.exports = {
 create,
 index
}

async function create (req: any, res: any){
    console.log(req.body, ' <------- req.body');
    const item = new Item({...req.body});

    console.log(item, " <------ item to be saved");
    try{
        const dbDoc = await item.save();;
        res.status(201).json({post: dbDoc});
    }
    catch(err){
        console.log(err);
        res.json({data: err});
    }
    
}
    // save item, get the ID
    // save the ID as an item on the User record

function index (req: any, res: any){
    console.log('index firing');
}