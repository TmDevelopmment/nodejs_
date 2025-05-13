const CustomerSchema = require('../model/CustomerSchema');

const createCustomer = async (req, res) => {

    console.log('Request body:', req.body);

    try {
        let customerSchema = new CustomerSchema({
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        });

        customerSchema.save()
            .then(result => res.status(201).json({
                message: 'Customer created successfully',
            }))
            .catch((error) => {
                return res.status(500).json({ message: 'something went wrong',error:error });
            });

    } catch (e) {
        return res.status(500).json({ message: 'something went wrong',error:e });
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerSchema.find();
        if (customers.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }
        return res.status(201).json(customers);
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong', error: error });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await CustomerSchema.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.status(201).json(customer);
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong', error: error });
    }
}

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const updatedCustomer = await CustomerSchema.findByIdAndUpdate(customerId, req.body, {new: true});
        if (!updatedCustomer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        return res.status(201).json({
            message: 'Customer updated successfully',
            customer: updatedCustomer
        });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong', error: error });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedCustomer = await CustomerSchema.findByIdAndDelete(customerId);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.status(201).json({
            message: 'Customer deleted successfully',
            customer: deletedCustomer
        });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong', error: error });
    }
}

const searchCustomer = async (req, res) => {
    try {

        const searchText = req.query.searchText || '';

        const name = req.query.searchText || '';
        const address = req.query.searchText || '';

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const query = {
            $or: [
                { name: new RegExp(searchText, 'i') },
                { address: new RegExp(searchText, 'i') },
            ]
        };

        CustomerSchema.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .then(result => res.status(200).json({'data': result}))
            .catch(error => res.status(500).json({ message: 'something went wrong', error: error }))
    } catch (e) {
        return res.status(500).json({ message: 'something went wrong', error: e });
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    searchCustomer,
    deleteCustomer
}