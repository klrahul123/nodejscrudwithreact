import express from "express";
import { create, getAll, getOne, update, deleteUser } from "../controller/userController.js";
const route = express.Router();



route.post("/create", create);
route.get("/getall", getAll);  // yha par hmara sara data get kr rhe hain to ye uska route hai
route.get("/getone/:id", getOne); // kisi particular user ki data ko get krne ka route hai
                                  // yha pr ham Url me ek id ko bhejenge aur us id ko ham accese kr lenge
route.put("/update/:id", update);  // id ke behalf par ham update krenge user ke data ko
route.delete("/delete/:id", deleteUser); // delete ka route hai jisko hm id ke basis pr data ko delete krenge


export default route;