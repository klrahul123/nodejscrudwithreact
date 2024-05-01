import User from "../model/userModel.js";


export const create = async(req, res)=>{
    try {
        const userData = new User(req.body);  // req.body ka matlab hai ki jo bhi data ham bhejenge frontend or react se to wo req.body ke andar aayega
                                              // wo body ham model me bhej denge and model se data hmara database me chla jayega
        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        await userData.save();   //to jo hmara data aaya hai userData me usko ham save kr rhe hain
        res.status(200).json({msg: "User created successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}



// we are fetching all the data
export const getAll = async(req, res) =>{
    try {

        const userData = await User.find();  //User collection ka name hai and uspr find method lgakr sara data ham userData name ke variable me store kr lenge
        if(!userData){
            return res.status(404).json({msg:"User data not found"}); // agar userData na mile to hme ye error message show krke de de
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


//ek particular user ki data lana ho to uski id ko target krke ham la sakte hai
export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;  // ye id hmko mil jayegi url se jo bhi hm wha pass krenge id ko
        const userExist = await User.findById(id); // ab jo id hmne req.params.id se get kri hai hmne wo hm findById(id) ke andar dal denge jo ki us particular id ki data database me search krega
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist); //to agr data mil jata hai to usko ham response me return kr denge...bta denge ki user hmara mil gya hai
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


//Data ko update krna hai
//Data ko update ham ek id ke through hi krenge id ko select krke data ko ham update kr denge

export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);  // to yha par hmko data mil jayega
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true}); // yha par jo data hmko mila hai usko ham update kr rhe hain , to hmne pahle id ko pass kiya hai, and then 
                                                                    // hmne req.body ko pass kiya hua hai to isme user ka data aayega jisko update krna hai 
                                                                    // {new:true}--ye ek object hai----iska matlab ye hua ki ye updated data ko return krega updatedData wale variable me
        res.status(200).json({msg: "User updated successfully"}); // yha par ham updated data ko send kr rhe hain
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


//data delete ka function
//data ko delete bhi ham id ke hi basis par krenge

export const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}