const Note = require('../models/note.model');

// create note
exports.create = async(req, res) => {
    const {title, description, userID} = req.body;

    try{
        // increment note id
        let maxID_note = await Note.find({}).sort({id: -1}).limit(1);
        let maxID = maxID_note[0].id;
        let id = maxID + 1;

        const note  = await Note.create({id, title, description, userID});
        res.status(200).json(note);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

// get all notes
exports.getAll = async(req, res)=>{
    try{
        const notes = await Note.find({}).sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(error){
        res.status(400).json({error: error.message});
    }
    
};

// get single note by id
exports.getByID = async(req,res)=>{
    const {id} = req.params;

    const note  = await Note.findOne({'id': id});

    if(!note){
        return res.status(400).json({error: 'note not found'});   
    }

    res.status(200).json(note);
};

// get notes by User ID
exports.getByUserID = async(req,res)=>{
    const {id} = req.params;

    const note  = await Note.findOne({'id': id});

    if(!note){
        return res.status(400).json({error: 'note not found'});   
    }

    res.status(200).json(note);
};

// update note
exports.update = async(req,res)=>{
    const {id} = req.params;

    try{
        const note  = await Note.findOneAndUpdate({'id': id},{ ...req.body}, { runValidators: true } );

        if(!note){
            return res.status(400).json({error: 'note not found'});   
        }
        
        res.status(200).json({'msg' : `note ${id} updated`});
    }catch(error){
        res.status(400).json({error: error.message});
    }
};
 
// delete note
exports.delete = async(req,res)=>{
    const {id} = req.params;

    const note  = await Note.findOneAndDelete({'id': id});

    if(!note){
        return res.status(400).json({error: 'note not found'});   
    }

    res.status(200).json({'msg' : `note ${id} deleted`});
};