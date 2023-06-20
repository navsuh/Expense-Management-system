import { emailhandler } from '../../../src/helpers/emailhandler.js'
export class SendDueDateNotificationService {
  constructor(options) {
    this.options = options
  }

  setup(app) {
    this.app = app
  }
 
  async create(data) {
    let result = {}
   const {households}=data
    // console.log(data);
    let householdMembersService = this.app.service(`householdmembers`)
    const householdMembers=await householdMembersService.find({query:{household:households}})
    // console.log(householdMembers);
const usersIds=householdMembers.data.map((eachHouseholdMember)=>eachHouseholdMember.user)
    // console.log(usersIds);
let userService = this.app.service(`users`)
    let userResponse = await userService.find({
      query: {
        _id: {
          $in: usersIds
        }
      }
    })
    const usersEmailIds=userResponse.data.map((eachuser)=>eachuser.email)
if (userResponse && userResponse.data.length > 0) {
  for (let eachuser of userResponse.data){
    await emailhandler.sendEmail(eachuser,"send-due-date-notification")

        
        
  }
  result.status = 200
  result.msg = `email to ${usersEmailIds.join(",")} sent successfull`
  return result

 
} else{
  throw new Error("cannot sent the Email")
}

    
    
 
   
  }





 
}

export const getOptions = (app) => {
  return { app }
}