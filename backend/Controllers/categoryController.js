const Category = require('../models/categorymodel');

const addCategory = async (req, res) => {
    try {
        const { catname, description, status } = req.body;

        const category = new Category({
            catname,
            description,
            status
        });

        await category.save();

        res.status(201).json({
            message: "Category added successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
};