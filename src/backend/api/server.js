const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require("multer");
const upload = multer({dest:"../../public/uploads/"});
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

const db = require('../database/dbConfig');

const server = express();

server.use("/static",express.static("../../public/uploads/")); //for static serving of uploaded images
server.use(cors());
server.use(helmet());
server.use(express.json());


// get blog by id
server.get('/blog/detail/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    try {
        const packageData = await db('blog').where({ id });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})

server.get('/packages/allPackages/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    try {
        const packageData = await db('packages').where({ id });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})
// for famouse destination
server.get('/packages/allFpackages/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    try {
        const packageData = await db('famousepackages').where({ id });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})

// search
server.get('/packages/allPackages/search/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const packageData = await db('packages').where({ name:id }).orWhere({country:id});
        packageData.length === 0 ? res.status(200).json(packageData) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})
server.get('/packages/allFpackages/search/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const packageData = await db('famousepackages').where({ name:id }).orWhere({country:id});
        packageData.length === 0 ? res.status(200).json(packageData): res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})

// comments
server.get('/blog/comments/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;

    try {
        const packageData = await db('blogComments').where({ blogId:id  });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})
// comments
server.get('/bookings/comments/allFpackages/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    const contentType = 'allFpackages'

    try {
        const packageData = await db('bookings').where({ packageId:id ,contentType:contentType });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})
// comments
server.get('/bookings/comments/allPackages/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    const contentType = 'allPackages'

    try {
        const packageData = await db('bookings').where({ packageId:id ,contentType:contentType });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})

// get  hotel by id
server.get('/hotel/get/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    const contentType = 'allPackages'

    try {
        const packageData = await db('hotel').where({ id:id });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
});

