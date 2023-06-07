// import { MongoDBService } from '@feathersjs/mongodb'

// // By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// export class ResetPasswordService extends MongoDBService {}

// export const getOptions = (app) => {
//   return {
//     paginate: app.get('paginate'),
//     Model: app.get('mongodbClient').then((db) => db.collection('reset-password'))
//   }
// }


export class ResetPasswordService {
  constructor(options) {
    this.options = options
  }

  setup(app) {
    this.app = app
  }
 
  async create(data) {
    let result = {}
    let email = data.email
    let newPassword = data.newPassword
    let confirmedPassword = data.confirmedPassword
    let userService = this.app.service(`users`)
    let userResponse = await userService.find({
      query: {
        email: email
      }
    })
    if (userResponse && userResponse.data.length > 0) {
      
      
        if (
          newPassword.toString() !== email.toString() &&
          newPassword.toString() !== userResponse.data[0].firstName
          &&
          newPassword.toString() !== userResponse.data[0].lastName
        ) {
          if (newPassword.toString() === confirmedPassword.toString()) {
            let updatePassword = await userService.patch(
              userResponse.data[0]._id,
              { password: data.newPassword },
              { new: true }
            )
            result.status = 200
            result.msg = 'Password changed successfully kindly login'
            // result.record = updatePassword
            return result
          }
        }else{
          throw new Error("please enter the valid password")
        }
      
        
      
    }
  }

  
}

export const getOptions = (app) => {
  return { app }
}

