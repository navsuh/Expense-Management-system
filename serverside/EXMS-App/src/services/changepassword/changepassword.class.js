// This is a skeleton for a custom service class. Remove or add the methods you need here
import bcrypt from "bcrypt";
export class ChangepasswordService {
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
    console.log(newPassword);
    console.log(confirmedPassword);
    let userService = this.app.service(`users`)
    let userResponse = await userService.find({
      query: {
        email: email
      }
    })
    if(!userResponse || userResponse.data.length === 0) throw new Error("please enter the correct email")
    if(newPassword.toString() !==confirmedPassword.toString()) throw new Error("New password and confirm password did not match")

    if (userResponse && userResponse.data.length > 0) {
      let comparePassword = await bcrypt.compare(data.currentPassword, userResponse.data[0].password)
      if (comparePassword) {
        if (
          newPassword.toString() !== email.toString() &&
          newPassword.toString() !== userResponse.data[0].name
        ) {
          if (newPassword.toString() === confirmedPassword.toString()) {
            let updatePassword = await userService.patch(
              userResponse.data[0]._id,
              { password: data.newPassword },
              { new: true }
            )
            result.status = 200
            result.msg = 'Password changed successfully'
            result.record = updatePassword
            return result
          }
        }
      }else{
        throw new Error("please enter the correct current password")
      }
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  // async update(id, data, _params) {
  //   return {
  //     id: 0,
  //     ...data
  //   }
  // }

  // async patch(id, data, _params) {
  //   return {
  //     id: 0,
  //     text: `Fallback for ${id}`,
  //     ...data
  //   }
  // }

  // async remove(id, _params) {
  //   return {
  //     id: 0,
  //     text: 'removed'
  //   }
  // }
}

export const getOptions = (app) => {
  return { app }
}