// get all hotel
server.get('/hotel/get', async (req,res) => {
    try {
        const packages = await db('hotel').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// get all hotel booking
server.get('/hotelBooking/get', async (req,res) => {
    try {
        const packages = await db('hotelBooking').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// get all packages
server.get('/packages/allFpackages', async (req,res) => {
    try {
        const packages = await db('famousepackages').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});
server.get('/packages/allPackages', async (req,res) => {
    // GET all packages
    try {
        const packages = await db('packages').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// check is user exist
server.get('/isUserRegistered/:id', async (req,res) => {
    const email = req.params.id

    try {
        const packageData = await db('users').where({ email });
        res.status(200).json(packageData);
    } catch(err) {
        console.log(err);
    }
});

// get enquiry by id
server.get('/enquiry/get/:id', async (req,res) => {
    const id = req.params.id

    try {
        const packageData = await db('enquiry').where({ id });
        res.status(200).json(packageData);
    } catch(err) {
        console.log(err);
    }
});


// get enquiry
server.get('/enquiry/all', async (req,res) => {
    // GET all packages
    try {
        const packages = await db('enquiry').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// get blog
server.get('/blog/get/all', async (req,res) => {
    // GET all packages
    try {
        const packages = await db('blog').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// update enquiry
server.post('/enquiry/update/:id', async (req,res) => {
    const id = req.params.id
    const status = 'SEEN'
    try {
        await db('enquiry').where({ id }).update({ status });
        res.status(200).json({ message: 'Update successful!' });
    } catch (err) {
        console.log(err)
    }
});

// add blog comment
server.post('/blogComment/add', async (req,res) => {
    const { comment , blogId,  userId , userName } = req.body.data
    let d = new Date();
    let created_at = d.toLocaleDateString("en-US")
    
    try {
        const packageData = await db('blogComments').insert({ comment , blogId,  userId , userName , created_at });
        res.status(200).json(packageData);

    } catch (err) {
        console.log(err)
    }
});

// add enquiry
server.post('/enquirt/add', async (req,res) => {
    const { firstName , lastName,  email , phoneNumber  , message} = req.body.data
    let d = new Date();
    let created_at = d.toLocaleDateString("en-US")
    let status = 'UNREAD'
    
    try {
        const packageData = await db('enquiry').insert({ firstName , lastName,  email , phoneNumber , created_at , message , status  });
        res.status(200).json(packageData);

    } catch (err) {
        console.log(err)
    }
});

// get booking by id
server.get('/booking/get/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    // console.log(id)
    try {
        const packageData = await db('bookings').where({ id });
        packageData.length === 0 ? res.status(404).json({ message: 'packages not found'}) : res.status(200).json(packageData);
    } catch(err) {
        console.log(err)
    }
})

// uodate booking by id
server.get('/booking/update/status/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    const status = 'CONFORMED'
    try {
        await db('bookings').where({ id }).update({ status });
        res.status(200).json({ message: 'Update successful!' });
    } catch(err) {
        console.log(err)
    }
})

// delete bookings
server.delete('/booking/delete/:id', async (req,res) => {
    // DELETE a package
    const { id } = req.params;

    try {
        await db('bookings').where({ id }).del();
        res.status(200).json({ message: 'Delete successful!' });
    } catch (err) {
        console.log(err)
    }
});

server.get('/booking/update/statusCancel/:id', async (req,res) => {
    // GET package by id
    const { id } = req.params;
    const status = 'CANCELLED'
    try {
        await db('bookings').where({ id }).update({ status });
        res.status(200).json({ message: 'Update successful!' });
    } catch(err) {
        console.log(err)
    }
})

// get booking
server.get('/booking/all', async (req,res) => {
    // GET all packages
    try {
        const packages = await db('bookings').orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});
server.get('/booking/userBookings/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const packages = await db('bookings').where({ userId:id }).orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// hotel 
server.get('/hotelBooking/userBookings/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const packages = await db('hotelBooking').where({ userId:id }).orderBy('id', 'desc');
        res.status(200).json(packages);
    } catch(err) {
        console.log(err);
    }
});

// add booking for place
server.post('/booking/add', async (req,res) => {
    const { firstName , lastName, numberOfPeople , email , phoneNumber  ,  from , to , userId ,packageId , contentType ,comment , price , total} = req.body.data
    let d = new Date();
    let created_at = d.toLocaleDateString("en-US")
    let status = 'PENDING'

    try {
        await db('bookings').insert({ firstName , lastName, numberOfPeople , email , phoneNumber , created_at ,  from , to , status , userId , packageId , contentType ,comment , price , total  });
        res.status(201).json({ message: 'successfull!' });

    } catch (err) {
        console.log(err)
    }
})
// add booking for hotel
server.post('/hotelBooking/add', async (req,res) => {
    const { firstName , lastName, numberOfPeople , email , phoneNumber  ,  checkIn , checkOut , userId ,packageId  , price , total} = req.body.data
    let d = new Date();
    let created_at = d.toLocaleDateString("en-US")
    let status = 'PENDING'

    try {
        await db('hotelBooking').insert({ firstName , lastName, numberOfPeople , email , phoneNumber , created_at ,  checkIn , checkOut , status , userId , packageId , price , total  });
        res.status(201).json({ message: 'successfull!' });

    } catch (err) {
        console.log(err)
    }
})

// user log in
server.post('/login', async (req,res) => {
    const { email , password } = req.body.data
   
    try {
        const packageData = await db('users').where({ email:email , password:password  });
        res.status(200).json(packageData);

    } catch (err) {
        console.log(err)
    }
})

// admin log in
server.post('/admin/login', async (req,res) => {
    const { email , password } = req.body.data
    const packageData=[{
        id:0,
        userRoll:'admin',
        firstName:'admin',
        lastName:'admin',
        email:'admin@gmail.com'
    }]
    const d=[]
   
    if(email === 'admin@gmail.com' && password === 'admin123'){
        res.status(200).json(packageData);
    }else{
        res.status(200).json(d);
    }
})

// user registration
server.post('/registration', async (req,res) => {
    const { firstName , lastName , email , password } = req.body.data
    const userRoll='user'
    try {
        const packageData = await db('users').insert({ userRoll , firstName , lastName , email , password  });
        res.status(200).json(packageData);
    } catch (err) {
        console.log(err)
    }
})

// for adding blog
server.post('/blog/add', upload.single('avatar'), async (req, res)=> {
    let fileType = req.file.mimetype.split("/")[1];
    let rdval=uuidv4()
    let newFileName = rdval + "." + fileType
    fs.rename(`../../public/uploads/${req.file.filename}`,`../../public/uploads/${newFileName}`,async function(){
        let title = req.body.title;
        let blog = req.body.blog;
        let user = req.body.user;
        let image = newFileName
        let d = new Date();
        let date = d.toLocaleDateString("en-US")

        try {
            await db('blog').insert({ title,blog,user,image,date });
            res.status(201).json({ message: 'successfull!' });
        } catch(err) {
            console.log(err)
        }
    })
})

// for adding hotel
server.post('/hotel/add', upload.single('avatar'), async (req, res)=> {
    let fileType = req.file.mimetype.split("/")[1];
    let rdval=uuidv4()
    let newFileName = rdval + "." + fileType
    fs.rename(`../../public/uploads/${req.file.filename}`,`../../public/uploads/${newFileName}`,async function(){
        let name = req.body.name;
        let price = req.body.price;
        let detail = req.body.detail;
        let image = newFileName

        try {
            await db('hotel').insert({ name,price,detail,image });
            res.status(201).json({ message: 'successfull!' });
        } catch(err) {
            console.log(err)
        }
    })
})

// for adding new packages
server.post('/packages/addNewPackage', upload.single('avatar'), async (req, res)=> {
    let fileType = req.file.mimetype.split("/")[1];
    let rdval=uuidv4()
    let newFileName = rdval + "." + fileType
    fs.rename(`../../public/uploads/${req.file.filename}`,`../../public/uploads/${newFileName}`,async function(){
        let name = req.body.name;
        let price = req.body.price;
        let country = req.body.country;
        let type = req.body.type;
        let features = req.body.features;
        let detail = req.body.detail;
        let image = newFileName
        let d = new Date();
        let created_at = d.toLocaleDateString("en-US")

        try {
            await db('packages').insert({ name,price,country,type,features,detail,created_at,image });
            res.status(201).json({ message: 'successfull!' });
        } catch(err) {
            console.log(err)
        }
    })
})

// for famouse destination
server.post('/packages/addNewFpackage', upload.single('avatar'), async (req, res)=> {
    let fileType = req.file.mimetype.split("/")[1];
    let rdval=uuidv4()
    let newFileName = rdval + "." + fileType
    fs.rename(`../../public/uploads/${req.file.filename}`,`../../public/uploads/${newFileName}`,async function(){
        let name = req.body.name;
        let price = req.body.price;
        let country = req.body.country;
        let type = req.body.type;
        let features = req.body.features;
        let detail = req.body.detail;
        let image = newFileName
        let d = new Date();
        let created_at = d.toLocaleDateString("en-US")

        try {
            await db('famousepackages').insert({ name,price,country,type,features,detail,created_at,image });
            res.status(201).json({ message: 'successfull!' });
        } catch(err) {
            console.log(err)
        }
    })
})

// update without image
server.put('/packages/update/allPackages/:id', async (req,res) => {
    // UPDATE a package
    const { id } = req.params;
    const { name , price ,country , type ,features , detail , image } = req.body.data
    try {
        await db('packages').where({ id }).update({ name ,price , country , type , features , detail , image });
        res.status(200).json({ message: 'Update successful!' });
    } catch (err) {
        console.log(err)
    }
});
server.put('/packages/update/allFpackages/:id', async (req,res) => {
    // UPDATE a package
    const { id } = req.params;
    const { name , price ,country , type ,features , detail , image } = req.body.data

    try {
        await db('famousepackages').where({ id }).update({ name ,price , country , type , features , detail , image });
        res.status(200).json({ message: 'Update successful!' });
    } catch (err) {
        console.log(err)
    }
});

// update with image
server.post('/packages/updateWithImage/allPackages', upload.single('avatar'), async (req, res)=> {    
    let fileType = req.file.mimetype.split("/")[1];
    let rdval=uuidv4()
    let newFileName = rdval + "." + fileType
    fs.unlinkSync(`../../public/uploads/${req.body.oldimage}`)
    fs.rename(`../../public/uploads/${req.file.filename}`,`../../public/uploads/${newFileName}`,async function(){
        let id = req.body.id;
        let name = req.body.name;
        let price = req.body.price;
        let country = req.body.country;
        let type = req.body.type;
        let features = req.body.features;
        let detail = req.body.detail;
        let image = newFileName

        try {
            await db('packages').where({ id }).update({ name ,price , country , type , features , detail , image });
            res.status(200).json({ message: 'Update successful!' });
        } catch (err) {
            console.log(err)
        }
    })
})

server.post('/packages/updateWithImage/allFpackages', upload.single('avatar'), async (req, res)=> {    
    let fileType = req.file.mimetype.split("/")[1];
    let rdval=uuidv4()
    let newFileName = rdval + "." + fileType
    fs.unlinkSync(`../../public/uploads/${req.body.oldimage}`)
    fs.rename(`../../public/uploads/${req.file.filename}`,`../../public/uploads/${newFileName}`,async function(){
        let id = req.body.id;
        let name = req.body.name;
        let price = req.body.price;
        let country = req.body.country;
        let type = req.body.type;
        let features = req.body.features;
        let detail = req.body.detail;
        let image = newFileName

        try {
            await db('famousepackages').where({ id }).update({ name ,price , country , type , features , detail , image });
            res.status(200).json({ message: 'Update successful!' });
        } catch (err) {
            console.log(err)
        }
    })
})


server.put('/packages/updateWithImage/allFpackages/:id', async (req,res) => {
    // UPDATE a package
    const { id } = req.params;
    const { name , price ,country , type ,features , detail , image } = req.body.data

    try {
        await db('famousepackages').where({ id }).update({ name ,price , country , type , features , detail , image });
        res.status(200).json({ message: 'Update successful!' });
    } catch (err) {
        console.log(err)
    }
});

server.delete('/packages/delete/allPackages/:id', async (req,res) => {
    // DELETE a package
    const { id } = req.params;
    const image=req.body.image

    try {
        fs.unlinkSync(`../../public/uploads/${image}`)
        await db('packages').where({ id }).del();
        res.status(200).json({ message: 'Delete successful!' });
    } catch (err) {
        console.log(err)
    }
});

server.delete('/packages/delete/allFpackages/:id', async (req,res) => {
    // DELETE a package
    const { id } = req.params;
    const image=req.body.image;

    try {
        fs.unlinkSync(`../../public/uploads/${image}`)
        await db('famousepackages').where({ id }).del();
        res.status(200).json({ message: 'Delete successful!' });
    } catch (err) {
        console.log(err)
    }
});


module.exports = server;