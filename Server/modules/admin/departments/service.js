const Department = require("./model")
const departmentSchema  = require('./schema')

exports.createDepartment =  async (req,res) => {
	try{

	const { value ,error }  = departmentSchema.validate(req.body)
	if(error) throw new Error(error.message)
	const newDpt = new Department({ name : value.name })
	await newDpt.save()
	return res.status(200).json({ success: true , message : 'department added successfully', data  : newDpt});
	}catch(error){
		 return res.status(406).json({ success : true , message  : error.message });
	}
}

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({})
        return res.status(200).json({ success: true, message: 'All departments', data: departments })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}
exports.getSingleDepartment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("No department id provided")
        const departments = await Department.find({})
        return res.status(200).json({ success: true, message: 'All departments', data: departments })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


exports.updateDepartment = async (req,res) => {
	try{
	const { value, error}  = departmentSchema.validate(req.body)
	if (error) throw new Error(error.message)
	const  {  id }  = req.params ;
	if(!id) throw new Error("No department id provided")
	const updated = await Department.findByIdAndUpdate(id ,  { ...value} , {  new  : true })
	return res.status(200).json({ success: true, message : 'Department updated successfully', data  : updated });

	}catch(error){
		return	res.status(500).json({ success   : false , message  : error.message})
	}
}
exports.deleteDepartment = async (req,res) => {
	try{
	const { id }   = req.params ;
	if(!id) throw new  Error('No department ID provided')
	const deleted  = await Department.findByIdAndDelete(id);
	return res.status(200).json({ success : true , message : 'Department deleted successfully' })
	}catch(error){
		return res.status(406).json({ success: false , message  : error.message })
	}

}



