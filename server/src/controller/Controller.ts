import express, { Response, Express, Request } from "express";


const getRegister = async(req:Request, res:Response):Promise<void> => {


}

const getLogin = async(req:Request,res:Response):Promise<void> => {


  
}


const getData = (req: Request, res: Response) => {
  res.status(200).json({ message: "get all contacts " });
};

const getData2 = (req: Request, res: Response) => {
  const { name, phone } = req.body;
  res.status(200).json({ message: `get all contacts ${name} and ${phone} ` });
};

const registeruser = async (req:Request,res:Response): Promise<void>  =>{
try {



  
} catch (error) {
  console.error(error);
}
}

module.exports = {
  getRegister,
  getLogin,
  getData,
  getData2,
};
