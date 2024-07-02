import UserService  from "./user.service.js";
class UserController {
    getAllUser = async (req, res, next) => {
        try {
            const users = await UserService.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    getUserById = async (req, res, next) => {
        const user = await UserService.getById(req.params.id);
        if(user==null){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json(user);
    }
    createNewUser = async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        await UserService.create(newUser);
        return res.status(201).json({message: 'User created'});
    }
    updateUser = async (req, res, next) => {
        let user = await UserService.getById(req.params.id);
        if(user==null){
            return res.status(404).json({message: 'User not found'});
        }
        user = {
            ...user,
            fullname: req.body.fullname,
            gender: req.body.gender,
            age: req.body.age,
            password: req.body.password
        };
        try {
            await UserService.update(req.params.id, user);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
        return res.status(204).json({message: 'User updated'});
    }
    deleteUser = async (req, res, next) => {
        const user = await UserService.getById(req.params.id);
        if(user==null){
            return res.status(404).json({message: 'User not found'});
        }
        try {
            await UserService.remove(req.params.id);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
        return res.status(204).json({message: 'User deleted'});
    }
}

export default new UserController();