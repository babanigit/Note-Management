import express,{Response,Express, Request} from "express";



const getData= (req:Request, res:Response) => {
    res.status(200).json({ message: "get all contacts " });
  }

  const getData2= (req:Request, res:Response) => {
    const { name,phone} = req.body;
    res.status(200).json({ message: `get all contacts ${name} and ${phone} ` });
  }

module.exports = {
    getData,
    getData2

}