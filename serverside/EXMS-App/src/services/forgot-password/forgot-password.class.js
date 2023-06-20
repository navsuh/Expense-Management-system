// import { MongoDBService } from '@feathersjs/mongodb'

// // By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// export class ForgotPasswordService extends MongoDBService {}

// export const getOptions = (app) => {
//   return {
//     paginate: app.get('paginate'),
//     Model: app.get('mongodbClient').then((db) => db.collection('forgot-password'))
//   }
// }

// This is a skeleton for a custom service class. Remove or add the methods you need here
import { emailhandler } from '../../../src/helpers/emailhandler.js'
export class ForgotPasswordService {
  constructor(options) {
    this.options = options
  }

  setup(app) {
    this.app = app
  }
 
  async create(data) {
    let result = {}
    let email = data.email
    let userService = this.app.service(`users`)
    let userResponse = await userService.find({
      query: {
        email: email
      }
    })
    if (userResponse && userResponse.data.length > 0) {
      // console.log("data1");
      console.log(userResponse.data);
      // console.log("data2");
      const OTP=String(Math.floor((Math.random() * 10)*100000+Math.random() * 1000)).substring(0,4);
const newData={...userResponse.data[0],OTP}
      emailhandler.sendEmail(newData,"forgot-password")
      result.status = 200
            result.msg = 'OTP generated successfully.check your registered email'
            result.OTP=OTP
            return result
     
    } else{
      throw new Error("Please Enter a Valid Email Id")
    }
  }

  
}

export const getOptions = (app) => {
  return { app }
}

