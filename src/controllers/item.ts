import User from '../models/User';
import Item from '../models/Item';
import {IUser, IMongoDBUser, IItem} from '../types';

module.exports = {
 create,
 index,
 deleteOne
}

async function create (req: any, res: any){
    console.log(req.body, ' <------- req.body');
    const item = new Item({...req.body});
    if(req.user){
        item.user = req.user._id;
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
}

async function index (req: any, res: any){
    console.log('index firing');
    try{
        const items = await (Item.find({ }));
        res.status(200).json({items});
        console.log("mongo index success");
    } catch (err: unknown){
        console.log('MongoDB Error!');
        res.status(400).send;
    }
}

async function deleteOne (req: any, res: any){
    try{
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    res.json({
        status: 200,
        data: deletedItem
    })
    } catch (err) {
        res.send(err);
    }
    
}