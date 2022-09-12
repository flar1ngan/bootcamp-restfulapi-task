import userModel from "../models/userModel.js";

//compares current user state (after update) and initial user state (before update). If isAdmin was changed then cookie "session_token" clear

export const checkAdmin = async (req, res) => {
    const processingUser = await userModel.findById(req.params.id);
    const userInitialState = res.locals.userInitialState;
    if(processingUser.isAdmin !== userInitialState.isAdmin) {  
    res.clearCookie('session_token');
    }
    res.status(200).json(processingUser);

}