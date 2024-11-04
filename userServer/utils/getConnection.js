import mongoose from 'mongoose'

const getConnection = () => {
       try {
              mongoose.connect(process.env.MONGO_URI)
              .then((connection)=> {
                     console.log("Db is Connected . . .");
                     
              })
              .catch((error) => {
                     console.log("error : ", error.message);
                     
              })
       } catch (error) {
              console.log("mongo error : ",error);
              
       }
}
export default getConnection