
const express = require("express");
const app = express();

app.use(express.json());
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

var admin = require("firebase-admin");

var serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jobforyou-ad222-default-rtdb.firebaseio.com"
});
const db = admin.firestore();


app.get("/getdata", (req, res) => {
    const docRef = db.collection('users');

   docRef.get()
   .then((querySnapshot) => {
    let arrdata=[];
    let idarray=[];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      arrdata.push(doc.data());
      idarray.push(doc.id);

    });
    res.send({id:idarray,
        data:arrdata
    });
  })
  .catch((error) => {
    console.error('Error retrieving data:', error);
    res.status(404).send(error);
  });
})
app.get("/add", (req, res) => {
    const docRef = db.collection('users').doc('users');

const data = {
  name1: 'John Doe',
  age1: 30,
  email1: 'john.doe@example.com'
};

docRef.set(data)
  .then(() => {
    console.log('Document added successfully');
    res.send("add");
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
    res.send("error");
  });
})
app.put("/adddata",(req, res) => {
    const PostName= req.body.PostName;
    const Location = req.body.Location;
    const jobtype = req.body.jobtype;
    const Salary = req.body.Salary;
    const Vacancy = req.body.Vacancy;
    const PublishedOn = req.body.PublishedOn;
    const DateLine = req.body.DateLine;
    const Jobdescription = req.body.Jobdescription;
    const CompanyDetail = req.body.CompanyDetail;
    const Responsibility = req.body.Responsibility;
    const Qualifications = req.body.Qualifications;
    const ApplyLink = req.body.ApplyLink;
    const ImageLink = req.body.ImageLink;
    const id =PostName+PublishedOn+new Date();
    const docRef = db.collection('users').doc(id);
    const data= {
        PostName: PostName,
        Location: Location,
        jobtype: jobtype,
        Salary:Salary,
        Vacancy:Vacancy,
        DateLine: DateLine,
        Jobdescription:Jobdescription,
        CompanyDetail: CompanyDetail,
        Responsibility: Responsibility,
        Qualifications: Qualifications,
        ApplyLink: ApplyLink,
        ImageLink: ImageLink
    }
    docRef.set(data)
  .then(() => {
    // console.log('');
    res.send("Document added successfully");
  })
  .catch((error) => {
    // console.error();
    res.send("error" + error.message);
  });

    



});





app.listen(3000);


