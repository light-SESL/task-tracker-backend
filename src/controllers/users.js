

class UsersController{
    static async registerUser(req, res){
        return res.status(201).json({
            message: "createdUser"
        })
    }

}

export default  UsersController
