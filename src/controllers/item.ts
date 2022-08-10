import User from '../models/User';
import Item from '../models/Item';
import {IUser, IMongoDBUser, IItem} from '../types';

module.exports = {
 create,
 index
}

function create (req: any, res: any){
    const item = new Item({
        name: 'Thom',
        price: '$10',
        quantity: 1,
        photo: "",
        description: "Description",
        size: "3 feet, adjustable"
    })
    console.log(item, " <------ item to be saved");
    // save item, get the ID
    // save the ID as an item on the User record
}

function index (req: any, res: any){
    console.log('index firing');
}